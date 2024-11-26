# LLAMA3_RAG_portfolio_web
 My portfolio_web (using local LLM + RAG &LLM API)

# 本次的建構概念
這次是針對先前的 本地llama3+claude api應用之個人作品集網站的改進版本
這是一個整合 LLM 的個人作品集網站
技術架構：
    前端：使用 React.js + Tailwind CSS 建立單頁應用
    後端：使用 FastAPI (Python) 建立 RESTful API

AI 整合：
    本地部署 Llama3-ChatQA-1.5-8B 用於履歷問答
    Claude 3.5 Sonnet API 用於圖片分析和熱量估算

特色技術：
RAG (Retrieval-Augmented Generation) 系統實作：
    文本處理：使用 LangChain 的 RecursiveCharacterTextSplitter 進行分塊
    向量化：使用 sentence-transformers/all-MiniLM-L6-v2 模型
    向量資料庫：使用 FAISS (Facebook AI Similarity Search)

部署方式：
    Docker 容器化部署
    支援本地環境部署

系統功能：
    履歷展示與智能問答
    論文研究成果展示
    食物圖片熱量估算

專案特點：
    整合本地 LLM 與雲端 API
    實作完整的 RAG 系統
    支援中英雙語對話
    多模態 AI 應用（文本 + 圖像）
    彈性的部署方式

# RAG細節
## 資料準備(分塊策略)
### 使用 LangChain 的 RecursiveCharacterTextSplitter
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=200,          # 每塊約200字符
    chunk_overlap=20,        # 20字符重疊確保上下文連貫
    separators=[             # 分隔符優先順序
        "\n\n",             # 首選段落分隔
        "\n",               # 其次行分隔
        "。", ".", "!", "?", # 句子分隔符
        "；", ";",          # 次要分隔符
        " ",               # 空格分隔
        ""                 # 最後字符分隔
    ]
)
## 向量化模型
#使用 Sentence Transformers
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
## 向量資料庫
#使用 FAISS 作為向量儲存 (輕量化)
import faiss



# RAG的優缺點
與先前單純只使llama + prompt 輸入文件 
RAG的
優勢在於:
    因為embeding&分區的關係，在有限硬體資源下能讀取的文件容量變大 (TOKEN)(只截取有用的chunk)
    能透過自行規劃分區關鍵符號/關鍵字，讓回答更加準確
劣勢在於:
    除了原本的llama模型以外，還需要導入向量化的模型 -->需求資源大幅上升(RAM)
    也因為需要查詢相關的chunk，而導致回覆速度變慢
    導入langchain/transformer/torch 導致使用docker部屬時間大幅上升
    embeding model的準確度大幅影響使用體驗(檢測相關性)


# Portfolio Project

## 部署方式

### 方式 : Docker 部署

# Portfolio Project

## 部署方式

### 方式 1: Docker 部署
    ```bash
    # 使用 Docker 啟動所有服務
    docker-compose up --build
    ```
### 方式 2: local 本地部署
    ```bash
    # 初次設置
    # chmod +x scripts/*.sh  # 給予腳本執行權限
    ./scripts/setup_local.sh

    # 啟動後端
    ./scripts/run_backend.sh

    # 啟動前端 (新終端)
    ./scripts/run_frontend.sh
    ```

# 系統要求

Python 3.9+
Node.js 16+
16GB+ RAM
模型文件: Llama3-ChatQA-1.5-8B.gguf 

