import httpServices from "../service/httpServices";
import toast from "react-hot-toast";

const useGetExpense = () => {
  const getExpense = async () => {
    try {
      const { data } = await httpServices.get("data");
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return { getExpense };
};

export default useGetExpense;
