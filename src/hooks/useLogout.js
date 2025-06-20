import { useState } from "react";
import httpServices from "../service/httpServices";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useLogout = () => {
  const [loading, setLoading] = useState();
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      httpServices.post("/auth/logout");
      localStorage.removeItem("key");
      localStorage.removeItem("expense");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};
export default useLogout;
