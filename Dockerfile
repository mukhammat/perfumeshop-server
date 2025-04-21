# Используем официальный Node.js образ
FROM node:lts

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Генерируем Prisma клиент
RUN npx prisma generate

# Собираем проект (если TypeScript)
RUN npm run build

# Открываем порт
EXPOSE 3000

# Команда запуска
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]