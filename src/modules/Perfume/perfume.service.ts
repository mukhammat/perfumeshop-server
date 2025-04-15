import { PrismaClient, Prisma, Perfume } from "@prisma/client";
import { SearchSchemaType } from ".";

type PerfumeWithoutCurrentPrice =  Omit<Perfume, "custom_price_per_ml">;

export interface IPerfumeService {
    create(data: Prisma.PerfumeCreateManyInput):Promise<unknown>;
    getOne(id: number): Promise<PerfumeWithoutCurrentPrice | null>;
    getAll(where?: Prisma.PerfumeWhereInput): Promise<PerfumeWithoutCurrentPrice[]>;
    search(params: SearchSchemaType): Promise<PerfumeWithoutCurrentPrice[]>;
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

    async search(params: SearchSchemaType) {
        const { q, priceFrom, priceTo, sort, analog } = params;
        const orderBy = this.getSortOption(sort);

        return await this.prisma.perfume.findMany({
            where: {
                OR: [
                    { name: { contains: q, mode: "insensitive" } },
                    { description: { contains: q, mode: "insensitive" } },
                    { analog: { contains: q, mode: "insensitive" } },
                ],
                AND: [
                    priceFrom ? { price_50ml: { gte: Number(priceFrom) } } : {},
                    priceTo ? { price_50ml: { lte: Number(priceTo) } } : {},
                    analog ? { analog: { contains: analog, mode: "insensitive" } } : {}
                ],
            },
            orderBy,
            select: selectPerfumesData
        });
    }

    private getSortOption(sort?: string): Prisma.PerfumeOrderByWithRelationInput {
        if (!sort) return {};
        
        const [field, direction] = sort.split('_');
        if (!field || !direction) return {};

        return {
            [field]: direction.toLowerCase() as 'asc' | 'desc'
        };
    }
}