import React, { useState } from 'react';
import { Upload, Button, Alert } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Dragger } = Upload;

const App = () => {
  const [file, setFile] = useState(null);
  const [alertState, setAlertState] = useState({
    visible: false,
    type: 'info',
    message: ''
  });

  // 关闭 Alert 的回调
  const handleAlertClose = () => {
    setAlertState({ ...alertState, visible: false });
  };

  // 显示 Alert 的封装函数
  const showAlert = (type, message) => {
    setAlertState({
      visible: true,
      type,
      message
    });
    // 3秒后自动关闭（可选）
    setTimeout(handleAlertClose, 3000);
  };

  const uploadProps = {
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
  };

  const handleUpload = () => {
    if (!file) {
      showAlert('warning', '请先选择文件'); // 显示警告提示
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://10.33.83.197:5000/upload', formData)
      .then(response => {
        if (response.data.status === 1) {
          showAlert('success', '上传成功'); // 显示成功提示
        } else {
          showAlert('error', '上传失败: ' + (response.data.message || '未知错误'));
        }
      })
      .catch(error => {
        showAlert('error', '上传失败: ' + (error.message || '网络异常'));
      });
  };

  return (
    <div style={{ padding: 20, maxWidth: 300 }}>
      {/* 显示 Alert 提示 */}
      {alertState.visible && (
        <Alert
          message={alertState.message}
          type={alertState.type}
          closable
          onClose={handleAlertClose}
          style={{ marginBottom: 16 }}
        />
      )}

      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p>点击或拖拽文件到此处</p>
      </Dragger>
      
      <Button
        type="primary"
        onClick={handleUpload}
        style={{ marginTop: 16 }}
        size="large"
      >
        上传文件
      </Button>
    </div>
  );
};

export default App;