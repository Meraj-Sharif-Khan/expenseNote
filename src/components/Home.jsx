import { useState } from "react";
import { useEffect } from "react";
import GetLocalISOString from "../services/getLocalISOString";

export default function Home() {
  const [expense, setExpense] = useState({
    _id: "",
    date: "",
    expenseTitle: "",
    cost: "",
  });

  const [totalDailyExpense, setTotalDailyExpense] = useState([]);
  const [date, setDate] = useState("");
  const localISOString = GetLocalISOString();
  const currentDate = localISOString.split("T")[0];

  useEffect(() => {
    setDate(currentDate);
    const getstoredItems = localStorage.getItem("expense");
    const storedItems = JSON.parse(getstoredItems);

    if (storedItems) {
      setTotalDailyExpense(storedItems);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const storeExpense = JSON.stringify(totalDailyExpense.concat(expense));
    localStorage.setItem("expense", storeExpense);
    handleExpense(expense);
    setExpense({
      _id: "",
      date: "",
      expenseTitle: "",
      cost: "",
    });
  }

  console.log(expense.expenseTitle);
  function handleExpense(expense) {
    setTotalDailyExpense((totalDailyExpense) => [
      ...totalDailyExpense,
      expense,
    ]);
  }

  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {totalDailyExpense.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Expence Title</th>
              <th>Cost</th>
            </tr>
          </thead>

          {totalDailyExpense.map(
            (e, i) =>
              e.date === date && (
                <tbody key={i}>
                  <tr>
                    <td>{e.expenseTitle}</td>
                    <td>{e.cost}</td>
                  </tr>
                </tbody>
              )
          )}

          <tfoot>
            <tr>
              <td>Total Expenses:</td>
              <td>
                {totalDailyExpense.reduce(
                  (acc, item) => item.date === date && acc + Number(item.cost),
                  0
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      )}

      <form onSubmit={handleSubmit}>
        <select
          className="select"
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
          value={expense.cost}
          onChange={(e) =>
            setExpense({ ...expense, cost: e.target.value, date: currentDate })
          }
          required={true}
          autoFocus
        />

        <button
          title={`${
            !expense.expenseTitle || !expense.cost
              ? "Please select Expense title and cost"
              : ""
          }`}
          className={`${
            !expense.expenseTitle || !expense.cost ? "cursor-not-allowed" : ""
          }`}
          disabled={!expense.expenseTitle || !expense.cost}
        >
          Add
        </button>
      </form>
    </div>
  );
}
