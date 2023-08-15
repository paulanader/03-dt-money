import {
  HeaderContainer,
  HeaderContent,
  NewTransactionsButton,
} from "./styles";
import logoImg from "../../assets/logo.svg";

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="Logo" />
        <NewTransactionsButton>Nova transação</NewTransactionsButton>
      </HeaderContent>
    </HeaderContainer>
  );
};
