import { useTranslation } from 'react-i18next';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "../PieChart/PieChart";
import style from "./style.module.css";
import leftShadow from '../../assets/images/diagram-left-shadow.png';
import rightShadow from '../../assets/images/diagram-right-shadow.png';
import separator from '../../assets/images/separator-diagram.png';
import { useEffect, useRef, useState } from "react";
import { useHover } from "../../store";

Chart.register(CategoryScale);

export default function Diagram() {
  const { t } = useTranslation();
  const currentLabel = useHover((state) => state.label);

  const [isVisible, setIsVisible] = useState(false);
  const diagramRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.4,
      }
    );

    const currentRef = diagramRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);


  return (
    <section ref={diagramRef} className={style.diagram}>
      <p className={style.diagramTitle}>
        {t('diagram.title')}
      </p>
      <div className={style.container}>
        <img className={style.leftShadow} src={leftShadow} alt="" />
        <div className={style.diagramInfoWrapper}>
          <div className={style.diagramWrapper}>
            <p className={`${style.percentLabel} ${style.percentLabelTr}`}>
              {t('diagram.percentTreasury')}
            </p>
            <p className={`${style.percentLabel} ${style.percentLabelLiq}`}>
              {t('diagram.percentLiquidity')}
            </p>
            <p className={`${style.percentLabel} ${style.percentLabelWag}`}>
              {t('diagram.percentWagmi')}
            </p>
            <p className={`${style.percentLabel} ${style.percentLabelMin}`}>
              {t('diagram.percentMining')}
            </p>
            {isVisible ? (
              <PieChart />
            ) : (
              <div style={{ height: '300px', width: '300px' }}>{/* заглушка*/}</div>
            )}
          </div>
          <div className={style.labels}>
            <div style={{ transform: currentLabel == 'Treasury' ? 'translateX(5px)' : '' }} className={style.label}>
              <div style={{ width: '12px', height: '12px', background: currentLabel == 'Treasury' ? '#FFF' : '#005999' }}></div>
              <p className={style.labelText}>
                {t('diagram.labelTreasury')}
              </p>
            </div>
            <div style={{ transform: currentLabel == 'Liquidity' ? 'translateX(5px)' : '' }} className={style.label}>
              <div style={{ width: '12px', height: '12px', background: currentLabel == 'Liquidity' ? '#FFF' : '#0075CB' }}></div>
              <p className={style.labelText}>
                {t('diagram.labelLiquidity')}
              </p>
            </div>
            <div style={{ transform: currentLabel == 'WAGMI Community' ? 'translateX(5px)' : '' }} className={style.label}>
              <div style={{ width: '12px', height: '12px', background: currentLabel == 'WAGMI Community' ? '#FFF' : '#3DADFF' }}></div>
              <p className={style.labelText}>
                {t('diagram.labelWagmiCommunity')}
              </p>
            </div>
            <div style={{ transform: currentLabel == 'Mining rewards' ? 'translateX(5px)' : '' }} className={style.label}>
              <div style={{ width: '12px', height: '12px', background: currentLabel == 'Mining rewards' ? '#FFF' : '#70C3FF' }}></div>
              <p className={style.labelText}>
                {t('diagram.labelMiningRewards')}
              </p>
            </div>
          </div>
        </div>
        <img className={style.rightShadow} src={rightShadow} alt="" />
      </div>
      <div className={style.totalWrapper}>
        <p className={style.totalCount}>
          {t('diagram.totalCount')}
        </p>
        <p className={style.totalText}>
          {t('diagram.totalText')}
        </p>
        <p className={style.more}>
          {t('diagram.learnMoreText')}<a href="https://paragraph.com/@wagmi1337/infinity" className={style.moreLink} target="_blank">{t('diagram.learnMoreLink')}</a>
        </p>
      </div>
      <img src={separator} className={style.separator} alt="" />
    </section>
  );
}
