import style from "./style.module.css";
import mainImg from '../../assets/images/how-img.png'
import star from '../../assets/images/star.svg'
import separator from '../../assets/images/separator-how.svg'
import separatorMobile from '../../assets/images/separator-how-mobile.svg'

export default function How() {
  return (
    <section className={style.how}>
      <div className={style.aboutWrapper}>
        <img data-aos="fade" data-aos-duration="1000"  src={mainImg} className={style.mainImage} alt="" />
        <div data-aos="fade" data-aos-duration="1000" className={style.textBlock}>
          <p className={style.text}>{">"}HOW IT WORKS?</p>
          <p style={{marginBottom: '12px'}} className={style.subtext}>
            Infinity powers a&nbsp;flywheel between mining and value:
          </p>
          <div className={style.subtextWrapper}>
            <img src={star} className={style.star} alt="" />
            <p className={style.subtext}>
              Miners use our open-source CLI Miner to&nbsp;earn $8&nbsp;while burning gas with every successful transaction&mdash;generating clean, custom wallet addresses along the way.
            </p>
          </div>
          <div className={style.subtextWrapper}>
            <img src={star} className={style.star} alt="" />
            <p className={style.subtext}>
            90% of&nbsp;the gas fees go&nbsp;straight back into the ecosystem through automatic buybacks and bribes.
            </p>
          </div>
          <div className={style.subtextWrapper}>
            <img src={star} className={style.star} alt="" />
            <p className={style.subtext}>
            As&nbsp;price and liquidity grow, mining becomes even more attractive.
            </p>
          </div>
          <p className={style.subtext}>
            The more the community mines, the stronger the token gets&mdash;fueling a&nbsp;self-sustaining loop of&nbsp;demand and value.
          </p>
        </div>
      </div>
      <img data-aos="fade" data-aos-duration="1000"  src={separator} className={style.separator} alt="" />
      <img data-aos="fade" data-aos-duration="1000"  src={separatorMobile} className={style.separatorMobile} alt="" />
    </section>

  );
}
