# Hono API for Warehouse app

This folder serves as the scaffold of the application that is a part of the interview process for candidates attending on the position in CloudTalk.

## Tech stack
- [Hono](https://hono.dev/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

## **How to run project**

### `Requirements` 
- [Bun.js](https://bun.sh/docs/installation)
- [Docker / Docker Desktop](https://www.docker.com/products/docker-desktop/)


First install node modules

```bash
bun install
```

Create empty `.env.development` and copy there contents of `.env.example` 

Create docker database:
```bash
docker compose up -d warehouse-postgres
```

After docker container is up run prisma migration:

```bash
bun prisma:dev:migrate
```
Run the project

```bash
bun dev
```
## How to run tests

To run tests:
```bash
bun run test
```

If prisma cannot connect to database, it's because we need to wait for docker container to start, that's why there is a sleep in `pretest` script
