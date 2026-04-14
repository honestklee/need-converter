import subprocess
import os


def convert_ppt_to_pdf(input_path: str, output_path: str) -> None:
    """
    Convert PowerPoint presentation to PDF using LibreOffice.
    """
    temp_dir = os.path.dirname(output_path)

    try:
        # Use LibreOffice in headless mode
        result = subprocess.run([
            'soffice',
            '--headless',
            '--convert-to', 'pdf',
            '--outdir', temp_dir,
            input_path
        ], capture_output=True, text=True, timeout=120)

        if result.returncode != 0:
            raise RuntimeError(f"LibreOffice conversion failed: {result.stderr}")

        # LibreOffice creates file with .pdf extension in temp_dir
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        libre_output = os.path.join(temp_dir, base_name + '.pdf')

        # Rename to desired output path if different
        if libre_output != output_path and os.path.exists(libre_output):
            os.rename(libre_output, output_path)

        if not os.path.exists(output_path):
            raise RuntimeError("PDF file was not created")

    except subprocess.TimeoutExpired:
        raise RuntimeError("Conversion timed out after 120 seconds")
    except FileNotFoundError:
        raise RuntimeError("LibreOffice not found. Please install LibreOffice.")


def convert_word_to_pdf(input_path: str, output_path: str) -> None:
    """
    Convert Word document to PDF using LibreOffice.
    """
    temp_dir = os.path.dirname(output_path)

    try:
        # Use LibreOffice in headless mode
        result = subprocess.run([
            'soffice',
            '--headless',
            '--convert-to', 'pdf',
            '--outdir', temp_dir,
            input_path
        ], capture_output=True, text=True, timeout=120)

        if result.returncode != 0:
            raise RuntimeError(f"LibreOffice conversion failed: {result.stderr}")

        # LibreOffice creates file with .pdf extension in temp_dir
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        libre_output = os.path.join(temp_dir, base_name + '.pdf')

        # Rename to desired output path if different
        if libre_output != output_path and os.path.exists(libre_output):
            os.rename(libre_output, output_path)

        if not os.path.exists(output_path):
            raise RuntimeError("PDF file was not created")

    except subprocess.TimeoutExpired:
        raise RuntimeError("Conversion timed out after 120 seconds")
    except FileNotFoundError:
        raise RuntimeError("LibreOffice not found. Please install LibreOffice.")
