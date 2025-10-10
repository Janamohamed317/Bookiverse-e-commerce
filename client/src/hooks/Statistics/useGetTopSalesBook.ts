import { useQuery } from "@tanstack/react-query"
import { getTopSalesBook } from "../../services/StatisticsServices"
import type { TopSales } from "../../types/Statistics"

const useGetTopSalesBook = () => {
  return useQuery<TopSales[]>({
    queryKey: ["topSales"],
    queryFn: getTopSalesBook
  })
}

export default useGetTopSalesBook