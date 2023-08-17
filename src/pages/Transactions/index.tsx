import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHightLight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { useTransactions } from "../../contexts/TransactionsContext";

export const Transactions = () => {
  const { transactions } = useTransactions();

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction?.description}</td>
                <td>
                  <PriceHightLight variant={transaction?.type}>
                    R$ {transaction?.price}
                  </PriceHightLight>
                </td>
                <td>{transaction?.category}</td>
                <td>{transaction?.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};
