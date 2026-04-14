#!/usr/bin/env python3
"""
Startup script for DarminConverter Backend
"""

import uvicorn
import os
import sys
from pathlib import Path

# Add current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

def main():
    print("Starting DarminConverter Backend Server...")
    print("Frontend should be running on http://localhost:3000")
    print("Backend API will be available on http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")
    
    # Create uploads directory
    uploads_dir = current_dir / "uploads"
    uploads_dir.mkdir(exist_ok=True)
    
    # Start the server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Enable auto-reload for development
        log_level="info"
    )

if __name__ == "__main__":
    main()
