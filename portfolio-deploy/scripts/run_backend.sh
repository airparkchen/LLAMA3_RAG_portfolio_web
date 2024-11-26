# 文件位置: scripts/run_backend.sh
#!/bin/bash

# 啟動虛擬環境
source venv/bin/activate

# 設置環境變量
export PYTHONPATH=$PYTHONPATH:${PWD}/backend
export MODEL_PATH=models/Llama3-ChatQA-1.5-8B.gguf
export RESUME_PATH=resumes/EN_CV2.txt

# 啟動後端服務
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload