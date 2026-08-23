import { createContext, useContext, useState, ReactNode } from "react";
import { formatDate } from "../lib/loanMath";

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

type LoanContextType = {
  status: LoanStatus;
  setStatus: (status: LoanStatus) => void;

  boost: BoostState;
  connectBank: (bankName: string) => void;
  uploadBill: (fileName: string) => void;

  loanTotal: number;
  outstandingBalance: number;
  repay: (amount: number) => void;

  reset: () => void;

  application: Application | null;
  setApplication: (app: Application) => void;
  submitApplication: () => void;
  terminateApplication: () => void;
  lastTermination: TerminationRecord | null;

  lastPayment: PaymentRecord | null;
  recordPayment: (payment: PaymentRecord) => void;

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
  const [loanTotal] = useState(300000);
  const [outstandingBalance, setOutstandingBalance] = useState(182000);
  const [application, setApplicationState] = useState<Application | null>(null);
  const [lastTermination, setLastTermination] = useState<TerminationRecord | null>(null);
  const [lastPayment, setLastPayment] = useState<PaymentRecord | null>(null);
  const [pendingBank, setPendingBank] = useState("");
  const [pendingRepayAmount, setPendingRepayAmount] = useState(35000);

  const connectBank = (bankName: string) =>
    setBoost((b) => ({ ...b, bankConnected: true, bankName }));

  const uploadBill = (fileName: string) =>
    setBoost((b) => ({ ...b, billUploaded: true, billFileName: fileName }));

  const repay = (amount: number) => {
    setOutstandingBalance((prev) => Math.max(prev - amount, 0));
  };

  const reset = () => {
    setStatus("eligible");
    setBoost(INITIAL_BOOST);
    setOutstandingBalance(182000);
    setApplicationState(null);
  };

  const setApplication = (app: Application) => setApplicationState(app);

  const submitApplication = () => {
    setStatus("underReview");
  };

  const terminateApplication = () => {
    if (application) {
      setLastTermination({
        amount: application.amount,
        purpose: application.purpose,
        date: formatDate(new Date()),
      });
    }
    setApplicationState(null);
    setStatus("eligible");
  };

  const recordPayment = (payment: PaymentRecord) => {
    setLastPayment(payment);
    if (payment.success) {
      repay(payment.amount);
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
        reset,
        application,
        setApplication,
        submitApplication,
        terminateApplication,
        lastTermination,
        lastPayment,
        recordPayment,
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