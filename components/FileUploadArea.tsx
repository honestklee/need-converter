import React from 'react';
import { Card, Typography, Space, Alert, Progress, Button, Upload as AntUpload } from 'antd';
import { CloudUploadOutlined, FilePdfOutlined, DownloadOutlined, LoadingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface FileUploadAreaProps {
  selectedConverter: string;
  file: File | null;
  isConverting: boolean;
  conversionProgress: number;
  onFileSelect: (info: any) => void;
  onConvert: () => void;
  converters: any[];
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  selectedConverter,
  file,
  isConverting,
  conversionProgress,
  onFileSelect,
  onConvert,
  converters
}) => {
  const currentConverter = converters.find(c => c.id === selectedConverter);

  return (
    <Card 
      style={{ 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb'
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={3} style={{ color: '#15173D', margin: 0, fontSize: '1.5rem' }}>
            Upload Your File
          </Title>
          <Text type="secondary" style={{ fontSize: '1rem' }}>
            Select a {currentConverter?.title} file to convert
          </Text>
        </div>
        
        <AntUpload.Dragger
          accept={currentConverter?.accept}
          beforeUpload={() => false}
          onChange={onFileSelect}
          showUploadList={false}
          style={{
            backgroundColor: '#fafafa',
            border: `2px dashed ${currentConverter?.color || '#d1d5db'}`,
            borderRadius: '8px',
            padding: '40px 20px'
          }}
        >
          <Space direction="vertical" size="large">
            <CloudUploadOutlined style={{ fontSize: '3rem', color: currentConverter?.color || '#982598' }} />
            <Space direction="vertical" size="small">
              <Text strong style={{ color: '#15173D', fontSize: '1.1rem' }}>
                Click to upload or drag and drop
              </Text>
              <Text type="secondary">
                {currentConverter?.accept} files only
              </Text>
            </Space>
          </Space>
        </AntUpload.Dragger>

        {file && (
          <Alert
            message={
              <Space>
                <FilePdfOutlined style={{ color: '#982598' }} />
                <div>
                  <Text strong>{file.name}</Text>
                  <br />
                  <Text type="secondary">
                    Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </Text>
                </div>
              </Space>
            }
            type="info"
            showIcon={false}
            style={{ backgroundColor: '#f0f9ff', borderColor: '#0ea5e9' }}
          />
        )}

        {conversionProgress > 0 && (
          <div>
            <Text strong style={{ color: '#15173D', marginBottom: '8px', display: 'block' }}>
              Converting...
            </Text>
            <Progress 
              percent={conversionProgress} 
              strokeColor={{
                '0%': '#982598',
                '100%': '#E491C9',
              }}
              style={{ marginBottom: '1rem' }}
              strokeWidth={8}
            />
          </div>
        )}

        {file && (
          <Button
            type="primary"
            size="large"
            onClick={onConvert}
            disabled={isConverting}
            loading={isConverting}
            icon={isConverting ? <LoadingOutlined /> : <DownloadOutlined />}
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#982598',
              borderColor: '#982598',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '8px'
            }}
          >
            {isConverting ? 'Converting...' : 'Convert File'}
          </Button>
        )}
      </Space>
    </Card>
  );
};

export default FileUploadArea;
