export function formatCurrency(amount: number) {
  return `N${Math.round(amount).toLocaleString()}`;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const MONTHLY_RATE = 0.035;

export function calcLoanTerms(amount: number, durationMonths: number) {
  const totalInterest = amount * MONTHLY_RATE * durationMonths;
  const totalRepayable = amount + totalInterest;
  const monthlyRepayment = totalRepayable / durationMonths;
  return { totalInterest, totalRepayable, monthlyRepayment };
}

export function buildRepaymentSchedule(amount: number, durationMonths: number) {
  const { monthlyRepayment } = calcLoanTerms(amount, durationMonths);
  const schedule = [];
  const now = new Date();
  for (let i = 1; i <= durationMonths; i++) {
    const due = new Date(now);
    due.setMonth(due.getMonth() + i);
    schedule.push({
      month: i,
      dueDate: formatDate(due),
      amount: monthlyRepayment,
    });
  }
  return schedule;
}