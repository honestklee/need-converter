import ConverterPage from "@/components/ConverterPage";
import { FileImageOutlined } from "@ant-design/icons";

export default function PngToSvgPage() {
  return (
    <ConverterPage
      title="PNG to SVG Converter"
      description="Convert your PNG images to SVG vector format with high precision. Perfect for logos, icons, and scalable graphics."
      icon={<FileImageOutlined style={{ fontSize: 48 }} />}
      acceptedFileTypes=".png"
      apiEndpoint="/convert/png-to-svg"
      outputExtension="svg"
      color="#982598"
    />
  );
}
