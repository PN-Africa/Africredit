import { createContext, useContext, useState, ReactNode } from "react";
import { formatDate, formatTime, calcLoanTerms } from "../lib/loanMath";

export type LoanStatus = "eligible" | "underReview" | "activeLoan";

type BoostState = {
  bankConnected: boolean;
  bankName: string;
  billUploaded: boolean;
  billFileName: string;
};

export type Application = {
  amount: number;
  purpose: string;
  durationMonths: number;
};

export type PaymentRecord = {
  amount: number;
  method: string;
  date: string;
  reference: string;
  success: boolean;
};

export type TerminationRecord = {
  amount: number;
  purpose: string;
  date: string;
};

export type ActiveLoanDetails = {
  amount: number;
  purpose: string;
  durationMonths: number;
  interestRate: string;
  disbursedDate: string;
  disbursedTo: string;
  totalRepayment: number;
};

export type ActivityIcon =
  | "bank"
  | "bill"
  | "review"
  | "disburse"
  | "check"
  | "terminated";

export type ActivityItem = {
  id: string;
  icon: ActivityIcon;
  title: string;
  subtitle: string;
  amount?: number;
  timestamp: Date;
};

type LoanContextType = {
  status: LoanStatus;
  setStatus: (status: LoanStatus) => void;

  boost: BoostState;
  connectBank: (bankName: string) => void;
  uploadBill: (fileName: string) => void;

  loanTotal: number;
  outstandingBalance: number;
  repay: (amount: number) => void;

  activeLoanDetails: ActiveLoanDetails | null;
  activateLoan: () => void;

  reset: () => void;
  startNewLoan: () => void;

  application: Application | null;
  setApplication: (app: Application) => void;
  submitApplication: () => void;
  terminateApplication: () => void;
  lastTermination: TerminationRecord | null;
  terminatedLoans: TerminationRecord[];

  lastPayment: PaymentRecord | null;
  repaymentHistory: PaymentRecord[];
  recordPayment: (payment: PaymentRecord) => void;

  activityLog: ActivityItem[];

  pendingBank: string;
  setPendingBank: (bank: string) => void;

  pendingRepayAmount: number;
  setPendingRepayAmount: (amount: number) => void;
};

const INITIAL_BOOST: BoostState = {
  bankConnected: false,
  bankName: "",
  billUploaded: false,
  billFileName: "",
};

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export function LoanProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<LoanStatus>("eligible");
  const [boost, setBoost] = useState<BoostState>(INITIAL_BOOST);
  const [loanTotal, setLoanTotal] = useState(0);
  const [outstandingBalance, setOutstandingBalance] = useState(0);
  const [activeLoanDetails, setActiveLoanDetails] =
    useState<ActiveLoanDetails | null>(null);
  const [application, setApplicationState] = useState<Application | null>(null);
  const [lastTermination, setLastTermination] = useState<TerminationRecord | null>(null);
  const [terminatedLoans, setTerminatedLoans] = useState<TerminationRecord[]>([]);
  const [lastPayment, setLastPayment] = useState<PaymentRecord | null>(null);
  const [repaymentHistory, setRepaymentHistory] = useState<PaymentRecord[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityItem[]>([]);
  const [pendingBank, setPendingBank] = useState("");
  const [pendingRepayAmount, setPendingRepayAmount] = useState(35000);

  const logActivity = (entry: Omit<ActivityItem, "id" | "timestamp">) => {
    setActivityLog((prev) => [
      {
        ...entry,
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        timestamp: new Date(),
      },
      ...prev,
    ]);
  };

  const connectBank = (bankName: string) => {
    setBoost((b) => ({ ...b, bankConnected: true, bankName }));
    logActivity({
      icon: "bank",
      title: "Bank account connected",
      subtitle: `${bankName}*****1234`,
    });
  };

  const uploadBill = (fileName: string) => {
    setBoost((b) => ({ ...b, billUploaded: true, billFileName: fileName }));
    logActivity({
      icon: "bill",
      title: "Utility bill uploaded",
      subtitle: "Verification document",
    });
  };

  const repay = (amount: number) => {
    setOutstandingBalance((prev) => Math.max(prev - amount, 0));
  };

  const activateLoan = () => {
    if (!application) return;
    const { totalRepayable } = calcLoanTerms(
      application.amount,
      application.durationMonths
    );
    const bankLabel = boost.bankConnected ? boost.bankName : "GTBank";

    setActiveLoanDetails({
      amount: application.amount,
      purpose: application.purpose,
      durationMonths: application.durationMonths,
      interestRate: "3.5% / month",
      disbursedDate: formatDate(new Date()),
      disbursedTo: boost.bankConnected
        ? `${boost.bankName} *****1234`
        : "GTBank *****1234",
      totalRepayment: totalRepayable,
    });
    setLoanTotal(totalRepayable);
    setOutstandingBalance(totalRepayable);
    setRepaymentHistory([]);
    setStatus("activeLoan");

    logActivity({
      icon: "disburse",
      title: "Loan disbursed to BVN*****1234",
      subtitle: `To ${bankLabel}`,
      amount: application.amount,
    });
  };

  const reset = () => {
    setStatus("eligible");
    setBoost(INITIAL_BOOST);
    setLoanTotal(0);
    setOutstandingBalance(0);
    setActiveLoanDetails(null);
    setRepaymentHistory([]);
    setApplicationState(null);
  };

  const startNewLoan = () => {
    setStatus("eligible");
    setApplicationState(null);
    setActiveLoanDetails(null);
    setRepaymentHistory([]);
    setLoanTotal(0);
    setOutstandingBalance(0);
  };

  const setApplication = (app: Application) => setApplicationState(app);

  const submitApplication = () => {
    setStatus("underReview");
    if (application) {
      logActivity({
        icon: "review",
        title: "Application under review",
        subtitle: `${application.purpose} loan`,
        amount: application.amount,
      });
    }
  };

  const terminateApplication = () => {
    if (application) {
      const record: TerminationRecord = {
        amount: application.amount,
        purpose: application.purpose,
        date: formatDate(new Date()),
      };
      setLastTermination(record);
      setTerminatedLoans((prev) => [record, ...prev]);
      logActivity({
        icon: "terminated",
        title: "Application terminated",
        subtitle: application.purpose,
        amount: application.amount,
      });
    }
    setApplicationState(null);
    setStatus("eligible");
  };

  const recordPayment = (payment: PaymentRecord) => {
    setLastPayment(payment);
    if (payment.success) {
      repay(payment.amount);
      setRepaymentHistory((prev) => [payment, ...prev]);
      logActivity({
        icon: "check",
        title: "Repayment received",
        subtitle: "Working capital",
        amount: payment.amount,
      });
    }
  };

  return (
    <LoanContext.Provider
      value={{
        status,
        setStatus,
        boost,
        connectBank,
        uploadBill,
        loanTotal,
        outstandingBalance,
        repay,
        activeLoanDetails,
        activateLoan,
        reset,
        startNewLoan,
        application,
        setApplication,
        submitApplication,
        terminateApplication,
        lastTermination,
        terminatedLoans,
        lastPayment,
        repaymentHistory,
        recordPayment,
        activityLog,
        pendingBank,
        setPendingBank,
        pendingRepayAmount,
        setPendingRepayAmount,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
}

export function useLoan() {
  const ctx = useContext(LoanContext);
  if (!ctx) {
    throw new Error("useLoan must be used within a LoanProvider");
  }
  return ctx;
}