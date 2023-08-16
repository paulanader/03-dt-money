import {
  HeaderContainer,
  HeaderContent,
  NewTransactionsButton,
} from "./styles";
import logoImg from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="Logo" />
        <Dialog.Root>
          <NewTransactionsButton>Nova transação</NewTransactionsButton>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};
