import { User, UserRole } from '@prisma/client';

// just to re-export the Prisma entity
// so we can change the implementation later if we change the ORM

export interface UserEntity extends User {}

export { UserRole as UserRoleEnum };
