import { CreateUserService } from '@/api/services/users-service/create-user-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, avatar } = req.body;

      const userService = container.resolve(CreateUserService);
      const user = await userService.execute({
        name,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}
