# 文件位置: scripts/setup_local.sh
#!/bin/bash

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "開始設置本地環境..."

# 檢查 Python 版本
python --version
if [ $? -ne 0 ]; then
    echo "${RED}請確保已安裝 Python 3.9+${NC}"
    exit 1
fi

# 創建並啟動虛擬環境
echo "創建虛擬環境..."
python -m venv venv
source venv/bin/activate  # Windows 使用: venv\Scripts\activate

# 安裝後端依賴
echo "安裝後端依賴..."
cd backend
pip install -r requirements.txt

# 檢查模型文件
if [ ! -f "models/Llama3-ChatQA-1.5-8B.gguf" ]; then
    echo "${RED}警告: 模型文件不存在${NC}"
    echo "請確保模型文件位於 models/Llama3-ChatQA-1.5-8B.gguf"
fi

# 返回根目錄
cd ..

# 安裝前端依賴
echo "安裝前端依賴..."
cd frontend
npm install

echo "${GREEN}環境設置完成!${NC}"
echo "使用以下命令啟動服務:"
echo "後端: ./scripts/run_backend.sh"
echo "前端: ./scripts/run_frontend.sh"