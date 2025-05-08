import ScrollingBg from '../ScrollingBg/ScrollingBg';
import style from './style.module.css';
import logo from '../../assets/images/infinity-primary.png';
import copyIcon from '../../assets/images/wallet-copy-icon.svg';
import greenTick from '../../assets/images/green-tick.svg';
import arrow from '../../assets/images/bottom-arrow.svg'
import { useEffect, useState } from 'react';

export type TStat = {
  gas_burnt_usd: number,
  gas_burnt: number,
  deployments_usd: number,
  deployments: number,
  holders_count: number,
  fdv_usd: number,
  hashrate: number,
}

const formatNumber = (n: number): string => {
  return Math.round(n).toLocaleString('en-US');
};


export default function Primary({ stats }: { stats: TStat }) {

  function formatHashrate(n: number): string {
    const roundToTenth = (num: number) => Math.round(num * 10) / 10;

    if (n >= 1e30) return `${roundToTenth(n / 1e30)} QH/s`;
    if (n >= 1e27) return `${roundToTenth(n / 1e27)} RH/s`;
    if (n >= 1e24) return `${roundToTenth(n / 1e24)} YH/s`;
    if (n >= 1e21) return `${roundToTenth(n / 1e21)} ZH/s`;
    if (n >= 1e18) return `${roundToTenth(n / 1e18)} EH/s`;
    if (n >= 1e15) return `${roundToTenth(n / 1e15)} PH/s`;
    if (n >= 1e12) return `${roundToTenth(n / 1e12)} TH/s`;
    if (n >= 1e9) return `${roundToTenth(n / 1e9)} GH/s`;
    if (n >= 1e6) return `${roundToTenth(n / 1e6)} MH/s`;
    if (n >= 1e3) return `${roundToTenth(n / 1e3)} KH/s`;
    return `${roundToTenth(n)} H/s`;
  }

  const [icon, setIcon] = useState(copyIcon)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])
  return (
    <section className={style.primary}>
      <ScrollingBg />
      <img className={style.primary__logo} src={logo} alt="logo infinity" />
      <h1 data-aos="fade" data-aos-duration="1000" className={style.primary__title}>
        INFINITY
      </h1>
      <h2 data-aos="fade" data-aos-duration="1000" className={style.primary__subtitle}>
        The first truly self-sustaining pow cryptocurrency
      </h2>
      <div onClick={() => {
        navigator.clipboard.writeText('0x888852d1c63c7b333efEb1c4C5C79E36ce918888');
        setIcon(greenTick)
        setTimeout(() => setIcon(copyIcon), 1000);
      }} data-aos="fade" data-aos-duration="1000" className={style.primary__wallet}>
        <p className={style.primary__walletAddress}>
          0x888852d1c63c7b333efEb1c4C5C79E36ce918888
        </p>
        <img src={icon} className={style.primary__walletIcon} alt="" />
      </div>
      <div data-aos="fade" data-aos-duration="1000" className={style.primary__buttons}>
        <button onClick={() => {
          window.open('https://app.magpiefi.xyz/swap/sonic/S/sonic/8', '_blank');
        }} className={style.primary__butBtn} type='button'>
          Buy
        </button>
        <button onClick={() => {
          window.open('https://github.com/8finity-xyz', '_blank');
        }} className={style.primary__mineBtn} type='button'>
          Mine
        </button>
      </div>
      <div className={style.primary__info}>
        <div data-aos="fade" data-aos-duration="1000" className={style.primary__infoItem}>
          <p className={style.primary__itemCount}>
            ${formatNumber(stats.gas_burnt_usd)}
          </p>
          <p className={style.primary__itemTitle}>
            Gas burnt
          </p>
        </div>
        <div data-aos="fade" data-aos-duration="1000" className={style.primary__infoItem}>
          <p className={style.primary__itemCount}>
            {formatNumber(stats.holders_count)}
          </p>
          <p className={style.primary__itemTitle}>
            Holders
          </p>
        </div>
        <div data-aos="fade" data-aos-duration="1000" className={style.primary__infoItem}>
          <p className={style.primary__itemCount}>
            ${formatNumber(stats.fdv_usd)}
          </p>
          <p className={style.primary__itemTitle}>
            FDV
          </p>
        </div>
        <div data-aos="fade" data-aos-duration="1000" className={style.primary__infoItem}>
          <p className={style.primary__itemCount}>
            {formatHashrate(stats.hashrate)}
          </p>
          <p className={style.primary__itemTitle}>
            Hashrate
          </p>
        </div>
      </div>
      <img src={arrow} className={style.bottomArrow} alt="bottom arrow" />
    </section>
  );
}