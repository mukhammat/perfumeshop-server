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

# Собираем проект (если TypeScript)
RUN npx prisma generate
RUN npm run build

# Открываем порт
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]