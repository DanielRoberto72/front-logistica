# BUILD STEP
FROM public.ecr.aws/docker/library/node:lts-alpine3.17 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# FINAL STEP
FROM public.ecr.aws/docker/library/node:lts-alpine3.17
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY --from=build /app/.next ./.next
EXPOSE 3001
CMD ["npm", "start"]
