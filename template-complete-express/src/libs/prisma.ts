import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient;

//check if we are running in production mode
if (process.env.NODE_ENV === 'production') {
  prismaClient = new PrismaClient();
} else {
  //check if there is already a connection to the database
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prismaClient = (global as any).prisma;
}

export { prismaClient };
