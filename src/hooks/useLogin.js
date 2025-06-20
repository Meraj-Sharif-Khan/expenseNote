import React, { useState } from "react";
import toast from "react-hot-toast";
import httpServices from "../service/httpServices";
import { useAuthContext } from "../context/authContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (inputs) => {
    const success = handleInputErrors(inputs);
    if (!success) return;
    setLoading(true);
    try {
      const { data } = await httpServices.post("auth/login", inputs);
      localStorage.setItem("key", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors({ email, password }) {
  if (!email || !password) {
    toast.error("Please fil in all fields");
    return false;
  }
  if (password < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
