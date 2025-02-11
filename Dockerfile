FROM node:lts AS BUILDER
WORKDIR /app
COPY . .
RUN corepack enable pnpm && pnpm install --prod
RUN pnpm run build 

FROM node:lts-slim
ENV TZ=America/Cancun
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /app
COPY --from=BUILDER /app .
USER node
EXPOSE 3000

CMD ["npx", "pnpm", "run", "server"]
