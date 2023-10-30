import { PrismaClient } from "@prisma/client";

export class UsersRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  async register({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }) {
    return this.prismaService.user.create({
      data: {
        email: email,
        name: username,
        password: await Bun.password.hash(password),
      },
    });
  }

  async login({ email }: { email: string }) {
    return this.prismaService.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });
  }

  async validate(id: string) {
    return this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
  }
}
