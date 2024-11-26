# backend/app/routers/calories.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from ..services.claude_service import FoodCalorieEstimator
import os
from pathlib import Path
import logging

# 設置日誌
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()
estimator = FoodCalorieEstimator()

@router.post("/estimate")
async def estimate_calories(file: UploadFile = File(...)):
    try:
        # 確保臨時目錄存在
        temp_dir = Path("temp")
        temp_dir.mkdir(exist_ok=True)
        
        # 保存上傳的文件
        temp_path = temp_dir / file.filename
        with open(temp_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        try:
            # 使用估算器處理圖片
            estimator = FoodCalorieEstimator()
            result = estimator.estimate_calories_from_image(str(temp_path))
            return {"result": result}
            
        finally:
            # 清理臨時文件
            if temp_path.exists():
                os.remove(temp_path)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))