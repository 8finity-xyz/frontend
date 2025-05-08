import style from "./style.module.css";
import logo from '../../assets/images/header-logo.svg';
import { useNavigate } from "react-router-dom";

export default function Header() {
  
  const navigate = useNavigate();

  function routeHandler(e: { preventDefault: () => void; }) {
    e.preventDefault();
    navigate('/feem')
  }

  return (
    <header className={style.header}>
      <img
        onClick={() => {
          navigate('/')
          setTimeout(() => {
          }, 200);
        }}
        src={logo}
        className={style.header__logo}
        alt="logo infinity"
      />
      <img src={logo} onClick={() => {
          navigate('/')
          setTimeout(() => {
          }, 200);
        }} className={style.header__logoGray} alt="logo infinity" />
      <div className={style.header__links}>
        <a onClick={routeHandler} className={style.header__link} href="https://paragraph.com/@wagmi1337/infinity" target="_blank">
          FeeM
        </a>
        <a className={style.header__link} href="https://github.com/8finity-xyz" target="_blank">
          Mine
        </a>
        <a className={style.header__link} href="https://paragraph.com/@wagmi1337/infinity" target="_blank">
          Manifesto
        </a>
      </div>
      <button onClick={() => window.open('https://app.magpiefi.xyz/swap/sonic/S/sonic/8', '_blank')} type="button" className={style.header__button}>
        Buy
      </button>
    </header>
  );
}
