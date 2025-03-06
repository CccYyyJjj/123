import React from 'react';
import { Flex, Layout, Button, DatePicker, Space, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const { Header, Footer, Sider, Content } = Layout;
const { RangePicker } = DatePicker;

const headerStyle = {
  fontSize: "20px",
  textAlign: 'left',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: 'rgb(42,47,79)',
};
const contentStyle = {
  fontSize: "20px",
  textAlign: 'center',
  minHeight: 620,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'rgb(230,232,230)',
};
const siderStyle = {
  fontSize: "20px",
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'rgb(138,143,253)',
};
const footerStyle = {
  fontSize: "20px",
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'rgb(42,47,79)',
};
const layoutStyle = {
  fontSize: "20px",
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  height: 1004
};
const ButtonType = {
  fontSize: "20px",
  width: 160,
  height: 50,
  textAlign: 'center',
};
const SpaceStyle1 = {
  overflow: 'hidden',
  width: 800,
  height: 500,
  textAlign: 'center',
};
const SpaceStyle2 = {
  overflow: 'hidden',
  width: 80,
  height: 50,
  textAlign: 'center',
};
const dateFormat = 'YYYY/MM/DD';
const Background = () => (
  <Flex gap="middle" wrap>
    

    <Layout style={layoutStyle}>
      <Header style={headerStyle}>基于区块链的用户数据存储系统</Header>
      <Layout>
      
        <Sider width="25%" style={siderStyle}>
        在这里上传下载你的数据！
          <Space style={SpaceStyle1}>
            <Flex gap="large" wrap>
              <Space style={SpaceStyle2}></Space> 
              <Button style={ButtonType}>上传</Button>
              <Space style={SpaceStyle2}></Space>
              <Button style={ButtonType}>下载</Button>
            </Flex>
          </Space>
        </Sider>
        <Content style={contentStyle}>
          <RangePicker
          defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
          format={dateFormat}
          />
        </Content>
        
      </Layout>
      <Footer style={footerStyle}>超级无敌闪光炫酷系统© 2025</Footer>
    </Layout>

  </Flex>

);
export default Background;

export const API_BASE_URL = 'http://localhost:5000'; 