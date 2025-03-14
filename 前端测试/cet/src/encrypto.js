// 初始化 IndexedDB
const DB_NAME = 'CryptoKeysDB';
const STORE_NAME = 'keys';
let db;

async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

// 生成密钥对并保存到 IndexedDB
async function generateAndSaveKeys() {
  try {
    // 生成 RSA 密钥对
    const keyPair = await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: "SHA-256"
      },
      true,
      ["encrypt", "decrypt"]
    );

    // 导出公钥和私钥的二进制数据
    const [publicKeyBuffer, privateKeyBuffer] = await Promise.all([
      crypto.subtle.exportKey("spki", keyPair.publicKey),
      crypto.subtle.exportKey("pkcs8", keyPair.privateKey)
    ]);

    // 保存到 IndexedDB
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    store.put({ id: 'publicKey', data: publicKeyBuffer });
    store.put({ id: 'privateKey', data: privateKeyBuffer });

    return new Promise((resolve) => {
      transaction.oncomplete = () => resolve();
    });
  } catch (error) {
    console.error('密钥生成/保存失败:', error);
  }
}

// 从 IndexedDB 读取密钥并转换为 CryptoKey
async function loadKeysFromDB() {
  try {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    const [publicKeyBuffer, privateKeyBuffer] = await Promise.all([
      new Promise((resolve) => store.get('publicKey').onsuccess = (e) => resolve(e.target.result?.data)),
      new Promise((resolve) => store.get('privateKey').onsuccess = (e) => resolve(e.target.result?.data))
    ]);

    if (!publicKeyBuffer || !privateKeyBuffer) {
      throw new Error('找不到存储的密钥');
    }

    // 导入为 CryptoKey 对象
    const [publicKey, privateKey] = await Promise.all([
      crypto.subtle.importKey(
        "spki",
        publicKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"]
      ),
      crypto.subtle.importKey(
        "pkcs8",
        privateKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["decrypt"]
      )
    ]);

    return { publicKey, privateKey };
  } catch (error) {
    console.error('读取密钥失败:', error);
    return null;
  }
}

// 从 PEM 格式的公钥转换为 CryptoKey 对象
async function loadPublicKey(pem) {
    const pemHeader = '-----BEGIN PUBLIC KEY-----';
    const pemFooter = '-----END PUBLIC KEY-----';
    const pemContents = pem.replace(pemHeader, '').replace(pemFooter, '').replace(/\s/g, '');
    const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
    return await crypto.subtle.importKey(
        'spki',
        binaryDer,
        { name: 'RSA-OAEP', hash: 'SHA-1' },
        true,
        ['encrypt']
    );
}

// 加密
async function encrypt(str) {

    const publicKey = await loadKeysFromDB();
    const encodedData = new TextEncoder().encode(str);
    
    const encryptedData = await crypto.subtle.encrypt(
        { name: 'RSA-OAEP' },
        publicKey,
        encodedData
    );

    const encodedEncryptedData = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
    
    return encodedEncryptedData
}