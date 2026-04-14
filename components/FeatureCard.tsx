import React from 'react';
import { Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card 
    hoverable
    style={{ 
      textAlign: 'center', 
      borderRadius: '12px', 
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      height: '240px',
      width: '100%',
      transition: 'all 0.3s ease'
    }}
    bodyStyle={{ 
      padding: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      height: '100%',
      width: '100%'
    }}
    className="feature-card"
  >
    <Space direction="vertical" size="middle" style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
      <div style={{ 
        width: '64px', 
        height: '64px', 
        backgroundColor: '#f3f4f6', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto',
        color: '#982598'
      }}>
        {icon}
      </div>
      <Title level={4} style={{ color: '#15173D', margin: 0, fontSize: '1.1rem', textAlign: 'center' }}>
        {title}
      </Title>
      <Text type="secondary" style={{ fontSize: '0.95rem', lineHeight: '1.5', textAlign: 'center' }}>
        {description}
      </Text>
    </Space>
  </Card>
);

export default FeatureCard;
