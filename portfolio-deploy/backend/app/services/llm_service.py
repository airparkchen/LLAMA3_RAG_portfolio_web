# backend/app/services/llm_service.py
from llama_cpp import Llama
from pathlib import Path
import os
import logging
from .rag_service import RAGService
from ..core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ResumeAssistant:
    _instance = None
    
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls(
                model_path=os.getenv("MODEL_PATH", "models/Llama3-ChatQA-1.5-8B.gguf"),
                resume_path=os.getenv("RESUME_PATH", "resumes/EN_CV2.txt")
            )
        return cls._instance
    
    def __init__(self, model_path, resume_path):
        try:
            logger.info(f"Initializing LLM with model: {model_path}")
            self.llm = Llama(
                model_path=model_path,
                n_ctx=4096,        # 增加上下文窗口
                n_batch=32,
                n_threads=4
            )
            self.rag_service = RAGService()
            self.resume_path = resume_path
            self._initialize_rag()
            
        except Exception as e:
            logger.error(f"Error initializing LLM: {str(e)}", exc_info=True)
            raise

    def _initialize_rag(self):
        try:
            logger.info("Initializing RAG system...")
            with open(self.resume_path, 'r', encoding='utf-8') as file:
                resume_content = file.read().strip()
            self.rag_service.initialize_with_text(resume_content)
            logger.info("RAG system initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing RAG: {str(e)}")
            raise

    def _detect_language(self, text: str) -> str:
        """檢測輸入文本的語言，僅用於標點符號處理"""
        if any('\u4e00' <= char <= '\u9fff' for char in text):
            return "zh"
        return "en"

    def ask(self, question: str) -> str:
        try:
            logger.info(f"Processing question: {question}")
            relevant_context = self.rag_service.get_relevant_context(question)
            
            prompt = f"""<|begin_of_text|><|start_header_id|>system<|end_header_id|>
You are a professional resume analyzer. Please follow these rules:
1. Respond in the same language as the question (Chinese or English)
2. If the question is in Chinese, only use Traditional Chinese characters
3. Base your answer only on the provided context
4. Be specific and cite information from the context
5. If certain information cannot be found in the context, clearly state so
6. This resume is belongs to "Chung Yu Chen"(English name) and "陳重瑜"(Chinese name)

Context:
{relevant_context}

<|eot_id|><|start_header_id|>user<|end_header_id|>
{question}

<|eot_id|><|start_header_id|>assistant<|end_header_id|>"""

            response = self.llm(
                prompt,
                max_tokens=512,
                temperature=0.3,
                top_p=0.1,
                stop=["<|eot_id|>"],
                echo=False
            )
            
            result = response['choices'][0]['text'].strip()
            logger.info(f"Generated response: {result}")
            
            # 只為了標點符號處理檢測語言
            lang = self._detect_language(question)
            result = self._post_process_response(result, lang)
            
            return result
            
        except Exception as e:
            logger.error(f"Error in ask: {str(e)}")
            raise
            
    def _post_process_response(self, response: str, lang: str) -> str:
        """後處理響應內容，主要處理中文標點符號"""
        # 移除可能的系統提示詞殘留
        response = response.replace("<|eot_id|>", "").strip()
        
        # 僅在中文回答時轉換標點符號
        if lang == "zh":
            punctuation_map = {
                ',': '，',
                ':': '：',
                '!': '！',
                '?': '？',
                ';': '；'
            }
            for en_punct, zh_punct in punctuation_map.items():
                response = response.replace(en_punct, zh_punct)
            
        return response