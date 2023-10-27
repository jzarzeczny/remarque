FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]