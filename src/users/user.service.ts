// users.service.ts
// in charge of business logic - generate slug, fetch data from other services, cache something, etcimport { NotFoundError } from 'elysia';

import { NotFoundError } from "elysia";
import { UsersRepository } from "./user.repository";
import { AuthService } from "@/auth/auth.service";
import { PrismaClient } from "@prisma/client";

enum UserType {
  ADMIN = "ADMIN",
  ENDUSER = "ENDUSER",
  EMPLOYEE = "EMPLOYEE",
}
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly authService: AuthService,
    private readonly prismaService: PrismaClient
  ) {}

  async findAll() {
    // return this.repository.findAll();
  }

  async createEndUser() {
    return this.authService.generateToken({
      id: "123",
      email: "nlp@gmail.com",
    });
  }
}
