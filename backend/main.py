from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import image_routes, document_routes

app = FastAPI(
    title="DarminConverter API",
    version="2.0.0",
    description="High-quality file conversion API for images and documents"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(image_routes.router)
app.include_router(document_routes.router)


@app.get("/")
async def root():
    return {
        "message": "DarminConverter API is running",
        "version": "2.0.0",
        "endpoints": [
            "/convert/png-to-svg",
            "/convert/png-to-jpg",
            "/convert/ppt-to-pdf",
            "/convert/word-to-pdf"
        ]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
