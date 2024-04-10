import { createAuthenticatedInterface } from '@/libs/express-request';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { loginUserService, registerUserService } from '@/services/user';
import { NextFunction, Request, Response, Router } from 'express';

const getUserController = (req: Request, res: Response) => {
  res.send('Hello World from user!');
};

const getAuthenticatedRoute = (req: Request, res: Response) => {
  const reqAuth = createAuthenticatedInterface(req);
  const { user } = reqAuth;

  res.json({
    message: 'Authenticated',
    user,
  });
};

const getLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = await loginUserService(req.body);

    res.json({
      token,
    });
  } catch (err) {
    next(err);
  }
};

const getRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerUserService(req.body);

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const buildUserController = (router: Router) => {
  router.get('/', getUserController);
  router.get('/authenticated', authMiddleware, getAuthenticatedRoute);
  router.post('/login', getLoginController);
  router.post('/register', getRegisterController);

  return router;
};
