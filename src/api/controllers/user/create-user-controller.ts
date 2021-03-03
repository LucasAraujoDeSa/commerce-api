import { Request, Response } from 'express';
import { createUserContainer } from '@/factories/index';

export class CreateUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, avatar } = req.body;

      const userService = createUserContainer();
      const user = await userService.execute({
        name,
        email,
        password,
        avatar,
      });

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}
