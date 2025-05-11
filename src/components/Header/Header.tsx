import { useTranslation } from 'react-i18next';
import style from "./style.module.css";
import logo from '../../assets/images/header-logo.svg';
import { useNavigate } from "react-router-dom";
import i18n from '../../i18n'; // Import i18n instance

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function routeHandler(e: { preventDefault: () => void; }) {
    e.preventDefault();
    navigate('/feem')
  }

  const changeLanguageHandler = () => {
    const currentLanguage = i18n.language;
    const targetLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(targetLanguage);
  };

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
        alt={t('header.logoAlt')}
      />
      <img src={logo} onClick={() => {
          navigate('/')
          setTimeout(() => {
          }, 200);
        }} className={style.header__logoGray} alt={t('header.logoAlt')} />
      <div className={style.header__links}>
        <a onClick={routeHandler} className={style.header__link} /* href is handled by routeHandler or should be static */ >
          {t('header.nav.feem')}
        </a>
        <a className={style.header__link} href="https://github.com/8finity-xyz" target="_blank">
          {t('header.nav.mine')}
        </a>
        <a className={style.header__link} href="https://paragraph.com/@wagmi1337/infinity" target="_blank">
          {t('header.nav.manifesto')}
        </a>
      </div>
      <button onClick={() => window.open('https://app.magpiefi.xyz/swap/sonic/S/sonic/8', '_blank')} type="button" className={style.header__button}>
        {t('header.buyButton')}
      </button>
      {/* Language Switcher Button */}
      <button onClick={changeLanguageHandler} type="button" className={`${style.header__button} ${style.header__languageButton}`}>
        {i18n.language === 'en' ? '中文' : 'English'}
      </button>
    </header>
  );
}
