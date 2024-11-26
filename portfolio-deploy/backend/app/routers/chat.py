# 檔案位置: backend/app/routers/chat.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.llm_service import ResumeAssistant
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class QuestionRequest(BaseModel):
    question: str

class AnswerResponse(BaseModel):
    answer: str

# 
# resume_assistant = ResumeAssistant(
#     model_path="models/llama3-8B-Chinese-Chat.gguf",
#     resume_path="resumes/EN_CV2.txt"
# )

# 改用單例模式
resume_assistant = ResumeAssistant.get_instance()

@router.post("/ask", response_model=AnswerResponse)
async def ask_question(request: QuestionRequest):
    try:
        logger.info(f"Received question: {request.question}")
        answer = resume_assistant.ask(request.question)
        logger.info(f"Generated answer: {answer}")
        return AnswerResponse(answer=answer)
    except Exception as e:
        logger.error(f"Error in ask_question: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))