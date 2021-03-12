import { SendForgotPasswordEmailService } from './../../services/users-service/send-forgot-password-email-service';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );
    await sendForgotPasswordEmail.execute(email);

    return response.status(204).json();
  }
}
