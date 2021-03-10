import { FindUsersService } from './../../services/users-service/find-users-service';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export class FindUsersController {
  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const userService = container.resolve(FindUsersService);
      const users = await userService.execute();

      return res.status(201).json(users);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}
