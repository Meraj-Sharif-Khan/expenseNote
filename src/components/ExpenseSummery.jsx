import { useEffect, useState } from "react";
import getExpenseSummary from "../hooks/getExpenseSummary";
import useGetExpense from "../hooks/useGetExpense";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ExpenseSummery() {
  const [allExpense, setAllExpense] = useState([]);
  const { getExpense } = useGetExpense();
  const { dailySummaries, grandTotal } = getExpenseSummary(allExpense);

  useEffect(() => {
    try {
      async function setExpense() {
        const data = await getExpense();

        if (data) {
          setAllExpense(data);
        }
      }

      setExpense();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, []);

  return (
    <div>
      <Link to={"/"}>⬅Home</Link>
      <h2>Expense Summary</h2>

      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          {dailySummaries.map((day, i) => (
            <tbody key={i}>
              <tr>
                <td>{new Date(day.date).toLocaleDateString()}</td>
                <td>-TK {day.total}</td>
              </tr>

              {/* <ul>
              {day.items.map((item, i) => (
                <li key={i}>
                {item.expenseTitle}: ${item.cost}
                </li>
                ))}
                </ul> */}
            </tbody>
          ))}
        </table>
      </div>

      <div>
        <table>
          <tbody>
            <tr>
              <td>Grand Total</td>
              <td>-TK{grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseSummery;
