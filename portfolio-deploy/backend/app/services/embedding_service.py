# 文件位置: backend/app/services/embedding_service.py
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
import logging
from ..core.config import settings

logger = logging.getLogger(__name__)

class EmbeddingService:
    def __init__(self):
        try:
            logger.info("Initializing Embedding Service")
            self.model = SentenceTransformer(settings.EMBEDDING_MODEL)
            self.text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=500,  # 增加chunk大小以保持更完整的上下文
                chunk_overlap=100,  # 增加重疊以維持內容連貫性
                separators=[
                    "\n# ",              # 主標題
                    "\n## ",             # 次標題
                    "\n- ",              # 列表項
                    "\n",                # 一般換行
                    "。", ". ",          # 中英句號
                    "，", ", ",          # 中英逗號
                    "；", "; ",          # 中英分號
                    "：", ": ",          # 中英冒號
                    "！", "! ",          # 中英驚嘆號
                    "？", "? ",          # 中英問號
                ]
            )
            logger.info("Embedding Service initialized")
        except Exception as e:
            logger.error(f"Error initializing Embedding Service: {str(e)}")
            raise

    def split_text(self, text: str) -> list[str]:
        """將文本分割成小塊"""
        try:
            # 預處理：確保標題和內容之間有足夠的空格
            text = text.replace("\n#", "\n\n#")
            
            chunks = self.text_splitter.split_text(text)
            
            # 後處理：清理每個chunk
            cleaned_chunks = []
            for chunk in chunks:
                # 去除多餘的空白和換行
                chunk = ' '.join(chunk.split())
                # 確保每個chunk至少包含有意義的內容
                if len(chunk) > 50:  # 可以調整這個閾值
                    cleaned_chunks.append(chunk)
            
            logger.info(f"Split text into {len(cleaned_chunks)} chunks")
            return cleaned_chunks
        except Exception as e:
            logger.error(f"Error in split_text: {str(e)}")
            raise

    def get_embeddings(self, texts: list[str]) -> list[float]:
        """獲取文本的向量表示"""
        try:
            # 批次處理以優化性能
            batch_size = 32  # 可以根據需要調整
            all_embeddings = []
            
            for i in range(0, len(texts), batch_size):
                batch = texts[i:i + batch_size]
                embeddings = self.model.encode(batch, convert_to_tensor=True)
                all_embeddings.extend(embeddings.tolist())
            
            logger.info(f"Generated embeddings for {len(texts)} texts")
            return all_embeddings
        except Exception as e:
            logger.error(f"Error in get_embeddings: {str(e)}")
            raise