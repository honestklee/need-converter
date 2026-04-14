import React from 'react';
import { Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

interface ConverterCardProps {
  converter: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    accept: string;
    color: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

const ConverterCard: React.FC<ConverterCardProps> = ({ converter, isSelected, onClick }) => (
  <Card
    hoverable
    onClick={onClick}
    className={`converter-card ${isSelected ? 'selected' : ''}`}
    style={{
      textAlign: 'center',
      cursor: 'pointer',
      border: isSelected ? `2px solid ${converter.color}` : '1px solid #e5e7eb',
      boxShadow: isSelected ? `0 8px 24px ${converter.color}20` : '0 1px 3px rgba(0,0,0,0.1)',
      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
      transition: 'all 0.3s ease',
      borderRadius: '12px',
      height: '220px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
    bodyStyle={{ 
      padding: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    }}
  >
    <Space direction="vertical" size="middle" style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
        {converter.icon}
      </div>
      <Title level={4} style={{ color: '#15173D', margin: 0, fontSize: '1.1rem', textAlign: 'center' }}>
        {converter.title}
      </Title>
      <Text type="secondary" style={{ fontSize: '0.9rem', lineHeight: '1.4', textAlign: 'center' }}>
        {converter.description}
      </Text>
    </Space>
  </Card>
);

export default ConverterCard;
