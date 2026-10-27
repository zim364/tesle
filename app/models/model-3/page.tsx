"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getCarModel } from "@/data/models";
import styles from "./model-3.module.css";

const SLIDES = [
  { id: "standard", name: "Model 3", tagline: "Sport Sedan", text: "Lease From $299/mo", img: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Standard-Hero-Desktop-EMEA.jpg", stats: [{ label: "Range (EPA est.)", value: "321 mi" }, { label: "0-60 mph", value: "5.8 s" }, { label: "Cargo Space", value: "24 cu ft" }] },
  { id: "premium", name: "Model 3 Premium", tagline: "Elevated Comfort", text: "Lease From $399/mo", img: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Premium-Hero-Desktop-LHD-US.jpg", stats: [{ label: "Range (EPA est.)", value: "346 mi" }, { label: "0-60 mph", value: "3.8 s" }, { label: "Drive", value: "Dual Motor" }] },
  { id: "performance", name: "Model 3 Performance", tagline: "Track Ready", text: "Lease From $549/mo", img: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Hero-Desktop-LHD-US.jpg", stats: [{ label: "Range (EPA est.)", value: "316 mi" }, { label: "0-60 mph", value: "2.9 s" }, { label: "Top Speed", value: "163 mph" }] }
];

const SPEC_DATA = [
  { name: "Standard", range: "321 mi", zeroTo60: "5.8 s", drive: "Rear-Wheel Drive", cargo: "24 cu ft", specs: [{ label: "Weight (Curb Mass)", value: "3,759 lbs" }, { label: "Wheels", value: "18\" or 19\"" }, { label: "Seating", value: "5 seats" }, { label: "Displays", value: "16\" Center Touchscreen" }, { label: "Ground Clearance", value: "5.4\"" }, { label: "Supercharging Max", value: "225 kW Max" }, { label: "Charging Speed", value: "Up to 170 miles in 15 mins" }, { label: "Basic Warranty", value: "4 years or 50,000 mi" }] },
  { name: "Premium AWD", range: "346 mi", zeroTo60: "3.8 s", drive: "Dual Motor AWD", cargo: "24 cu ft", specs: [{ label: "Weight (Curb Mass)", value: "4,030 lbs" }, { label: "Wheels", value: "18\" or 19\"" }, { label: "Seating", value: "5 seats" }, { label: "Displays", value: "16\" Center / 8\" Rear" }, { label: "Ground Clearance", value: "5.4\"" }, { label: "Supercharging Max", value: "250 kW Max" }, { label: "Charging Speed", value: "Up to 185 miles in 15 mins" }, { label: "Basic Warranty", value: "4 years or 50,000 mi" }] },
  { name: "Premium RWD", range: "363 mi", zeroTo60: "4.9 s", drive: "Rear-Wheel Drive", cargo: "24 cu ft", specs: [{ label: "Weight (Curb Mass)", value: "3,759 lbs" }, { label: "Wheels", value: "18\" or 19\"" }, { label: "Seating", value: "5 seats" }, { label: "Displays", value: "16\" Center / 8\" Rear" }, { label: "Ground Clearance", value: "5.4\"" }, { label: "Supercharging Max", value: "250 kW Max" }, { label: "Charging Speed", value: "Up to 195 miles in 15 mins" }, { label: "Basic Warranty", value: "4 years or 50,000 mi" }] },
  { name: "Performance", range: "316 mi", zeroTo60: "2.9 s", drive: "Dual Motor AWD", cargo: "24 cu ft", specs: [{ label: "Weight (Curb Mass)", value: "4,054 lbs" }, { label: "Wheels", value: "20\" Warp Wheels" }, { label: "Seating", value: "5 seats" }, { label: "Displays", value: "16\" Center / 8\" Rear" }, { label: "Ground Clearance", value: "5.0\"" }, { label: "Supercharging Max", value: "250 kW Max" }, { label: "Charging Speed", value: "Up to 147 miles in 15 mins" }, { label: "Basic Warranty", value: "4 years or 50,000 mi" }] }
];

export default function Model3Page() {
  const model = getCarModel("model-3");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSpec, setActiveSpec] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add(styles.visible);
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(`.${styles.fadeUp}`).forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  if (!model) return null;
  const currentSpec = SPEC_DATA[activeSpec];

  return (
    <div className={styles.page}>
      
      {/* 01 - HERO */}
      <section className={styles.hero}>
        {SLIDES.map((s, idx) => (
          <img key={s.id} src={s.img} alt={s.name} className={`${styles.heroImage} ${idx === currentSlide ? styles.activeImage : ""}`} />
        ))}
        <div className={styles.heroOverlay} />
        
        {SLIDES.map((s, idx) => (
          <div key={s.id} className={`${styles.heroContent} ${idx === currentSlide ? styles.active : ""}`}>
            <h1 className={styles.title}>{s.name}</h1>
            <p className={styles.subtitle}>{s.tagline}</p>
            <p className={styles.heroDesc}>{s.text}</p>
            
            <div className={styles.actions}>
              <Link href={`/apply?model=model-3`} className={styles.btnPrimary}>Order Now</Link>
              <a href="#specs" className={styles.btnSecondary}>View Specs</a>
            </div>
            
            <div className={styles.statsBar}>
              {s.stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className={`${styles.navArrow} ${styles.prev}`} onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}>&#10094;</button>
        <button className={`${styles.navArrow} ${styles.next}`} onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}>&#10095;</button>
        
        <div className={styles.dots}>
          {SLIDES.map((_, idx) => (
            <button key={idx} className={`${styles.dot} ${idx === currentSlide ? styles.activeDot : ""}`} onClick={() => setCurrentSlide(idx)} />
          ))}
        </div>
      </section>

      {/* 02 - OUR MOST AFFORDABLE */}
      <section className={`${styles.editorialSection} ${styles.fadeUp}`}>
        <div className={styles.mediaFullWidth} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Standard-Affordable-Desktop.jpg)` }} />
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Standard</p>
          <h2 className={styles.heading}>Our Most Affordable</h2>
          <p className={styles.body}>All the best features in our most affordable vehicle with the lowest cost of ownership over time.</p>
          <div className={styles.featureGrid}>
            <div><h4>Focused Design</h4><p>Prioritizes ride quality and reliability while embracing a minimalist design.</p></div>
            <div><h4>Efficient Drive</h4><p>Charging is often cheaper than filling up a gas tank. Maximizing your range.</p></div>
            <div><h4>Minimal Maintenance</h4><p>Tesla vehicles have electric motors instead of gas engines. Fewer moving parts.</p></div>
          </div>
        </div>
      </section>

      {/* 03 - MORE THAN THE BASICS */}
      <section className={`${styles.editorialSection} ${styles.darkTheme} ${styles.fadeUp}`}>
        <div className={styles.videoFullWidth}>
          <video className={styles.videoPlayer} src="/videos/Model-3-More-Than-The-Basics-Desktop-LHD-US.webm" autoPlay muted loop playsInline />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Interior</p>
          <h2 className={styles.heading}>More Than the Basics</h2>
          <p className={styles.body}>A clean and precise interior provides everything you need inside your cabin.</p>
          <div className={styles.featureGrid}>
            <div><h4>Ride With Comfort</h4><p>Get first-row heated textile seats plus a heated steering wheel.</p></div>
            <div><h4>Take Control</h4><p>Control your seat positioning using touchscreen controls.</p></div>
            <div><h4>Listen Up</h4><p>Equipped with our standard audio system consisting of seven speakers.</p></div>
          </div>
        </div>
      </section>

      {/* 04 - ALWAYS CONNECTED */}
      <section className={`${styles.editorialSection} ${styles.fadeUp}`}>
        <div className={styles.videoFullWidth}>
          <video className={styles.videoPlayer} src="/videos/Model-3-Always-Connected-Desktop-LHD-US.webm" autoPlay muted loop playsInline />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Convenience</p>
          <h2 className={styles.heading}>Always Connected</h2>
          <p className={styles.body}>Monitor, access and control your vehicle from anywhere remotely on your phone with the Tesla app.</p>
        </div>
      </section>

      {/* 05 - BUILT FOR DISTANCE */}
      <section className={`${styles.editorialSection} ${styles.darkTheme} ${styles.fadeUp}`}>
        <div className={styles.mediaFullWidth} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Premium-Distance-Desktop.jpg)` }} />
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Premium</p>
          <h2 className={styles.heading}>Built for Distance</h2>
          <p className={styles.body}>Go up to 363 miles (EPA est.) on a single charge with updated exterior styling optimized for maximum aerodynamics.</p>
        </div>
      </section>

      {/* 06 - MINIMALIST INTERIOR */}
      <section className={`${styles.editorialSection} ${styles.fadeUp}`}>
        <div className={styles.videoFullWidth}>
          <video className={styles.videoPlayer} src="/videos/Model-3-Premium-Minimalist-Interior-Desktop-LHD-US.webm" autoPlay muted loop playsInline />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Interior</p>
          <h2 className={styles.heading}>Minimalist Interior</h2>
          <p className={styles.body}>Wraparound styling cocoons you inside. Customize ambient lighting to make it your own.</p>
          <div className={styles.featureGrid}>
            <div><h4>Premium Materials</h4><p>Immerse yourself in softer, more sophisticated materials.</p></div>
            <div><h4>Sublime Sound</h4><p>Enjoy immersive sound with an audio system designed by Tesla.</p></div>
            <div><h4>Rear Display</h4><p>Rear passengers have access to an 8-inch touchscreen.</p></div>
          </div>
        </div>
      </section>

      {/* 07 - NEXT-LEVEL PERFORMANCE */}
      <section className={`${styles.editorialSection} ${styles.darkTheme} ${styles.fadeUp}`}>
        <div className={styles.videoFullWidth}>
          <video className={styles.videoPlayer} src="/videos/Model-3-Performance-Next-Level-Performance-Desktop-LHD-US.webm" autoPlay muted loop playsInline />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Performance</p>
          <h2 className={styles.heading}>Next-Level Performance</h2>
          <p className={styles.body}>Experience our latest generation Performance drive unit—the most powerful ever fitted to Model 3, enabling more than 500 horsepower and 0 to 60 mph in as little as 2.9 seconds.</p>
        </div>
      </section>

      {/* 08 - ULTRA-RESPONSIVE HANDLING */}
      <section className={`${styles.editorialSection} ${styles.fadeUp}`}>
        <div className={styles.videoFullWidth}>
          <video className={styles.videoPlayer} src="/videos/Model-3-Performance-Handling-Desktop.webm" autoPlay muted loop playsInline />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Performance</p>
          <h2 className={styles.heading}>Ultra-Responsive Handling</h2>
          <p className={styles.body}>An adaptive damping system keeps Model 3 Performance planted to the road, so you can confidently tackle corners at any speed with maximum control and comfort.</p>
        </div>
      </section>

      {/* 09 - SPECS */}
      <section className={styles.specsSection} id="specs">
        <div className={styles.specsContainer}>
          <div className={styles.specsHeader}>
            <p className={styles.eyebrow}>Specifications</p>
            <h2 className={styles.specsTitle}>Explore Model 3</h2>
          </div>

          <div className={styles.specTabs}>
            {SPEC_DATA.map((spec, idx) => (
              <button 
                key={spec.name} 
                className={`${styles.specTab} ${activeSpec === idx ? styles.activeSpecTab : ""}`}
                onClick={() => setActiveSpec(idx)}
              >
                {spec.name}
              </button>
            ))}
          </div>

          <div className={styles.activeSpecs} key={activeSpec}>
            <div className={styles.specStatsGrid}>
              <div className={styles.specStat}><span className={styles.specStatValue}>{currentSpec.range}</span><span className={styles.specStatLabel}>Range (EPA est.)</span></div>
              <div className={styles.specStat}><span className={styles.specStatValue}>{currentSpec.zeroTo60}</span><span className={styles.specStatLabel}>0-60 mph</span></div>
              <div className={styles.specStat}><span className={styles.specStatValue}>{currentSpec.drive}</span><span className={styles.specStatLabel}>Drive</span></div>
            </div>
            <Link href={`/apply?model=model-3`} className={styles.orderBtn}>Order Now</Link>
          </div>

          <div className={styles.deepSpecsTable}>
            <div className={styles.specRow}><span>Range (EPA est.)</span><span>{currentSpec.range}</span></div>
            <div className={styles.specRow}><span>Acceleration</span><span>{currentSpec.zeroTo60} 0-60 mph</span></div>
            <div className={styles.specRow}><span>Drive</span><span>{currentSpec.drive}</span></div>
            <div className={styles.specRow}><span>Cargo</span><span>{currentSpec.cargo}</span></div>
            {currentSpec.specs.map((spec) => (
              <div key={spec.label} className={styles.specRow}><span>{spec.label}</span><span>{spec.value}</span></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}