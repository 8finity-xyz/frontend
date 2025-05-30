import style from "./style.module.css";
import infoIcon from "../../assets/images/feem-info-icon.png";
import itemBg from "../../assets/images/feem-info-item-bg.png";
import star from "../../assets/images/star.svg";
import burnIconTable from '../../assets/images/burnIcon.svg';
import giftIcon from '../../assets/images/giftIcon.svg';
import monetIcon from '../../assets/images/monetIcon.svg';
import arrowIcon from '../../assets/images/arrowTableIcon.svg'
import { useCallback, useEffect, useRef, useState } from "react";
import { TStat } from "../Primary/Primary";
import ServerConnect from "../../servie";
import { Deployment } from '../../App';

const formatNumber = (n: number): string => {
  return Math.round(n).toLocaleString('en-US');
};

interface FeemProps {
  stats: TStat;
  deployments: Deployment[];
  setDeployments: (newValue: Deployment[]) => void;
}

function formatTxHash(hash: string | undefined | null): string {
  if (!hash || hash.length < 8) {
    return hash || '';
  }
  return `${hash.substring(0, 4)}...${hash.substring(hash.length - 4)}`;
}

function formatTimestampAgo(timestamp: number): string {
  const now = new Date();
  const past = new Date(timestamp * 1000);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000;
  const secondsInYear = 31536000;

  const years = Math.floor(diffInSeconds / secondsInYear);
  let remainingSeconds = diffInSeconds % secondsInYear;

  const months = Math.floor(remainingSeconds / secondsInMonth);
  remainingSeconds %= secondsInMonth;

  const days = Math.floor(remainingSeconds / secondsInDay);
  remainingSeconds %= secondsInDay;

  const hours = Math.floor(remainingSeconds / secondsInHour);
  remainingSeconds %= secondsInHour;

  const minutes = Math.floor(remainingSeconds / secondsInMinute);

  let result = "";
  if (years > 0) {
    result += `${years}y `;
    if (months > 0) result += `${months}m `;
  } else if (months > 0) {
    result += `${months}m `;
    if (days > 0) result += `${days}d `;
  } else if (days > 0) {
    result += `${days}d `;
    if (hours > 0) result += `${hours}h `;
  } else if (hours > 0) {
    result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m `;
  } else if (minutes > 0) {
    result += `${minutes} min `;
  }

  result = result.trim();
  return result ? `${result} ago` : "Just now";
}

export default function FeeM({ stats, deployments, setDeployments }: FeemProps) {

  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchDeployments();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchDeployments = () => {
    if (!hasMore || loading) return;
    setLoading(true);

    ServerConnect.getDeployments({ limit: 100, offset: offset })
      .then((newData) => {
        const updatedDeployments = [...deployments, ...newData];
        setDeployments(updatedDeployments);
        if (newData.length < 100) {
          setHasMore(false);
        } else {
          setOffset(prevOffset => prevOffset + 100);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    setDeployments([]);
    setOffset(0);
    setHasMore(true);
    setLoading(false);

    fetchDeployments();
    return () => {
      setDeployments([])
    }
  }, []);

  return (
    <section className={style.feem}>
      <h1 className={style.title}>FeeM Dashboard</h1>
      <div className={style.infoItems}>
        <div className={style.infoItem}>
          <img src={itemBg} className={style.infoItem__bg} alt="" />
          <p className={style.infoItem__title}>All-time Earnings</p>
          <p className={style.infoItem__count}>
            ${formatNumber(stats.gas_burnt_usd)}
          </p>
          <div className={style.infoItem__numberWrapper}>
            <img className={style.infoItem__numberIcon} src={infoIcon} alt="" />
            <p className={style.infoItem__number}>
              {formatNumber(stats.gas_burnt)}
            </p>
          </div>
        </div>
        <div className={style.infoItem}>
          <img src={itemBg} className={style.infoItem__bg} alt="" />
          <p className={style.infoItem__title}>Current Treasury size</p>
          <p className={style.infoItem__count}>
            ${formatNumber(stats.treasury_size_usd)}
          </p>
          <div className={style.infoItem__numberWrapper}>
            <img className={style.infoItem__numberIcon} src={infoIcon} alt="" />
            <p className={style.infoItem__number}>
              {formatNumber(stats.treasury_size)}
            </p>
          </div>
        </div>
        <div className={style.infoItem}>
          <img src={itemBg} className={style.infoItem__bg} alt="" />
          <p className={style.infoItem__title}>All-time Deployments</p>
          <p className={style.infoItem__count}>
            ${formatNumber(stats.gas_burnt_usd - stats.treasury_size_usd)}
          </p>
          <div className={style.infoItem__numberWrapper}>
            <img className={style.infoItem__numberIcon} src={infoIcon} alt="" />
            <p className={style.infoItem__number}>
              {formatNumber(stats.gas_burnt - stats.treasury_size)}
            </p>
          </div>
        </div>
      </div>
      <div className={style.wallets}>
        <div
          onClick={() => {
            navigator.clipboard.writeText(
              "0xFC44Cc0702e72FCF0067b3b98779e5d6273c7e65"
            );
            window.open(`https://sonicscan.org/address/0xFC44Cc0702e72FCF0067b3b98779e5d6273c7e65`)
          }}
          className={style.wallet}
        >
          <div className={style.walletWrapper}>
            <p className={style.walletTitle}>Treasury wallet:</p>
            <p className={style.walletAddress}>
              0xFC44Cc0702e72FCF0067b3b98779e5d6273c7e65
            </p>
          </div>
          <img src={arrowIcon} className={style.walletIcon} alt="" />
        </div>
        <div onClick={() => {
          navigator.clipboard.writeText(
            "0x8888888888888888888888888888888888888888"
          );
          window.open(`https://sonicscan.org/address/0x8888888888888888888888888888888888888888`)
        }} className={style.wallet}>
          <div className={style.walletWrapper}>
            <p className={style.walletTitle}>Burn wallet:</p>
            <p className={style.walletAddress}>
              0x8888888888888888888888888888888888888888
            </p>
          </div>
          <img
            src={arrowIcon}
            className={style.walletIcon}
            alt=""
          />
        </div>
      </div>
      <div className={style.howWorks}>
        <p className={style.howTitle}>{">"}HOW IT WORKS?</p>
        <p className={style.howSubtitle}>
          Every time someone mines INFINITY on Sonic, they pay a small gas fee. 90% of it flows into the FeeM treasury and is reinvested back into the ecosystem through:
        </p>
        <div className={style.howListItem}>
          <img className={style.howListStar} src={star} alt="" />
          <p className={style.howListText}>Market buybacks and burns to keep mining profitable</p>
        </div>
        <div className={style.howListItem}>
          <img className={style.howListStar} src={star} alt="" />
          <p className={style.howListText}>
            Voters Incentives to the Shadow pool to deepen liquidity
          </p>
        </div>
      </div>
      <div className={style.tableWrapper}>
        <div className={style.table}>
          <div className={style.tableTop}>
            <p className={style.tableTopText}>Date</p>
            <p className={style.tableTopText}>Type</p>
            <p className={style.tableTopText}>S</p>
            <p className={style.tableTopText}>USD</p>
            <p className={style.tableTopText}>Hash</p>
          </div>
          {deployments.map((deployment, index) => (
            <div
              ref={index === deployments.length - 1 ? lastElementRef : null}
              key={index}
              className={style.tableRow}
            >
              <p className={style.tableRowText}>
                {formatTimestampAgo(deployment.timestamp)}
              </p>
              <div className={style.tableRowIconWrapper}>
                <img
                  className={style.tableRowIcon}
                  src={
                    deployment.type === "INCENTIVES"
                      ? giftIcon
                      : deployment.type === "BUYBACK_N_BURN"
                        ? burnIconTable
                        : deployment.type === "LP"
                          ? monetIcon
                          : ""
                  }
                  alt=""
                />
                <p className={style.tableRowIconText}>
                  {deployment.type === "INCENTIVES" ? (
                    <>Shadow Incentive</>
                  ) : deployment.type === "BUYBACK_N_BURN" ? (
                    <>Buyback&nbsp;&amp;&nbsp;Burn</>
                  ) : deployment.type === "LP" ? (
                    <>Add Liquidity</>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <p className={style.tableRowText}>
                {formatNumber(deployment.amount)}
              </p>
              <p className={style.tableRowText}>
                ${formatNumber(deployment.amount_usd)}
              </p>
              <div
                onClick={() => {
                  window.open(
                    `https://sonicscan.org/tx/${deployment.tx_hash}`,
                    "_blank"
                  );
                }}
                className={style.tableRowHashWrapper}
              >
                <p className={style.tableRowHash}>
                  {formatTxHash(deployment.tx_hash)}
                </p>
                <img
                  className={style.tableRowHashIcon}
                  src={arrowIcon}
                  alt=""
                />
              </div>
            </div>
          ))}
          {loading && <p className={style.loadingMore}>Loading more...</p>}
        </div>
      </div>
    </section>
  );
}
