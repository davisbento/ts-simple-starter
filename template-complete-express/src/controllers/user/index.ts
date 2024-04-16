import { authMiddleware } from '@/middlewares/auth-middleware';
import { Request, Response, Router } from 'express';
import { buildLoginController } from './login-controller';
import { buildUserProfileController } from './profile-controller';
import { buildRegisterController } from './register-controller';
import { roleMiddleware } from '@/middlewares/role-middleware';
import { UserRoleEnum } from '@/entities/user-entity';

const buildUserHome = (req: Request, res: Response) => {
  res.send('Hello World from user!');
};

const buildAdminRoute = (req: Request, res: Response) => {
  res.send('Hello World from admin, youre authenticated as admin!');
};

export const buildUserController = (router: Router) => {
  router.get('/', buildUserHome);
  router.post('/login', buildLoginController);
  router.post('/register', buildRegisterController);
  router.get(
    '/admin',
    authMiddleware,
    roleMiddleware(UserRoleEnum.ADMIN),
    buildAdminRoute
  );

  router.get('/profile', authMiddleware, buildUserProfileController);

  return router;
};
