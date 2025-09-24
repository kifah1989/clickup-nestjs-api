import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: {
    email: string;
    password: string;
    role?: UserRole;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
        role: data.role || UserRole.VIEWER,
      },
    });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  async logApiUsage(
    userId: number,
    endpoint: string,
    method: string,
    statusCode: number,
  ): Promise<void> {
    await this.prisma.apiLog.create({
      data: {
        userId,
        endpoint,
        method,
        statusCode,
      },
    });
  }
}
