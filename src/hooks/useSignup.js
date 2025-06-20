import { useState } from "react";
import toast from "react-hot-toast";
import httpServices from "../service/httpServices";
import { useAuthContext } from "../context/authContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signupApi = "auth/register";

  const signup = async (inputs) => {
    const success = handleInputErrors(inputs);

    if (!success) return;
    setLoading(true);

    try {
      const { data } = await httpServices.post(signupApi, inputs);
      localStorage.setItem("key", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ name, email, password }) {
  if (!name || !email || !password) {
    toast.error("Please fil in all fields");
    return false;
  }
  if (email.length < 2 || email.length > 50) {
    toast.error("username must be between 2 to 50 characters");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
