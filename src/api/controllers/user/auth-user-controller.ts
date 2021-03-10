import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthenticateUserService } from '@/api/services/users-service/authenticate-user-service';

export class AuthUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userService = container.resolve(AuthenticateUserService);
    const auth = await userService.execute({ email, password });

    return res.status(200).json(auth);
  }
}
