import { useState } from "react";
import { useEffect } from "react";
import GetLocalISOString from "../services/getLocalISOString";
import { useAuthContext } from "../context/authContext";
import useLogout from "../hooks/useLogout";
import useCreateExpense from "../hooks/useCreateExpense";
import toast from "react-hot-toast";
import useGetExpense from "../hooks/useGetExpense";
import useDelete from "../hooks/useDelete";
import { Link } from "react-router-dom";

export default function Home() {
  const [expense, setExpense] = useState({
    _id: "",
    date: "",
    expenseTitle: "",
    cost: "",
  });

  const [dailyExpense, setDailyExpense] = useState([]);
  const [date, setDate] = useState("");
  const localISOString = GetLocalISOString();
  const currentDate = localISOString.split("T")[0];

  const { authUser } = useAuthContext();
  const { logout } = useLogout();
  const { createExpense } = useCreateExpense();
  const { getExpense } = useGetExpense();
  const { deleteExpense } = useDelete();

  useEffect(() => {
    setDate(currentDate);
  }, []);

  useEffect(() => {
    try {
      async function setExpense() {
        const data = await getExpense();
        // const getstoredItems = localStorage.getItem("expense");
        // const storedItems = JSON.parse(getstoredItems);

        if (data) {
          setDailyExpense(data);
        }
      }

      setExpense();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(expense.cost)) {
      try {
        const data = await createExpense(expense);
        console.log(data);
        const storeExpense = JSON.stringify(dailyExpense.concat(data));
        localStorage.setItem("expense", storeExpense);
        handleExpense(expense);
        setExpense({
          _id: "",
          date: "",
          expenseTitle: "",
          cost: "",
        });
      } catch (error) {
        toast.error(error.response.data.error);
      }
    } else {
      toast.error("Cost Must be a Number");
    }
  };

  function handleExpense(expense) {
    setDailyExpense((totalDailyExpense) => [...totalDailyExpense, expense]);
  }

  const handleLogout = async () => {
    await logout();
  };

  const handleTotal = () => {
    const filter = dailyExpense.filter((e) => e.date === date);
    const total = filter.reduce((acc, item) => acc + Number(item.cost), 0);
    return total;
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    const data = await getExpense();
    if (data) {
      setDailyExpense(data);
    }
  };

  return (
    <div>
      <div>
        Welcome {authUser.name}
        <button onClick={handleLogout} className="cursor-pointer">
          Logout
        </button>
      </div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Link to={"/summery"}>View summery</Link>
      {dailyExpense.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Expence Title</th>
              <th>Cost</th>
            </tr>
          </thead>

          {dailyExpense.map(
            (e, i) =>
              e.date === date && (
                <tbody key={i}>
                  <tr>
                    <td>{e.expenseTitle}</td>
                    <td>{e.cost}</td>
                    <td
                      className="cursor-pointer"
                      onClick={() => handleDelete(e._id)}
                    >
                      ⛔
                    </td>
                  </tr>
                </tbody>
              )
          )}

          <tfoot>
            <tr>
              <td>Total Expenses:</td>
              <td>{handleTotal()}</td>
            </tr>
          </tfoot>
        </table>
      )}

      <form onSubmit={handleSubmit}>
        <select
          className="select"
          value={expense.expenseTitle}
          onChange={(e) =>
            setExpense({ ...expense, expenseTitle: e.target.value })
          }
        >
          <option hidden>Expense Title</option>
          <option value="Rickshaw Fare">Rickshaw Fare</option>
          <option value="Bus Fare">Bus Fare</option>
          <option value="Food">Food</option>
          <option value="Hotel">Hotel</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="text"
          placeholder="Cost"
          className="rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#46a440] sm:text-sm/6"
          value={expense.cost}
          onChange={(e) =>
            setExpense({ ...expense, cost: e.target.value, date: date })
          }
          required={true}
          autoFocus
        />

        <button
          title={`${
            !expense.expenseTitle || !expense.cost
              ? "Please select title cost and date"
              : ""
          }`}
          className={`${
            !expense.expenseTitle || !expense.cost || !date
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={!expense.expenseTitle || !expense.cost || !date}
        >
          ➕
        </button>
      </form>
    </div>
  );
}
