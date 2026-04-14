# DarminConverter - Personal File Converter

A beautiful, high-quality file converter built with Next.js frontend and Python backend. Convert PNG to SVG, PNG to JPEG, PowerPoint to PDF, and Word to PDF - all for free!

## Features

- **PNG to SVG** - Convert PNG images to vector SVG format
- **PNG to JPEG/JPG** - High-quality PNG to JPEG conversion with adjustable quality
- **PowerPoint to PDF** - Convert PPT/PPTX presentations to PDF
- **Word to PDF** - Convert DOC/DOCX documents to PDF
- **Beautiful UI** - Modern interface with custom color palette
- **Fast & Free** - No cost for personal use

## Color Palette

- **Primary Dark**: #15173D
- **Primary Purple**: #982598  
- **Secondary Pink**: #E491C9
- **Background Cream**: #F1E9E9

## Setup Instructions

### Prerequisites

1. **Node.js 18+** installed
2. **Python 3.8+** installed
3. **LibreOffice** installed (required for document conversions)

### Step 1: Setup Frontend (Next.js)

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Step 2: Setup Backend (Python)

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
python start_server.py
```

The backend will start on [http://localhost:8000](http://localhost:8000)

### Step 3: Install LibreOffice (Required for Document Conversions)

Download and install LibreOffice from [https://www.libreoffice.org](https://www.libreoffice.org)

**Important**: Make sure to include the optional components during installation for proper PDF conversion functionality.

## Usage

1. Make sure both frontend (port 3000) and backend (port 8000) are running
2. Open [http://localhost:3000](http://localhost:3000)
3. Select a converter type
4. Upload your file
5. Click "Convert File" and download the result

## API Documentation

When the backend is running, you can access:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Project Structure

```
converter-app/
|-- app/                    # Next.js frontend
|   |-- page.tsx           # Main converter interface
|   |-- layout.tsx         # Root layout
|   |-- globals.css        # Global styles
|-- backend/                # Python FastAPI backend
|   |-- main.py            # FastAPI application
|   |-- start_server.py    # Startup script
|   |-- requirements.txt   # Python dependencies
|   |-- converters/        # Conversion logic
|   |   |-- image_converter.py
|   |   |-- document_converter.py
|   |-- uploads/           # Temporary file storage
```

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Python, FastAPI, OpenCV, Pillow, potrace
- **Document Conversion**: LibreOffice (external dependency)

## Troubleshooting

### Backend Issues
- Check [README_BACKEND.md](README_BACKEND.md) for detailed troubleshooting
- Ensure LibreOffice is properly installed
- Verify Python dependencies are installed

### Frontend Issues
- Clear browser cache
- Restart the development server
- Check console for errors

### Conversion Issues
- Ensure file formats are supported
- Check file size (very large files may timeout)
- Verify LibreOffice installation for document conversions

## Development

### Frontend Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Backend Development
```bash
cd backend
python start_server.py    # Start with auto-reload
```

## License

This project is for personal use and is provided as-is.
# need-converter
