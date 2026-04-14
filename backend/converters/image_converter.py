from PIL import Image
import cv2
import numpy as np
import potrace
from pathlib import Path
import tempfile

class ImageConverter:
    async def png_to_svg(self, input_path: Path, output_path: Path) -> Path:
        """
        Convert PNG to SVG using potrace for vectorization
        """
        try:
            # Read image using OpenCV
            img = cv2.imread(str(input_path))
            if img is None:
                raise ValueError("Could not read the input image")
            
            # Convert to grayscale
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Apply threshold to get binary image
            _, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY)
            
            # Invert colors for potrace (potrace expects black on white)
            binary = cv2.bitwise_not(binary)
            
            # Create potrace bitmap
            bmp = potrace.Bitmap(binary)
            
            # Trace the bitmap
            path = bmp.trace()
            
            # Generate SVG content
            svg_content = self._generate_svg(path, img.shape[1], img.shape[0])
            
            # Write SVG file
            with open(output_path, 'w') as f:
                f.write(svg_content)
            
            return output_path
            
        except Exception as e:
            raise Exception(f"PNG to SVG conversion failed: {str(e)}")
    
    async def png_to_jpg(self, input_path: Path, output_path: Path, quality: int = 95) -> Path:
        """
        Convert PNG to JPG with specified quality
        """
        try:
            # Open PNG image
            img = Image.open(input_path)
            
            # Convert to RGB mode (JPG doesn't support transparency)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Save as JPG with specified quality
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            return output_path
            
        except Exception as e:
            raise Exception(f"PNG to JPG conversion failed: {str(e)}")
    
    def _generate_svg(self, path, width: int, height: int) -> str:
        """
        Generate SVG content from potrace path
        """
        svg_header = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
'''
        
        svg_paths = ""
        for curve in path.curves:
            start_x, start_y = curve.start_point
            path_data = f"M {start_x} {start_y}"
            
            for segment in curve.segments:
                if segment.is_corner:
                    end_x, end_y = segment.c
                    path_data += f" L {end_x} {end_y}"
                else:
                    c1_x, c1_y = segment.c1
                    c2_x, c2_y = segment.c2
                    end_x, end_y = segment.c
                    path_data += f" C {c1_x} {c1_y}, {c2_x} {c2_y}, {end_x} {end_y}"
            
            svg_paths += f'  <path d="{path_data}" fill="black" stroke="none" />\n'
        
        svg_footer = '</svg>'
        
        return svg_header + svg_paths + svg_footer
