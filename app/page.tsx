import Link from "next/link";
import { PromoBanner } from "@/components/promo-banner";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <PromoBanner />
      
      {/* THE ONLY THING ON THE HOMEPAGE: A CINEMATIC HERO */}
      <section className={styles.heroContainer}>
        <video 
          className={styles.bgVideo}
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Redefining-Hero-Desktop-Poster.jpg"
        >
          <source src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Cybertruck-Redefining-Desktop-v2.mp4" type="video/mp4" />
        </video>
        
        <div className={styles.overlay} />
        
        <div className={styles.content}>
          <h1 className={styles.title}>Experience Tesla</h1>
          <p className={styles.subtitle}>Find the perfect vehicle for your lifestyle.</p>
          <Link href="/models" className={styles.primaryBtn}>
            Explore the Lineup
          </Link>
        </div>
      </section>
    </div>
  );
}