# 文件位置: backend/app/tests/test_rag.py
import pytest
from app.services.rag_service import RAGService
from app.services.llm_service import ResumeAssistant

@pytest.fixture
def rag_service():
    return RAGService()

@pytest.fixture
def resume_assistant():
    return ResumeAssistant.get_instance()

def test_rag_query(rag_service):
    question = "What is the candidate's education background?"
    results = rag_service.query(question)
    assert len(results) > 0
    assert isinstance(results, list)
    assert all(isinstance(chunk, str) for chunk in results)

def test_ask_question(resume_assistant):
    question = "What programming languages does the candidate know?"
    response = resume_assistant.ask(question)
    assert isinstance(response, str)
    assert len(response) > 0