import os
import sys
from pathlib import Path
import tempfile
import subprocess
import platform

class DocumentConverter:
    def __init__(self):
        self.system = platform.system().lower()
    
    async def ppt_to_pdf(self, input_path: Path, output_path: Path) -> Path:
        """
        Convert PowerPoint to PDF using LibreOffice
        """
        try:
            if self.system == "windows":
                return await self._convert_with_libreoffice_windows(input_path, output_path, "impress_pdf_Export")
            else:
                return await self._convert_with_libreoffice_linux(input_path, output_path, "impress_pdf_Export")
        except Exception as e:
            raise Exception(f"PPT to PDF conversion failed: {str(e)}")
    
    async def word_to_pdf(self, input_path: Path, output_path: Path) -> Path:
        """
        Convert Word to PDF using LibreOffice
        """
        try:
            if self.system == "windows":
                return await self._convert_with_libreoffice_windows(input_path, output_path, "writer_pdf_Export")
            else:
                return await self._convert_with_libreoffice_linux(input_path, output_path, "writer_pdf_Export")
        except Exception as e:
            raise Exception(f"Word to PDF conversion failed: {str(e)}")
    
    async def _convert_with_libreoffice_windows(self, input_path: Path, output_path: Path, filter_name: str) -> Path:
        """
        Convert document using LibreOffice on Windows
        """
        try:
            # Common LibreOffice installation paths on Windows
            libreoffice_paths = [
                r"C:\Program Files\LibreOffice\program\soffice.exe",
                r"C:\Program Files (x86)\LibreOffice\program\soffice.exe",
                r"C:\Program Files\LibreOffice\program\soffice.com",
                r"C:\Program Files (x86)\LibreOffice\program\soffice.com",
            ]
            
            libreoffice_exe = None
            for path in libreoffice_paths:
                if os.path.exists(path):
                    libreoffice_exe = path
                    break
            
            if not libreoffice_exe:
                # Try to find in PATH
                libreoffice_exe = "soffice"
            
            # Create output directory
            output_dir = output_path.parent
            output_dir.mkdir(parents=True, exist_ok=True)
            
            # Command to convert to PDF
            cmd = [
                libreoffice_exe,
                "--headless",
                "--convert-to", "pdf",
                "--outdir", str(output_dir),
                str(input_path)
            ]
            
            # Run conversion
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=60  # 60 seconds timeout
            )
            
            if result.returncode != 0:
                raise Exception(f"LibreOffice conversion failed: {result.stderr}")
            
            # Find the generated PDF file
            pdf_files = list(output_dir.glob(f"{input_path.stem}.pdf"))
            if not pdf_files:
                raise Exception("PDF file was not generated")
            
            # Move to desired output path
            generated_pdf = pdf_files[0]
            if generated_pdf != output_path:
                generated_pdf.rename(output_path)
            
            return output_path
            
        except subprocess.TimeoutExpired:
            raise Exception("Conversion timed out")
        except Exception as e:
            raise Exception(f"LibreOffice conversion failed: {str(e)}")
    
    async def _convert_with_libreoffice_linux(self, input_path: Path, output_path: Path, filter_name: str) -> Path:
        """
        Convert document using LibreOffice on Linux
        """
        try:
            # Try different LibreOffice command names
            libreoffice_commands = ["libreoffice", "soffice"]
            
            libreoffice_cmd = None
            for cmd in libreoffice_commands:
                try:
                    subprocess.run([cmd, "--version"], capture_output=True, check=True)
                    libreoffice_cmd = cmd
                    break
                except (subprocess.CalledProcessError, FileNotFoundError):
                    continue
            
            if not libreoffice_cmd:
                raise Exception("LibreOffice not found. Please install LibreOffice.")
            
            # Create output directory
            output_dir = output_path.parent
            output_dir.mkdir(parents=True, exist_ok=True)
            
            # Command to convert to PDF
            cmd = [
                libreoffice_cmd,
                "--headless",
                "--convert-to", "pdf",
                "--outdir", str(output_dir),
                str(input_path)
            ]
            
            # Run conversion
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=60  # 60 seconds timeout
            )
            
            if result.returncode != 0:
                raise Exception(f"LibreOffice conversion failed: {result.stderr}")
            
            # Find the generated PDF file
            pdf_files = list(output_dir.glob(f"{input_path.stem}.pdf"))
            if not pdf_files:
                raise Exception("PDF file was not generated")
            
            # Move to desired output path
            generated_pdf = pdf_files[0]
            if generated_pdf != output_path:
                generated_pdf.rename(output_path)
            
            return output_path
            
        except subprocess.TimeoutExpired:
            raise Exception("Conversion timed out")
        except Exception as e:
            raise Exception(f"LibreOffice conversion failed: {str(e)}")
