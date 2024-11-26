# 文件位置: scripts/run_frontend.sh
#!/bin/bash

# 設置環境變量
export REACT_APP_API_URL=http://localhost:8000

# 啟動前端服務
cd frontend
npm start