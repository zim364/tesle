"use client";

import { useState } from "react";
import styles from "./car-trim-specs.module.css";
import { Trim } from "@/data/models";

export function CarTrimSpecs({ trims, theme = "light" }: { trims: Trim[]; theme?: "light" | "dark" }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = trims[activeIdx];

  return (
    <section className={`${styles.section} ${styles[theme]}`} id="specs">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Specifications</p>
          <h2 className={styles.heading}>Select Your Trim</h2>
        </div>
        
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {trims.map((trim, idx) => (
              <button
                key={trim.name}
                className={`${styles.tab} ${activeIdx === idx ? styles.activeTab : ""}`}
                onClick={() => setActiveIdx(idx)}
              >
                {trim.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.specsDisplay} key={activeIdx}>
          <div className={styles.specsGrid}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Range</span>
              <span className={styles.specValue}>{current.range}</span>
            </div>
            <div className={styles.specDivider} />
            <div className={styles.specItem}>
              <span className={styles.specLabel}>0-60 mph</span>
              <span className={styles.specValue}>{current.acceleration}</span>
            </div>
            {current.topSpeed && (
              <>
                <div className={styles.specDivider} />
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Top Speed</span>
                  <span className={styles.specValue}>{current.topSpeed}</span>
                </div>
              </>
            )}
          </div>
          
          <div className={styles.ctaArea}>
            <p className={styles.price}>{current.price ? `Starting at ${current.price}` : ""}</p>
            <button className={styles.orderBtn}>Order Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}