import style from "./style.module.css";
import logo from '../../assets/images/footer-logo.png';
import X from '../../assets/images/X.svg';
import Telegram from '../../assets/images/telegram.svg';

export default function Footer() {


  return (
    <footer className={style.footer}>
      <div className={style.madeByWagmi}>
        <p className={style.text}>
          Made by
        </p>
        <img onClick={() => window.open('https://sonic.wagmi.best/', '_blank')} src={logo} className={style.img} alt="" />
      </div>
      <div className={style.followInfinity}>
        <p className={style.text}>
          <span>Follow </span><span className={style.glow}>INFINTIY</span>
        </p>
        <div className={style.social}><img src={X} onClick={() => window.open("https://x.com/8finity_xyz", "_blank")}></img></div>
        <div className={style.social}><img src={Telegram} onClick={() => window.open("https://t.me/infinitytoken", "_blank")}></img></div>
      </div>
    </footer>
  );
}
