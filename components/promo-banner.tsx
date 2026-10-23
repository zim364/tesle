import styles from "./promo-banner.module.css";

export function PromoBanner() {
  return (
    <div className={styles.banner}>
      <p className={styles.text}>
        Trade In Your Gas Car and Receive 2,000 Free Supercharging Miles
      </p>
      <button className={styles.button}>Get a Trade-In Estimate</button>
      <div className={styles.dots}>
        <span className={styles.dotActive}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
}