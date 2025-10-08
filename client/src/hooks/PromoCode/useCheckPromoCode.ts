import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { checkPromoCode } from '../../services/PromoCodeServices'
import type { CheckedPromoCode } from '../../types/PromoCode'
import axios from 'axios'
import type { Error } from '../../types/Error'

const useCheckPromoCode = () => {
    const [promoCodeRes, setPromoCodeRes] = useState<CheckedPromoCode>({
        amount: 0,
        message: ""
    })
    const mutation = useMutation({
        mutationFn: checkPromoCode,
        onSuccess: (res) => {
            setPromoCodeRes({
                amount: res.amount,
                message: res.message
            })
        },
        onError: (error) => {
            if (axios.isAxiosError<Error>(error)) {
                setPromoCodeRes({
                    amount: 0,
                    message: error.response?.data?.message ?? "Failed to apply promo code"
                })
            }
        }
    })
    return { mutation, promoCodeRes }
}

export default useCheckPromoCode