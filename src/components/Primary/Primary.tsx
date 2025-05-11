import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  function formatHashrate(n: number): string {
    const roundToTenth = (num: number) => Math.round(num * 10) / 10;

    if (n >= 1e30) return `${roundToTenth(n / 1e30)} ${t('hashrate.qhs')}`;
    if (n >= 1e27) return `${roundToTenth(n / 1e27)} ${t('hashrate.rhs')}`;
    if (n >= 1e24) return `${roundToTenth(n / 1e24)} ${t('hashrate.yhs')}`;
    if (n >= 1e21) return `${roundToTenth(n / 1e21)} ${t('hashrate.zhs')}`;
    if (n >= 1e18) return `${roundToTenth(n / 1e18)} ${t('hashrate.ehs')}`;
    if (n >= 1e15) return `${roundToTenth(n / 1e15)} ${t('hashrate.phs')}`;
    if (n >= 1e12) return `${roundToTenth(n / 1e12)} ${t('hashrate.ths')}`;
    if (n >= 1e9) return `${roundToTenth(n / 1e9)} ${t('hashrate.ghs')}`;
    if (n >= 1e6) return `${roundToTenth(n / 1e6)} ${t('hashrate.mhs')}`;
    if (n >= 1e3) return `${roundToTenth(n / 1e3)} ${t('hashrate.khs')}`;
    return `${roundToTenth(n)} ${t('hashrate.hs')}`;
  }

  const [icon, setIcon] = useState(copyIcon)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])
  return (
    <section className={style.primary}>
      <ScrollingBg />
      <img className={style.primary__logo} src={logo} alt={t('primary.logoAlt')} />
      <h1 data-aos="fade" data-aos-duration="1000" className={style.primary__title}>
        {t('primary.title')}
      </h1>
      <h2 data-aos="fade" data-aos-duration="1000" className={style.primary__subtitle}>
        {t('primary.subtitle')}
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
          {t('primary.buyButton')}
        </button>
        <button onClick={() => {
          window.open('https://github.com/8finity-xyz', '_blank');
        }} className={style.primary__mineBtn} type='button'>
          {t('primary.mineButton')}
        </button>
      </div>
      <div className={style.primary__info}>
        <div data-aos="fade" data-aos-duration="1000" className={style.primary__infoItem}>
          <p className={style.primary__itemCount}>
            ${formatNumber(stats.gas_burnt_usd)}
          </p>
          <p className={style.primary__itemTitle}>
            {t('primary.stats.gasBurnt')}
          </p>
        </div>
        <div data-aos="fade" data-aos-duration="1000" className={style.primary__infoItem}>
          <p className={style.primary__itemCount}>
            {formatNumber(stats.holders_count)}
          </p>
          <p className={style.primary__itemTitle}>
            {t('primary.stats.holders')}
          </p>
        </div>
        <div data-aos="fade" data-aos-duration="1000" className={style.primary__infoItem}>
          <p className={style.primary__itemCount}>
            ${formatNumber(stats.fdv_usd)}
          </p>
          <p className={style.primary__itemTitle}>
            {t('primary.stats.fdv')}
          </p>
        </div>
        <div data-aos="fade" data-aos-duration="1000" className={style.primary__infoItem}>
          <p className={style.primary__itemCount}>
            {formatHashrate(stats.hashrate)}
          </p>
          <p className={style.primary__itemTitle}>
            {t('primary.stats.hashrate')}
          </p>
        </div>
      </div>
      <img src={arrow} className={style.bottomArrow} alt={t('primary.bottomArrowAlt')} />
    </section>
  );
}