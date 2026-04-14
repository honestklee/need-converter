import cv2
import numpy as np
from PIL import Image
import potrace
from potrace import Bitmap
import tempfile
import os


def convert_png_to_svg(input_path: str, output_path: str) -> None:
    """
    Convert PNG image to SVG vector format using potrace.
    """
    # Read image
    img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        raise ValueError("Could not read input image")

    # Convert to grayscale if needed
    if len(img.shape) == 3:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    else:
        gray = img

    # Apply threshold for better vectorization
    _, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    # Create bitmap for potrace
    bitmap = Bitmap(binary)

    # Trace the bitmap
    path = bitmap.trace()

    # Generate SVG content
    svg_content = generate_svg(path, binary.shape[1], binary.shape[0])

    # Write SVG file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)


def generate_svg(path, width, height):
    """Generate SVG content from potrace path."""
    svg_parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<g fill="black" stroke="none">'
    ]

    for curve in path:
        svg_parts.append('<path d="')

        # Start point
        start_point = curve.start_point
        svg_parts.append(f'M{start_point.x},{start_point.y} ')

        # Segments
        for segment in curve.segments:
            if segment.is_corner:
                svg_parts.append(f'L{segment.end_point.x},{segment.end_point.y} ')
            else:
                c1 = segment.c1
                c2 = segment.c2
                end = segment.end_point
                svg_parts.append(f'C{c1.x},{c1.y} {c2.x},{c2.y} {end.x},{end.y} ')

        svg_parts.append('Z" />')

    svg_parts.append('</g>')
    svg_parts.append('</svg>')

    return '\n'.join(svg_parts)


def convert_png_to_jpg(input_path: str, output_path: str, quality: int = 95) -> None:
    """
    Convert PNG image to JPEG format with high quality.
    """
    # Open image with PIL
    img = Image.open(input_path)

    # Convert to RGB if necessary (remove alpha channel)
    if img.mode in ('RGBA', 'LA', 'P'):
        # Create white background for transparency
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        if img.mode in ('RGBA', 'LA'):
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        else:
            img = img.convert('RGB')
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    # Save as JPEG with high quality
    img.save(output_path, 'JPEG', quality=quality, optimize=True)
