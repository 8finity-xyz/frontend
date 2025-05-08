import React from "react";
import styles from "./style.module.css";

function generatePseudoRandomString(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let str = ''

  for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * 36)
      str += charset[index]
  }

  return str
}

const lines = Array.from(
  { length: 40 },
  (_) => ` 0x8888888${generatePseudoRandomString(500)}`
);

const ScrollingBg: React.FC = () => {
  const allLines = [
    ...lines,
    ...lines,
    ...lines,
    ...lines,
    ...lines,
    ...lines,
    ...lines,
    ...lines,
    ...lines,
  ];

  return (
    <div className={styles.wrapper}>
        <div className={`${styles.topBlur} ${styles.blur}`}></div>
        <div className={`${styles.bottomBlur} ${styles.blur}`}></div>
      <div className={styles.tickerContainer}>
        <div className={styles.tickerContent}>
          {allLines.map((line, idx) => (
            <div key={idx} className={styles.line}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ScrollingBg;
