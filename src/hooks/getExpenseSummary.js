const getExpenseSummary = (expenses) => {
  // Group expenses by date
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = {
        date,
        total: 0,
        items: [],
      };
    }
    acc[date].total += expense.cost;
    acc[date].items.push(expense);
    return acc;
  }, {});

  // Convert to array and sort by date (newest first)
  const summaryArray = Object.values(groupedExpenses).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Calculate grand total
  const grandTotal = summaryArray.reduce((total, day) => total + day.total, 0);

  return {
    dailySummaries: summaryArray,
    grandTotal,
  };
};

export default getExpenseSummary;
