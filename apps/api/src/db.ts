import { PrismaClient } from '@prisma/client';

// Singleton pattern + connection pool limit to prevent P2037 (too many connections)
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

// Graceful shutdown: release all connections before process exits
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
