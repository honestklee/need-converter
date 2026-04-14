const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ConversionResponse {
  success: boolean;
  data?: Blob;
  error?: string;
}

export const convertFile = async (
  endpoint: string,
  file: File
): Promise<ConversionResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Conversion failed');
    }

    const blob = await response.blob();
    return {
      success: true,
      data: blob,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Specific conversion functions
export const convertPngToSvg = (file: File) =>
  convertFile('/convert/png-to-svg', file);

export const convertPngToJpg = (file: File) =>
  convertFile('/convert/png-to-jpg', file);

export const convertPptToPdf = (file: File) =>
  convertFile('/convert/ppt-to-pdf', file);

export const convertWordToPdf = (file: File) =>
  convertFile('/convert/word-to-pdf', file);
