import base64
import anthropic
import os
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FoodCalorieEstimator:
    def __init__(self):
        # 使用與原始代碼相同的初始化方式
        self.client = anthropic.Anthropic(
            api_key="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"
        )
        logger.info("FoodCalorieEstimator initialized successfully")

    def encode_image_to_base64(self, image_path):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode("utf-8")

    def estimate_calories_from_image(self, image_path):
        try:
            # 將圖片轉換為base64
            image_base64 = self.encode_image_to_base64(image_path)
            
            # 設定圖片的媒體類型
            media_type = "image/png"
            
            detailed_prompt = (
                "食物熱量分析\n"
                "請作為一個食物辨識和營養分析的語言模型，根據上傳的食物圖片內容提供熱量估算。回答應該包含以下步驟：\n\n"
                "辨識食材：從圖片中辨別出主要食材，並逐一列出。\n"
                "估算份量：描述每種食材的份量（例如：牛肉有 1 份，番茄片有 2 片）。\n"
                "計算熱量：根據每種食材的份量和一般熱量數據，估算每個食材的熱量範圍，並提供總熱量的估算值。\n"
                "文字表達：使用清晰簡潔的語句呈現熱量信息，並且明確分項說明每個食材的熱量。\n"
                "注意事項：對於被遮擋的部分，根據常見食材比例和外觀進行合理推測；並根據用戶需求調整內容詳盡程度（如加上營養建議）。"
            )

            # 構建消息內容
            messages = [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": media_type,
                                "data": image_base64,
                            },
                        },
                        {
                            "type": "text",
                            "text": detailed_prompt,
                        },
                    ],
                }
            ]

            # 使用與原始代碼完全相同的 API 調用
            response = self.client.beta.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=600,
                messages=messages
            )
            
            return response.content[0].text

        except Exception as e:
            logger.error(f"Error in estimate_calories_from_image: {str(e)}")
            raise