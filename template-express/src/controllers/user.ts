import { Request, Response } from 'express';

export const getUserHandler = (req: Request, res: Response) => {
  res.send('Hello World from user!');
};
