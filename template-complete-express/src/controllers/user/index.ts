import { createAuthenticatedInterface } from '@/libs/express-request';
import { authMiddleware } from '@/middlewares/auth-middleware';
import { Request, Response, Router } from 'express';
import { buildLoginController } from './login-controller';
import { buildRegisterController } from './register-controller';

const buildUserHome = (req: Request, res: Response) => {
  res.send('Hello World from user!');
};

// just a simple route to show that the user is authenticated
const buildAuthenticatedRoute = (req: Request, res: Response) => {
  const reqAuth = createAuthenticatedInterface(req);
  const { user } = reqAuth;

  res.json({
    message: 'Authenticated',
    user,
  });
};

export const buildUserController = (router: Router) => {
  router.get('/', buildUserHome);
  router.get('/authenticated', authMiddleware, buildAuthenticatedRoute);
  router.post('/login', buildLoginController);
  router.post('/register', buildRegisterController);

  return router;
};
