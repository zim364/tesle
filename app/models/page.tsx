import Link from "next/link";
import { carModels } from "@/data/models";
import styles from "./models.module.css";

export default function ModelsPage() {
  const lineup = carModels;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>The Lineup</h1>
        <p className={styles.subtitle}>Find the Tesla that fits your life.</p>
      </header>

      <div className={styles.grid}>
        {lineup.map((model) => (
          <Link href={`/models/${model.slug}`} key={model.slug} className={styles.card}>
            
            <div className={styles.imageWrapper}>
              <img src={model.heroImage} alt={model.name} className={styles.image} />
            </div>

            <div className={styles.content}>
              <div className={styles.titleRow}>
                <h2 className={styles.name}>{model.name}</h2>
                <span className={styles.arrow}>&rarr;</span>
              </div>
              <p className={styles.tagline}>{model.tagline}</p>
              
              <div className={styles.specs}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Range</span>
                  <span className={styles.specValue}>{model.trims[0]?.range || "N/A"}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>0-60 mph</span>
                  <span className={styles.specValue}>{model.trims[0]?.acceleration || "N/A"}</span>
                </div>
              </div>
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
}