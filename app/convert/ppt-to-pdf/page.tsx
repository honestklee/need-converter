import ConverterPage from "@/components/ConverterPage";
import { FilePptOutlined } from "@ant-design/icons";

export default function PptToPdfPage() {
  return (
    <ConverterPage
      title="PowerPoint to PDF Converter"
      description="Transform your PowerPoint presentations into PDF documents. Preserve formatting and make your files universally accessible."
      icon={<FilePptOutlined style={{ fontSize: 48 }} />}
      acceptedFileTypes=".ppt,.pptx"
      apiEndpoint="/convert/ppt-to-pdf"
      outputExtension="pdf"
      color="#982598"
    />
  );
}
