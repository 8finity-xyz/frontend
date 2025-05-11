import { useTranslation } from 'react-i18next';
import style from "./style.module.css";
import aboutImg from '../../assets/images/about-img.png';
import separator from '../../assets/images/separator.svg'
import separatorMobile from '../../assets/images/separator-mobile.svg'


export default function About() {
  const { t } = useTranslation();

  return (
    <section className={style.about}>
      <div className={style.aboutWrapper}>
        <img data-aos="fade" data-aos-duration="1000"  src={aboutImg} className={style.mainImage} alt="" />
        <div data-aos="fade" data-aos-duration="1000" className={style.textBlock}>
          <p className={style.text}>{t('about.whatIsInfinity')}</p>
          <p className={style.subtext}>
            <b>{t('about.description.part1')}</b>{t('about.description.part2')}
            {t('about.description.part3')}
            <br />
            <br />
            {t('about.description.part4')}
          </p>
        </div>
      </div>
      <img data-aos="fade" src={separator} className={style.separator} alt="" />
      <img data-aos="fade" src={separatorMobile} className={style.separatorMobile} alt="" />
    </section>
  );
}
