import React, { useState }from 'react';
import { Flex, Layout, Button, DatePicker, Space, Dropdown, DatePickerProps,message, Upload, Alert
} from 'antd';
import { DownOutlined, SmileOutlined, InboxOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { 
  headerStyle,contentStyle,siderStyle,footerStyle,
  layoutStyle,
  ButtonType,
  SpaceStyle1,SpaceStyle2,
  dateFormat,
  items,itemsSpace
} from './component/StyleConst.js';
import axios from 'axios';

dayjs.extend(customParseFormat);
const { Header, Footer, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;

const Background = () => {

  const [selectedDates, setSelectedDates] = useState([
    dayjs('2025/01/01', dateFormat),
    dayjs('2025/04/01', dateFormat)
  ]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:5000/transactions/new`, {
        method: 'POST',
        headers: {
          
        },
        body: JSON.stringify({
          start_date: selectedDates[0].format(dateFormat),
          end_date: selectedDates[1].format(dateFormat)
        })
      });
      
      if (!response.ok) throw new Error('上传失败');
      const data = await response.json();
      message.success(`数据上传成功！区块哈希：${data.block_hash}`);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };  

  return(
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          基于区块链的用户数据存储系统
          <Dropdown menu={{items}} >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
              关于我
              <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown menu={{items}} >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
              关于我
              <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          
        </Header>
      <Layout>
        <Sider width="25%" style={siderStyle}>
          在这里上传下载你的数据！
          <Space style={SpaceStyle1}>
            <Flex gap="large" wrap>
              <Space style={SpaceStyle2}></Space> 
              
              <Button 
                style={ButtonType}
                type="primary" 
                onClick={handleUpload}
                loading={loading} //自动显示加载状态
                disabled={loading}
                >
                  {loading ? '上传中...' : '上传'}
              </Button>
              
              <Space style={SpaceStyle2}></Space>
              <Button style={ButtonType}>下载</Button>
              </Flex>
             </Space>
         </Sider>
         <Content style={contentStyle}>
            <RangePicker
            defaultValue={[dayjs('2025/01/01', dateFormat), dayjs('2025/04/01', dateFormat)]}
            format={dateFormat}
            />
         </Content> 
        </Layout>
        <Footer style={footerStyle}>超级无敌闪光炫酷系统© 2025</Footer>
      </Layout>
    </Flex>
  )
};
export default Background;

export const API_BASE_URL = 'http://localhost:5000'; 