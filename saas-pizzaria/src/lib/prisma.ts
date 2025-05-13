import { PrismaClient } from '@/generated/prisma';

const globallForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globallForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') {
  globallForPrisma.prisma = prisma;
}