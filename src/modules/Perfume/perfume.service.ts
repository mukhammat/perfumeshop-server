import { PrismaClient, Prisma, Perfume } from "@prisma/client";

type PerfumeWithoutCurrentPrice =  Omit<Perfume, "custom_price_per_ml">;

export interface IPerfumeService {
    create(data: Prisma.PerfumeCreateManyInput):Promise<unknown>;
    getOne(id: number): Promise<PerfumeWithoutCurrentPrice | null>;
    getAll(where?: Prisma.PerfumeWhereInput): Promise<PerfumeWithoutCurrentPrice[]>;
    search(query: string): Promise<PerfumeWithoutCurrentPrice[]>;
}

const selectPerfumesData = {
    id: true,
    name: true,
    perfume_code: true,
    description: true,
    analog: true,
    top_note: true,
    middle_note: true,
    base_note: true,
    price_50ml: true,
    price_30ml: true,
    images: true,
    CategoryPerfume: true
};

export class PerfumeService {
    constructor(private prisma: PrismaClient) {}

    async create(data: Prisma.PerfumeCreateManyInput) {
        console.log("Create perfume service");
        if(!data.price_30ml || !data.price_50ml) {
            data.price_30ml = (data.custom_price_per_ml * 2) * 30;
            data.price_50ml = (data.custom_price_per_ml * 2) * 50;
        }
        return this.prisma.perfume.create({ data }); 
    }

    async getOne(id: number) {
        return await this.prisma.perfume.findUnique({
            where: { id },
            select: selectPerfumesData
        });
    }

    // Рассмотреть вывод не всех полей парфюма, например не выводить @custom_price_per_ml
    async getAll(where: Prisma.PerfumeWhereInput = {}) {
        return await this.prisma.perfume.findMany({
            where,
            select: selectPerfumesData
        });
    }

    async search(query: string) {
        return await this.prisma.perfume.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                    { analog: { contains: query, mode: "insensitive" } },
                ],
            },
            select: selectPerfumesData
        });
    }
}