# backend/app/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .routers import chat, calories
import logging

 #日誌
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)
app = FastAPI()
# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    # allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 全局錯誤處理
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global error handler caught: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)}
    )
# 健康檢查端點
@app.get("/health")
async def health_check():
    return {"status": "healthy"}
# 包含路由器
# Include routers
app.include_router(chat.router, prefix="/api")
app.include_router(calories.router, prefix="/api/calories")

# 啟動事件
@app.on_event("startup")
async def startup_event():
    try:
        # 預熱 RAG 系統
        from .services.llm_service import ResumeAssistant
        logger.info("Initializing RAG system...")
        assistant = ResumeAssistant.get_instance()
        logger.info("RAG system initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing RAG system: {str(e)}")
        raise