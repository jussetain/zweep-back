import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import PrismaService from 'providers/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { generateHash, compareHashes } from 'providers/utils/hash';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findOne(data: Prisma.UserWhereUniqueInput): Promise<Partial<User>> {
    const { id, username } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        id,
        username,
      }
    });

    if (!user) {
      return;
    }

    delete user.password;
    return user;
  }

  async login(data: {
    emailOrUsername: string,
    password: string
  }): Promise<Partial<User>> {
    const { emailOrUsername, password } = data;

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: emailOrUsername
            }
          },
          {
            email: {
              equals: emailOrUsername
            }
          }
        ]
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await compareHashes(password as string, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    delete user.password;
    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const { password } = data;
    const hashedPassword = await generateHash(password);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    });
    return user;
  }
}
