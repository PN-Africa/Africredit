import { createContext, useContext, useState, ReactNode } from "react";
import { formatDate } from "../lib/loanMath";

export type BankAccount = {
  id: string;
  bankName: string;
  last4: string;
  accountName: string;
  connectedDate: string;
  isPrimary: boolean;
};

type ProfileContextType = {
  fullName: string;
  phone: string;
  stateOfResidence: string;
  updateProfile: (fields: Partial<{
    fullName: string;
    phone: string;
    stateOfResidence: string;
  }>) => void;

  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;

  bankAccounts: BankAccount[];
  addBankAccount: (bankName: string) => void;
  setPrimaryBankAccount: (id: string) => void;
  removeBankAccount: (id: string) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [fullName, setFullName] = useState("Theophilus Boadi");
  const [phone, setPhone] = useState("+234 345 345 2345");
  const [stateOfResidence, setStateOfResidence] = useState("Lagos");
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankName: "GTBank",
      last4: "1234",
      accountName: "Theophilus Boadi",
      connectedDate: "15 July 2026",
      isPrimary: true,
    },
    {
      id: "2",
      bankName: "GTBank",
      last4: "1234",
      accountName: "Theophilus Boadi",
      connectedDate: "15 July 2026",
      isPrimary: false,
    },
  ]);

  const updateProfile = (
    fields: Partial<{
      fullName: string;
      phone: string;
      stateOfResidence: string;
    }>
  ) => {
    if (fields.fullName !== undefined) setFullName(fields.fullName);
    if (fields.phone !== undefined) setPhone(fields.phone);
    if (fields.stateOfResidence !== undefined)
      setStateOfResidence(fields.stateOfResidence);
  };

  const addBankAccount = (bankName: string) => {
    setBankAccounts((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        bankName,
        last4: "1234",
        accountName: fullName,
        connectedDate: formatDate(new Date()),
        isPrimary: prev.length === 0,
      },
    ]);
  };

  const setPrimaryBankAccount = (id: string) => {
    setBankAccounts((prev) =>
      prev.map((acc) => ({ ...acc, isPrimary: acc.id === id }))
    );
  };

  const removeBankAccount = (id: string) => {
    setBankAccounts((prev) => {
      const wasPrimary = prev.find((a) => a.id === id)?.isPrimary;
      const next = prev.filter((a) => a.id !== id);
      if (wasPrimary && next.length > 0) {
        next[0] = { ...next[0], isPrimary: true };
      }
      return next;
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        fullName,
        phone,
        stateOfResidence,
        updateProfile,
        photoUri,
        setPhotoUri,
        bankAccounts,
        addBankAccount,
        setPrimaryBankAccount,
        removeBankAccount,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return ctx;
}