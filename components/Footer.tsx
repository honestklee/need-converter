import React from 'react';
import { Typography, Space, Divider } from 'antd';
import { LinkedinOutlined, GithubOutlined, MailOutlined, FileImageOutlined, FilePptOutlined, FileWordOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

const Footer: React.FC = () => (
  <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Description */}
        <div>
          <Title level={4} style={{ color: '#15173D', margin: 0, marginBottom: '1rem' }}>
            DarminConverter
          </Title>
          <Text style={{ color: '#666', fontSize: '0.9rem' }}>
            High-quality file conversion tools for personal use. Fast, secure, and completely free.
          </Text>
        </div>

        {/* Tools Links */}
        <div>
          <Title level={5} style={{ color: '#15173D', marginBottom: '1rem' }}>
            Conversion Tools
          </Title>
          <Space direction="vertical" size="small">
            <Link href="/convert/png-to-svg" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
              <FileImageOutlined />
              <span>PNG to SVG</span>
            </Link>
            <Link href="/convert/png-to-jpg" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
              <FileImageOutlined />
              <span>PNG to JPEG</span>
            </Link>
            <Link href="/convert/ppt-to-pdf" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
              <FilePptOutlined />
              <span>PowerPoint to PDF</span>
            </Link>
            <Link href="/convert/word-to-pdf" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
              <FileWordOutlined />
              <span>Word to PDF</span>
            </Link>
          </Space>
        </div>

        {/* Connect Links */}
        <div>
          <Title level={5} style={{ color: '#15173D', marginBottom: '1rem' }}>
            Connect
          </Title>
          <Space direction="vertical" size="small">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <LinkedinOutlined />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <GithubOutlined />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:contact@darminconverter.com"
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <MailOutlined />
              <span>Email</span>
            </a>
          </Space>
        </div>
      </div>

      <Divider style={{ margin: '2rem 0' }} />

      <div className="text-center">
        <Text style={{ color: '#666', fontSize: '0.9rem' }}>
          © 2024 DarminConverter. All rights reserved. Built with Python & Next.js
        </Text>
      </div>
    </div>
  </footer>
);

export default Footer;
