# DarminConverter Backend Setup

## Prerequisites

1. **Python 3.8+** installed
2. **LibreOffice** installed (required for PowerPoint and Word to PDF conversion)
   - Download from: https://www.libreoffice.org/download/download-libreoffice/
   - Make sure to include the optional components during installation

## Setup Instructions

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Create Virtual Environment
```bash
python -m venv venv
```

### 3. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Start the Backend Server
```bash
python start_server.py
```

The backend server will start on `http://localhost:8000`

## API Documentation

Once the server is running, you can access the interactive API documentation at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Available Endpoints

### Image Conversions
- `POST /convert/png-to-svg` - Convert PNG to SVG
- `POST /convert/png-to-jpg` - Convert PNG to JPEG (with quality parameter)

### Document Conversions
- `POST /convert/ppt-to-pdf` - Convert PowerPoint to PDF
- `POST /convert/word-to-pdf` - Convert Word to PDF

## Important Notes

1. **LibreOffice Requirement**: The document conversion features (PPT/Word to PDF) require LibreOffice to be installed on your system.

2. **File Size Limits**: There are no strict file size limits, but very large files may timeout.

3. **Temporary Files**: The backend automatically cleans up input files, but output files remain in the `uploads` directory.

4. **Cross-Origin**: The backend is configured to allow requests from `http://localhost:3000` (Next.js development server).

## Troubleshooting

### LibreOffice Not Found
If you get an error about LibreOffice not being found:
1. Make sure LibreOffice is properly installed
2. Try restarting your terminal/command prompt
3. On Windows, check that LibreOffice is in your PATH or installed in the default location

### Conversion Timeout
If conversions are timing out:
1. Check if the file is extremely large
2. Make sure LibreOffice is running properly
3. Try with a smaller test file first

### Permission Errors
If you get permission errors:
1. Make sure the backend has write permissions to the `uploads` directory
2. On Windows, try running as administrator
3. On Linux/Mac, check directory permissions with `ls -la`

## Development

The backend uses FastAPI with auto-reload enabled for development. Any changes to the code will automatically restart the server.
