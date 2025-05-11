import { useTranslation } from 'react-i18next';
import style from "./style.module.css";
import mainImg from '../../assets/images/how-img.png'
import star from '../../assets/images/star.svg'
import separator from '../../assets/images/separator-how.svg'
import separatorMobile from '../../assets/images/separator-how-mobile.svg'

export default function How() {
  const { t } = useTranslation();
  return (
    <section className={style.how}>
      <div className={style.aboutWrapper}>
        <img data-aos="fade" data-aos-duration="1000"  src={mainImg} className={style.mainImage} alt="" />
        <div data-aos="fade" data-aos-duration="1000" className={style.textBlock}>
          <p className={style.text}>{t('how.title')}</p>
          <p style={{marginBottom: '12px'}} className={style.subtext}>
            {t('how.subtitle')}
          </p>
          <div className={style.subtextWrapper}>
            <img src={star} className={style.star} alt="" />
            <p className={style.subtext}>
              {t('how.point1')}
            </p>
          </div>
          <div className={style.subtextWrapper}>
            <img src={star} className={style.star} alt="" />
            <p className={style.subtext}>
              {t('how.point2')}
            </p>
          </div>
          <div className={style.subtextWrapper}>
            <img src={star} className={style.star} alt="" />
            <p className={style.subtext}>
              {t('how.point3')}
            </p>
          </div>
          <p className={style.subtext}>
            {t('how.conclusion')}
          </p>
        </div>
      </div>
      <img data-aos="fade" data-aos-duration="1000"  src={separator} className={style.separator} alt="" />
      <img data-aos="fade" data-aos-duration="1000"  src={separatorMobile} className={style.separatorMobile} alt="" />
    </section>

  );
}
