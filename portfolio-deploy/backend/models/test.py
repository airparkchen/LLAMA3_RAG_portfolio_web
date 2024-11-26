# 簡單的測試腳本
from llama_cpp import Llama

def test_model(model_path):
    try:
        llm = Llama(model_path=model_path)
        response = llm("Hello, please introduce yourself.", max_tokens=50)
        print(response)
        print("模型測試成功！")
    except Exception as e:
        print(f"模型載入失敗：{e}")

# 測試
test_model("llama-2-7b-chat.gguf")