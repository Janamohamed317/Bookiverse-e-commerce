export interface MonthlyProfit {
    year: number,
    month: string,
    totalProfit: number
}


export interface MonthlyOrdersCount {
    year: number,
    month: string,
    totalOrders: number
}

export interface TopSales {
    soldCount: number,
    title: string
}