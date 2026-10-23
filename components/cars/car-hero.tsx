import Link from "next/link";
import styles from "./car-hero.module.css";

type CarHeroProps = {
  name: string;
  tagline: string;
  heroImage: string;
  slug: string;
};

export function CarHero({ name, tagline, heroImage, slug }: CarHeroProps) {
  return (
    <section className={styles.hero}>
      <img src={heroImage} alt={name} className={styles.heroImage} />
      <div className={styles.heroOverlay} />
      
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>Tesla</p>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.tagline}>{tagline}</p>
        <div className={styles.actions}>
          <Link href={`/apply?model=${slug}`} className={styles.btnPrimary}>Order Now</Link>
          <a href="#specs" className={styles.btnSecondary}>View Specs</a>
        </div>
      </div>
    </section>
  );
}