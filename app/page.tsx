"use client";

import Link from "next/link";
import { 
  FileImageOutlined, 
  FilePptOutlined, 
  FileWordOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Typography, Card } from "antd";
import { Layout, FeatureCard } from '../components';

const { Title, Text } = Typography;

const converters = [
  {
    id: "png-to-svg",
    title: "PNG to SVG",
    description: "Convert PNG images to SVG vector format",
    icon: <FileImageOutlined style={{ fontSize: 32, color: "#982598" }} />,
    href: "/convert/png-to-svg",
    color: "#982598"
  },
  {
    id: "png-to-jpg",
    title: "PNG to JPEG",
    description: "Convert PNG to JPEG with high quality",
    icon: <FileImageOutlined style={{ fontSize: 32, color: "#E491C9" }} />,
    href: "/convert/png-to-jpg",
    color: "#E491C9"
  },
  {
    id: "ppt-to-pdf",
    title: "PowerPoint to PDF",
    description: "Convert PowerPoint presentations to PDF",
    icon: <FilePptOutlined style={{ fontSize: 32, color: "#982598" }} />,
    href: "/convert/ppt-to-pdf",
    color: "#982598"
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert Word documents to PDF format",
    icon: <FileWordOutlined style={{ fontSize: 32, color: "#E491C9" }} />,
    href: "/convert/word-to-pdf",
    color: "#E491C9"
  }
];

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center">
        {/* Main Content - Centered Container */}
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-12 sm:py-16">
          {/* Converter Selection */}
          <section className="w-full">
            <div className="text-center mb-10">
              <Title level={2} style={{ color: '#15173D', fontSize: '2rem', marginBottom: '1rem' }}>
                Select a Tool
              </Title>
              <Text style={{ color: '#666', fontSize: '1.1rem' }}>
                Click on a tool to start converting your files
              </Text>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center w-full">
              {converters.map((converter) => (
                <Link 
                  key={converter.id} 
                  href={converter.href}
                  className="w-full max-w-xs"
                >
                  <Card
                    hoverable
                    style={{
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      borderRadius: '12px',
                      height: '220px',
                      width: '100%',
                      transition: 'all 0.3s ease'
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
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                      {converter.icon}
                    </div>
                    <Title level={4} style={{ color: '#15173D', margin: 0, fontSize: '1.1rem', textAlign: 'center' }}>
                      {converter.title}
                    </Title>
                    <Text type="secondary" style={{ fontSize: '0.9rem', lineHeight: '1.4', textAlign: 'center' }}>
                      {converter.description}
                    </Text>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="mt-16 w-full sm:mt-20">
            <div className="mb-12 text-center">
              <Title level={2} style={{ color: '#15173D', fontSize: '2rem', marginBottom: '1rem' }}>
                Why Choose This Converter?
              </Title>
              <Text style={{ color: '#666', fontSize: '1.1rem' }}>
                Professional file conversion with advanced features
              </Text>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
              <FeatureCard
                icon={<ThunderboltOutlined style={{ fontSize: '28px' }} />}
                title="Lightning Fast"
                description="Process your files in seconds with our optimized conversion engine"
              />
              <FeatureCard
                icon={<CheckCircleOutlined style={{ fontSize: '28px' }} />}
                title="High Quality"
                description="Maintain excellent quality with advanced conversion algorithms"
              />
              <FeatureCard
                icon={<DollarCircleOutlined style={{ fontSize: '28px' }} />}
                title="Always Free"
                description="No hidden costs or limitations - convert files without restrictions"
              />
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mt-16 mb-10 w-full sm:mt-20">
            <div className="text-center mb-12">
              <Title level={2} style={{ color: '#15173D', fontSize: '2rem', marginBottom: '1rem' }}>
                How It Works
              </Title>
              <Text style={{ color: '#666', fontSize: '1.1rem' }}>
                Convert your files in three simple steps
              </Text>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto w-full">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#982598] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                  1
                </div>
                <Title level={4} style={{ color: '#15173D', marginBottom: '1rem' }}>Choose Tool</Title>
                <Text type="secondary" style={{ fontSize: '1rem' }}>Select the conversion tool you need</Text>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#E491C9] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                  2
                </div>
                <Title level={4} style={{ color: '#15173D', marginBottom: '1rem' }}>Upload File</Title>
                <Text type="secondary" style={{ fontSize: '1rem' }}>Upload your file using our secure interface</Text>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#15173D] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                  3
                </div>
                <Title level={4} style={{ color: '#15173D', marginBottom: '1rem' }}>Download</Title>
                <Text type="secondary" style={{ fontSize: '1rem' }}>Get your converted file instantly</Text>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
