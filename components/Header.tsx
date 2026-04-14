import React from 'react';
import { Typography, Space } from 'antd';

const { Title, Text } = Typography;

const Header: React.FC = () => (
  <header className="bg-white border-b border-gray-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <div>
            <Title level={3} style={{ color: '#15173D', margin: 0, fontSize: '1.5rem' }}>
              DarminConverter
            </Title>
            <Text style={{ color: '#666', fontSize: '0.9rem' }}>
              Personal File Converter
            </Text>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
