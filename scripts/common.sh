pnpm dlx prisma generate --schema=../infra/prisma/schema.prisma

mongod --replSet rs0 --port 27017 --dbpath ~/mongo/rs0 --bind_ip localhost --fork --logpath ~/mongo/rs0/mongod.log

pnpm db:up

pnpm --filter api dev

pnpm --filter api exec ts-node src/seed.ts

pnpm --filter api run seed

pnpm --filter web dev

API_BASE_URL=http://localhost:3000 pnpm bdd