import { useState } from "react";
import Swal from "sweetalert2";
import useForgotPassword from "../../hooks/Auth/useForgotPassword";
import Spinner from "../../components/Spinner/Spinner";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");

  const forgetPassword = useForgotPassword();

  if (forgetPassword.isPending) {
    return <Spinner size={50} color="#a47148" />;
  }

  const handleEmailSubmission = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonText: "OK",
      });
      return;
    }
    forgetPassword.mutate(email);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-5 w-96 bg-[#2B2118]/90 backdrop-blur-md border border-[#6C584C]/30 p-6 rounded-2xl shadow-lg">
        <p className="font-bold text-center text-[#f5f5dc] text-lg">
          Reset Password
        </p>

        <label htmlFor="email" className="text-[#f5f5dc] font-medium">
          Enter Your Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded focus:ring-2 focus:ring-[#a47148] outline-none"
        />

        <button
          onClick={handleEmailSubmission}
          disabled={forgetPassword.isPending}
          className="bg-[#a47148] hover:bg-[#8b5e3c] text-[#f5f5dc] p-2 rounded-lg font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {forgetPassword.isPending ? "Sending..." : "Send Email"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
