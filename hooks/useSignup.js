import { useState } from "react";
import toast from "react-hot-toast";
import httpServices from "../../service/httpServices";
import { useAuthContext } from "../context/authContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signupApi = "/auth/signup";

  const signup = async (inputs) => {
    const success = handleInputErrors(inputs);

    if (!success) return;
    setLoading(true);

    try {
      const { data } = await httpServices.post(signupApi, inputs);
      localStorage.setItem("emchat-user", JSON.stringify(data));
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

function handleInputErrors({
  name,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!name || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fil in all fields");
    return false;
  }
  if (username.length < 2 || username.length > 15) {
    toast.error("username must be between 2 to 15 characters");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
