import { Injectable } from '@nestjs/common';
import PrismaService from 'providers/prisma/prisma.service';
import { Short, Prisma } from '@prisma/client';

@Injectable()
export default class ShortService {
    constructor(private prisma: PrismaService) { }

    async findOne(
        ShortWhereUniqueInput: Prisma.ShortWhereUniqueInput,
    ): Promise<Short | null> {
        return this.prisma.short.findUnique({
            where: ShortWhereUniqueInput,
        });
    }

    async findMany(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ShortWhereUniqueInput;
        where?: Prisma.ShortWhereInput;
        orderBy?: Prisma.ShortOrderByWithRelationInput;
    }): Promise<Short[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.short.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async create(data: {
        userId: string,
        url: string,
        redirectTo: string,
        createdAt: Date,
        expiresIn: number
    }): Promise<Short> {
        return this.prisma.short.create({
            data,
        });
    }

    async update(params: {
        where: Prisma.ShortWhereUniqueInput;
        data: Prisma.ShortUpdateInput;
    }): Promise<Short> {
        const { where, data } = params;
        return this.prisma.short.update({
            data,
            where,
        });
    }

    async delete(where: Prisma.ShortWhereUniqueInput): Promise<Short> {
        return this.prisma.short.delete({
            where,
        });
    }
}
