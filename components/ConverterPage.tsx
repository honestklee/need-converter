"use client";

import { useEffect, useState } from "react";
import { Typography, Progress } from "antd";
import { Upload as AntUpload } from "antd";
import { 
  LeftOutlined, 
  CloudUploadOutlined,
  DownloadOutlined, 
  FileOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  CheckCircleFilled
} from "@ant-design/icons";
import Link from "next/link";
import { convertFile, downloadFile } from "@/services";

const { Title, Text } = Typography;

// Theme Colors
const THEME = {
  primaryDark: '#15173D',
  primaryPurple: '#982598',
  secondaryPink: '#E491C9',
  backgroundCream: '#F8F6FA',
  white: '#FFFFFF',
  grayLight: '#F3F4F6',
  grayMedium: '#6B7280',
};

interface ConverterPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  acceptedFileTypes: string;
  apiEndpoint: string;
  outputExtension: string;
  color: string;
}

const ConverterPage: React.FC<ConverterPageProps> = ({
  title,
  description,
  icon,
  acceptedFileTypes,
  apiEndpoint,
  outputExtension,
  color,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (info: any) => {
    const { file: uploadedFile } = info;
    if (uploadedFile.originFileObj) {
      setFile(uploadedFile.originFileObj);
      setConvertedFileUrl(null);
      handleConvert(uploadedFile.originFileObj);
    }
  };

  const handleConvert = async (selectedFile: File) => {
    if (!selectedFile) return;

    setIsConverting(true);
    setConversionProgress(0);

    const progressInterval = setInterval(() => {
      setConversionProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const result = await convertFile(apiEndpoint, selectedFile);

      clearInterval(progressInterval);

      if (result.success && result.data) {
        const url = window.URL.createObjectURL(result.data);
        setConvertedFileUrl(url);
        setConversionProgress(100);
      } else {
        throw new Error(result.error || "Conversion failed");
      }
    } catch (error) {
      console.error("Error converting file:", error);
      alert("Error converting file. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!file || !convertedFileUrl) return;

    fetch(convertedFileUrl)
      .then(response => response.blob())
      .then(blob => {
        const originalName = file.name.replace(/\.[^/.]+$/, "");
        downloadFile(blob, `${originalName}_converted.${outputExtension}`);
      });
  };

  useEffect(() => {
    return () => {
      if (convertedFileUrl) {
        window.URL.revokeObjectURL(convertedFileUrl);
      }
    };
  }, [convertedFileUrl]);

  const getFileTypeLabel = () => {
    switch (acceptedFileTypes) {
      case ".png":
        return "PNG";
      case ".ppt,.pptx":
        return "PPT";
      case ".doc,.docx":
        return "DOC";
      default:
        return "file";
    }
  };

  const getFileIcon = () => {
    switch (acceptedFileTypes) {
      case ".png":
        return <FileImageOutlined className="text-5xl sm:text-6xl" style={{ color }} />;
      case ".ppt,.pptx":
      case ".doc,.docx":
        return <FilePdfOutlined className="text-5xl sm:text-6xl" style={{ color }} />;
      default:
        return <FileOutlined className="text-5xl sm:text-6xl" style={{ color }} />;
    }
  };

  return (
    <div
      className="min-h-screen py-8 sm:py-12 flex items-center"
      style={{
        background: `linear-gradient(180deg, ${THEME.backgroundCream} 0%, #fdfdff 100%)`,
      }}
    >
      <Link
        href="/"
        className="fixed left-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-gray-300 hover:text-gray-900 sm:left-6 sm:top-6"
        aria-label="Back to home"
      >
        <LeftOutlined />
      </Link>

      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-10">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${color}1a`, color }}
          >
            {icon}
          </div>
          <Title
            level={1}
            className="mb-3! text-3xl! sm:text-4xl!"
            style={{ color: THEME.primaryDark, fontWeight: 700 }}
          >
            {title}
          </Title>
          <Text className="mx-auto block max-w-xl text-base" style={{ color: THEME.grayMedium }}>
            {description}
          </Text>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
          {!file && !isConverting && !convertedFileUrl && (
            <AntUpload.Dragger
              accept={acceptedFileTypes}
              beforeUpload={() => false}
              onChange={handleFileSelect}
              showUploadList={false}
              className="border-0! bg-transparent!"
            >
              <div
                className="rounded-2xl border-2 border-dashed border-gray-300 px-4 py-28 text-center transition-all duration-200 hover:border-purple-400 sm:px-8 sm:py-32"
                onMouseEnter={() => setIsDragging(true)}
                onMouseLeave={() => setIsDragging(false)}
              >
                <div
                  className="mx-auto mb-4 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full transition-all"
                  style={{
                    backgroundColor: isDragging ? THEME.secondaryPink : "#f3e8f3",
                    transform: isDragging ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  <CloudUploadOutlined className="text-2xl" style={{ color }} />
                </div>

                <p className="mb-2 text-lg font-semibold" style={{ color: THEME.primaryDark }}>
                  Drop your {getFileTypeLabel()} file here
                </p>
                <p className="text-sm" style={{ color: THEME.grayMedium }}>
                  Click the upload icon or drag and drop to choose a file
                </p>
              </div>
            </AntUpload.Dragger>
          )}

          {file && !isConverting && !convertedFileUrl && (
            <div className="px-4 py-10 text-center sm:px-8 sm:py-12">
              <div className="mb-4 flex items-center justify-center">{getFileIcon()}</div>
              <p className="mb-1 break-all text-lg font-semibold" style={{ color: THEME.primaryDark }}>
                {file.name}
              </p>
              <p className="mb-6 text-sm" style={{ color: THEME.grayMedium }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                onClick={() => handleConvert(file)}
                className="rounded-xl px-8 py-3 font-semibold text-white shadow-sm transition hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                Convert Now
              </button>
            </div>
          )}

          {isConverting && (
            <div className="px-4 py-10 text-center sm:px-8 sm:py-12">
              <p className="mb-5 text-lg font-semibold" style={{ color: THEME.primaryDark }}>
                Converting your file...
              </p>
              <Progress
                percent={conversionProgress}
                strokeColor={color}
                strokeWidth={9}
                showInfo={false}
                className="mx-auto max-w-sm"
              />
              <p className="mt-3 text-sm" style={{ color: THEME.grayMedium }}>
                Please wait a moment
              </p>
            </div>
          )}

          {convertedFileUrl && (
            <div className="px-4 py-10 text-center sm:px-8 sm:py-12">
              <CheckCircleFilled className="mb-4 text-5xl text-emerald-500" />
              <p className="mb-1 text-lg font-semibold" style={{ color: THEME.primaryDark }}>
                Conversion complete
              </p>
              <p className="mb-6 break-all text-sm" style={{ color: THEME.grayMedium }}>
                {file?.name}
              </p>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-600"
              >
                <DownloadOutlined />
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConverterPage;
