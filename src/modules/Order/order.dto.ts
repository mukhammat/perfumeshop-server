import { $Enums } from "@prisma/client";

export type OrderDTO = {
    address: string
    country: string
    city: string
    phone: string
    latitude?: string      // Широта
    longitude?: string    // Долгота
    delivery_price: number
    order_price: number
    tracking_number?: string | null
    delivery_method?: string | null
    expected_delivery?: Date | string | null
    notes?: string | null
    status?: $Enums.OrderStatus
    user_id: number
}

export type UpdateOrderDTO = {
    latitude?: string      // Широта
    longitude?: string    // Долгота
    notes?: string | null
    user_id: number
    order_id: number
}