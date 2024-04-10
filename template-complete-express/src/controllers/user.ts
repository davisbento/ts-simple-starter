import { loginUserService, registerUserService } from '@/services/user';
import { NextFunction, Request, Response, Router } from 'express';

const getUserController = (req: Request, res: Response) => {
  res.send('Hello World from user!');
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
  router.post('/login', getLoginController);
  router.post('/register', getRegisterController);

  return router;
};
