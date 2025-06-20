import httpServices from "../service/httpServices";
import toast from "react-hot-toast";

const useDelete = () => {
  const deleteExpense = async (id) => {
    try {
      const { data } = await httpServices.delete("data/" + id);
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return { deleteExpense };
};

export default useDelete;
