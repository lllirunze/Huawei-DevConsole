# 使用 Node 24（和你本地一致）
FROM node:24-alpine

# 工作目录
WORKDIR /app

# =====================
# 1. 安装 server 依赖
# =====================
COPY server/package.json ./server/
RUN cd server && npm install

# =====================
# 2. 安装 client 依赖
# =====================
COPY client/package.json ./client/
RUN cd client && npm install

# =====================
# 3. 复制全部代码
# =====================
COPY . .

# =====================
# 4. 构建前端
# =====================
RUN cd client && npm run build

# =====================
# 5. 暴露端口
# =====================
EXPOSE 4000

# =====================
# 6. 启动服务
# =====================
CMD ["node", "server/server.js"]