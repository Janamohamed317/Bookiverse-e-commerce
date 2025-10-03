import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { resetPassword } from '../../services/AuthServices';

const useResetPassword = (password: string, id: string, token: string) => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: () => resetPassword(id, password, token),
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                text: "Your password has been reset successfully!",
                confirmButtonText: "OK",
            });
            navigate("/signin");
        },
        onError: (error: unknown) => {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response?.data?.message || "Reset link is invalid or expired.",
                    confirmButtonText: "OK",
                });
            }
        },
    });
}

export default useResetPassword