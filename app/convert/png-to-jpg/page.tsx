import ConverterPage from "@/components/ConverterPage";
import { FileImageOutlined } from "@ant-design/icons";

export default function PngToJpgPage() {
  return (
    <ConverterPage
      title="PNG to JPEG Converter"
      description="Convert your PNG images to JPEG format with adjustable quality settings. Reduce file size while maintaining quality."
      icon={<FileImageOutlined style={{ fontSize: 48 }} />}
      acceptedFileTypes=".png"
      apiEndpoint="/convert/png-to-jpg"
      outputExtension="jpg"
      color="#E491C9"
    />
  );
}
