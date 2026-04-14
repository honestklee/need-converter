from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import os
import tempfile
from backend.services.document_service import convert_ppt_to_pdf, convert_word_to_pdf

router = APIRouter(prefix="/convert", tags=["Document Conversion"])


@router.post("/ppt-to-pdf")
async def ppt_to_pdf(file: UploadFile = File(...)):
    """Convert PowerPoint presentation to PDF."""
    if not (file.filename.endswith('.ppt') or file.filename.endswith('.pptx')):
        raise HTTPException(status_code=400, detail="Only PPT/PPTX files are accepted")

    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            input_path = os.path.join(temp_dir, file.filename)
            output_filename = file.filename.replace('.pptx', '.pdf').replace('.ppt', '.pdf')
            output_path = os.path.join(temp_dir, output_filename)

            with open(input_path, 'wb') as f:
                content = await file.read()
                f.write(content)

            convert_ppt_to_pdf(input_path, output_path)

            return FileResponse(
                output_path,
                media_type='application/pdf',
                filename=output_filename
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@router.post("/word-to-pdf")
async def word_to_pdf(file: UploadFile = File(...)):
    """Convert Word document to PDF."""
    if not (file.filename.endswith('.doc') or file.filename.endswith('.docx')):
        raise HTTPException(status_code=400, detail="Only DOC/DOCX files are accepted")

    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            input_path = os.path.join(temp_dir, file.filename)
            output_filename = file.filename.replace('.docx', '.pdf').replace('.doc', '.pdf')
            output_path = os.path.join(temp_dir, output_filename)

            with open(input_path, 'wb') as f:
                content = await file.read()
                f.write(content)

            convert_word_to_pdf(input_path, output_path)

            return FileResponse(
                output_path,
                media_type='application/pdf',
                filename=output_filename
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")
