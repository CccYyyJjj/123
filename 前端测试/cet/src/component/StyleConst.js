import React, { useState }from 'react';
import { Flex, Layout, Button, DatePicker, Space, Dropdown, DatePickerProps
} from 'antd';
import { DownOutlined, SmileOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export const headerStyle = {
  fontSize: "20px",
  textAlign: 'left',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: 'rgb(42,47,79)',
};

export const contentStyle = {
  fontSize: "20px",
  textAlign: 'center',
  minHeight: 620,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'rgb(230,232,230)',
};

export const siderStyle = {
  fontSize: "20px",
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'rgb(138,143,253)',
};

export const footerStyle = {
  fontSize: "20px",
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'rgb(42,47,79)',
};

export const layoutStyle = {
  fontSize: "20px",
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  height: 1004
};

export const ButtonType = {
  fontSize: "20px",
  width: 160,
  height: 50,
  textAlign: 'center',
};

export const SpaceStyle1 = {
  overflow: 'hidden',
  width: 800,
  height: 500,
  textAlign: 'center',
};

export const SpaceStyle2 = {
  overflow: 'hidden',
  width: 80,
  height: 50,
  textAlign: 'center',
};

export const dateFormat = 'YYYY/MM/DD';

export const items = [
  
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.baidu.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.baidu.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.baidu.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];

export const itemsSpace = {
  textAlign: 'center',
  overflow: 'hidden',
  width: 80000,
  height: 50
}

