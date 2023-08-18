/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../lib/axios";

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
  fetchTransactions: (data?: string) => Promise<void>;
  createNewTransaction: (data: CreateNewTransactionProps) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

interface CreateNewTransactionProps {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
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

  async function fetchTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(response.data);
  }

  async function createNewTransaction(data: CreateNewTransactionProps) {
    const { description, price, category, type } = data;

    const response = await api.post("/transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createNewTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
