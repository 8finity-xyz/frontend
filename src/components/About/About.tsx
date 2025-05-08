import style from "./style.module.css";
import aboutImg from '../../assets/images/about-img.png';
import separator from '../../assets/images/separator.svg'
import separatorMobile from '../../assets/images/separator-mobile.svg'


export default function About() {

  return (
    <section className={style.about}>
      <div className={style.aboutWrapper}>
        <img data-aos="fade" data-aos-duration="1000"  src={aboutImg} className={style.mainImage} alt="" />
        <div data-aos="fade" data-aos-duration="1000" className={style.textBlock}>
          <p className={style.text}>{">"}WHAT IS INFINITY?</p>
          <p className={style.subtext}>
            <b>Infinity (8)</b> is&nbsp;the first self-sustaining Proof-of-Work token
            on&nbsp;Sonic built to&nbsp;hold and grow value&mdash;forever.
            It&nbsp;fuses Bitcoin-style mining with a&nbsp;powerful economic
            engine driven by&nbsp;Sonic&rsquo;s native FeeM&nbsp;mechanism.
            <br />
            <br />
            Built around the number 8&mdash;a symbol of&nbsp;infinite
            potential&mdash;Infinity embraces the technical innovation made
            possible only on&nbsp;Sonic to&nbsp;introduce a&nbsp;new kind
            of&nbsp;store of&nbsp;value.
          </p>
        </div>
      </div>
      <img data-aos="fade" src={separator} className={style.separator} alt="" />
      <img data-aos="fade" src={separatorMobile} className={style.separatorMobile} alt="" />
    </section>
  );
}
