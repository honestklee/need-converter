from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import os
import tempfile
from backend.services.image_service import convert_png_to_svg, convert_png_to_jpg

router = APIRouter(prefix="/convert", tags=["Image Conversion"])


@router.post("/png-to-svg")
async def png_to_svg(file: UploadFile = File(...)):
    """Convert PNG image to SVG vector format."""
    if not file.filename.endswith('.png'):
        raise HTTPException(status_code=400, detail="Only PNG files are accepted")

    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            input_path = os.path.join(temp_dir, file.filename)
            output_filename = file.filename.replace('.png', '.svg')
            output_path = os.path.join(temp_dir, output_filename)

            with open(input_path, 'wb') as f:
                content = await file.read()
                f.write(content)

            convert_png_to_svg(input_path, output_path)

            return FileResponse(
                output_path,
                media_type='image/svg+xml',
                filename=output_filename
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@router.post("/png-to-jpg")
async def png_to_jpg(file: UploadFile = File(...)):
    """Convert PNG image to JPEG format."""
    if not file.filename.endswith('.png'):
        raise HTTPException(status_code=400, detail="Only PNG files are accepted")

    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            input_path = os.path.join(temp_dir, file.filename)
            output_filename = file.filename.replace('.png', '.jpg')
            output_path = os.path.join(temp_dir, output_filename)

            with open(input_path, 'wb') as f:
                content = await file.read()
                f.write(content)

            convert_png_to_jpg(input_path, output_path)

            return FileResponse(
                output_path,
                media_type='image/jpeg',
                filename=output_filename
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")
