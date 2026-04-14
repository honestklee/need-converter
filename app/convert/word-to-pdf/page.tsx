import ConverterPage from "@/components/ConverterPage";
import { FileWordOutlined } from "@ant-design/icons";

export default function WordToPdfPage() {
  return (
    <ConverterPage
      title="Word to PDF Converter"
      description="Convert your Word documents to PDF format. Maintain formatting, fonts, and layout across all devices."
      icon={<FileWordOutlined style={{ fontSize: 48 }} />}
      acceptedFileTypes=".doc,.docx"
      apiEndpoint="/convert/word-to-pdf"
      outputExtension="pdf"
      color="#E491C9"
    />
  );
}
