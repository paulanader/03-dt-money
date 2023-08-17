/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TransactionsProps {
  id: number;
  category: string;
  createdAt: string;
  description: string;
  price: number;
  type: "income" | "outcome";
}

interface TransactionsContextProps {
  transactions: TransactionsProps[];
  loadTransactions: () => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);

export const useTransactions = (): TransactionsContextProps => {
  const context = useContext(TransactionContext);

  return context;
};

export const TransactionsProvider = ({
  children,
}: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:3333/transactions");
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, loadTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
