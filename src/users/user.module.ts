import { Elysia } from "elysia";
import { UsersService } from "./user.service";
import { UsersRepository } from "./user.repository";
import { AuthService } from "@/auth/auth.service";
import { PrismaService } from "@/prisma.service";

export const setupUsers = () => {
  const usersRepository = new UsersRepository();
  const authService = new AuthService();
  const usersService = new UsersService(usersRepository, authService, PrismaService);
  return new Elysia().state(() => ({ usersService }));
};