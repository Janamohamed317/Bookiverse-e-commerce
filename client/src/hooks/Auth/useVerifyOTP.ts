import { useMutation } from '@tanstack/react-query'
import { verifyOTP } from '../../services/AuthServices'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Swal from 'sweetalert2'

const useVerifyOTP = (otp: string, email: string) => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: () => verifyOTP(otp, email),
        onSuccess: () => {
            navigate('/')
        },
        onError: (error: unknown) => {
            if (axios.isAxiosError<Error>(error)) {
                Swal.fire({
                    icon: "warning",
                    title: "Signup Failed",
                    text: error.response?.data.message || "Something went wrong",
                    confirmButtonText: "OK",
                });
            }
        },
    })
}

export default useVerifyOTP