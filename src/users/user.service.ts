import { UsersRepository } from "./user.repository";
import { AuthService } from "@/auth/auth.service";
import { AuthenticationError, BadRequestError, NotFoundError } from "@/errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly authService: AuthService
  ) {}

  async register(userDto: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ accessToken: string } | any> {
    try {
      const user = await this.repository.register({
        email: userDto.email,
        password: userDto.password,
        username: userDto.name,
      });
      if (user) {
        const token = await this.authService.generateToken({
          id: user.id,
          email: user.email,
        });
        return {
          accessToken: token,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError("Email is already taken");
      }
      throw error;
    }
  }

  async login(loginDto: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string } | any> {
    try {
      const user = await this.repository.login({
        email: loginDto.email,
      });
      const isMatch = await Bun.password.verify(
        loginDto.password,
        user.password
      );
      if (!isMatch) throw new AuthenticationError("Password is incorrect");
      const token = await this.authService.generateToken({
        id: user.id,
        email: user.email,
      });
      return {
        accessToken: token,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("User not found");
        throw new AuthenticationError("Email or password not valid");
      }
      throw error;
    }
  }

  async validate(id: string) {
    return this.repository.validate(id);
  }
}
