import httpServices from "../service/httpServices";
import toast from "react-hot-toast";

const useCreateExpense = () => {
  const createExpense = async (expense) => {
    try {
      const { data } = await httpServices.post("data", expense);
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return { createExpense };
};

export default useCreateExpense;
