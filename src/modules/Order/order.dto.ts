import { $Enums, Prisma } from "@prisma/client";

export type OrderDTO = {
    address: string
    country?: string | null
    city?: string | null
    phone: string
    delivery_price: number
    order_price: number
    tracking_number?: string | null
    delivery_method?: string | null
    expected_delivery?: Date | string | null
    notes?: string | null
    status?: $Enums.OrderStatus
    user_id: number
}