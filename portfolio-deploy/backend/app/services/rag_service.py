# 文件位置: backend/app/services/rag_service.py
import faiss
import numpy as np
import logging
from pathlib import Path
import pickle
from .embedding_service import EmbeddingService
from ..core.config import settings

logger = logging.getLogger(__name__)

class RAGService:
    def __init__(self):
        try:
            logger.info("Initializing RAG Service")
            self.embedding_service = EmbeddingService()
            self.vector_store = None
            self.chunks = None
            logger.info("RAG Service initialized")
        except Exception as e:
            logger.error(f"Error initializing RAG Service: {str(e)}")
            raise

    def initialize_with_text(self, text: str):
        """初始化向量存儲"""
        try:
            # 文本分塊
            chunks = self.embedding_service.split_text(text)
            
            # 生成嵌入
            embeddings = self.embedding_service.get_embeddings(chunks)
            
            # 創建 FAISS 索引
            dimension = len(embeddings[0])
            self.vector_store = faiss.IndexFlatL2(dimension)
            self.vector_store.add(np.array(embeddings).astype('float32'))
            
            # 保存chunks以供之後檢索
            self.chunks = chunks
            
            logger.info(f"Vector store initialized with {len(chunks)} chunks")
            
        except Exception as e:
            logger.error(f"Error in initialize_with_text: {str(e)}")
            raise

    def get_relevant_context(self, question: str, k: int = 8) -> str:
        """檢索相關上下文"""
        try:
            if not self.vector_store or not self.chunks:
                raise ValueError("Vector store not initialized")
            
            # 對問題進行向量化
            question_embedding = self.embedding_service.get_embeddings([question])[0]
            
            # 搜索最相關的片段
            D, I = self.vector_store.search(
                np.array([question_embedding]).astype('float32'), 
                k
            )
            
            # 獲取相關文本
            relevant_chunks = [self.chunks[i] for i in I[0]]
            
            # 合併上下文
            context = "\n".join(relevant_chunks)
            
            logger.info(f"Retrieved {len(relevant_chunks)} relevant chunks")
            return context
            
        except Exception as e:
            logger.error(f"Error in get_relevant_context: {str(e)}")
            raise