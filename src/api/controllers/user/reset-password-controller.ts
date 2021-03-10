import { ResetPasswordService } from './../../services/users-service/reset-password-service';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { token, password } = req.body;

      const userService = container.resolve(ResetPasswordService);
      const user = await userService.execute({
        token,
        password,
      });

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}
