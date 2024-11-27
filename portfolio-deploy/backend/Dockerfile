# 文件位置: backend/Dockerfile

# 使用 CUDA 基礎映像以支援 GPU（如果有）
FROM nvidia/cuda:11.8.0-runtime-ubuntu22.04

WORKDIR /app

# 安裝系統依賴
RUN apt-get update && apt-get install -y \
    python3.9 \
    python3-pip \
    build-essential \
    python3-dev \
    ninja-build \
    && rm -rf /var/lib/apt/lists/*

# 建立必要的目錄，但不包含 resume_store (會由 volume mount)
RUN mkdir -p /app/models /app/resumes

# 複製依賴文件並安裝
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# 複製應用代碼
COPY ./app /app/app
COPY ./resumes /app/resumes

# 設定環境變量
ENV PYTHONPATH=/app
ENV MODEL_PATH=/app/models/Llama3-ChatQA-1.5-8B.gguf
ENV RESUME_PATH=/app/resumes/EN_CV2.txt

# 運行服務
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
