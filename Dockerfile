FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY src ./
COPY svelte.config.js ./
COPY playwright.config.ts ./
COPY tests ./tests/
COPY .env.test .env

RUN bun install
RUN bunx playwright test