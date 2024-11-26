# frontend/Dockerfile
FROM node:16-slim

WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製源代碼
COPY . .

# 運行服務
CMD ["npm", "start"]