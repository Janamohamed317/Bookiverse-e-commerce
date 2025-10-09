export interface NewPromoCode {
    startDate: Date,
    endDate: Date,
    amount: number,
    code?: string
}

export interface PromoCode {
    _id: string,
    startDate: Date,
    endDate: Date,
    amount: number,
    code?: string
}

export interface CheckedPromoCode {
    message: string,
    amount: number
}