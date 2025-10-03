import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { forgetPassword } from '../../services/AuthServices';

const useForgotPassword = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: forgetPassword,
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                text: "Password reset link has been sent to your email.",
                confirmButtonText: "OK",
            });
            navigate('/signin')

        },
        onError: (error: unknown) => {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response?.data?.message,
                    confirmButtonText: "OK",
                });
            }
        },
    });
}

export default useForgotPassword