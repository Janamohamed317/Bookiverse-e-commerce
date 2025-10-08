export interface PromoCode {
    startDate: Date,
    endDate: Date,
    amount: number,
    code?: string
}

export interface CheckedPromoCode {
    message: string,
    amount: number
}