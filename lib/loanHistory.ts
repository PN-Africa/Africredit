export type LoanRecord = {
  id: string;
  amount: number;
  purpose: string;
  durationMonths: number;
  interestRate: string;
  disbursedDate: string;
  disbursedTo: string;
  totalRepayment: number;
  status: "active" | "completed" | "terminated";
  closedDate?: string;
  repaymentHistory: { date: string; amount: number }[];
};

// Static past-loan history for demo purposes. The "active" entry is
// intentionally excluded here — the Loans screen merges in the live
// active loan from LoanContext so it always reflects real balance data.
export const PAST_LOANS: LoanRecord[] = [
  {
    id: "loan-2",
    amount: 300000,
    purpose: "Working capital",
    durationMonths: 1,
    interestRate: "3.5% / month",
    disbursedDate: "15 Jul 2026",
    disbursedTo: "GTBank *****1234",
    totalRepayment: 310500,
    status: "completed",
    closedDate: "15 Jul 2026",
    repaymentHistory: [
      { date: "27 Aug 2026, 10:15 AM", amount: 310500 },
    ],
  },
  {
    id: "loan-3",
    amount: 300000,
    purpose: "Working capital",
    durationMonths: 1,
    interestRate: "3.5% / month",
    disbursedDate: "15 Jul 2026",
    disbursedTo: "GTBank *****1234",
    totalRepayment: 310500,
    status: "terminated",
    closedDate: "15 Jul 2026",
    repaymentHistory: [],
  },
  {
    id: "loan-4",
    amount: 300000,
    purpose: "Working capital",
    durationMonths: 1,
    interestRate: "3.5% / month",
    disbursedDate: "15 Jul 2026",
    disbursedTo: "GTBank *****1234",
    totalRepayment: 310500,
    status: "completed",
    closedDate: "15 Jul 2026",
    repaymentHistory: [
      { date: "27 Aug 2026, 10:15 AM", amount: 310500 },
    ],
  },
];

export function getYear(dateStr: string) {
  // dateStr format: "15 Jul 2026" -> just grab the year token
  const parts = dateStr.split(" ");
  return parts[parts.length - 1];
}