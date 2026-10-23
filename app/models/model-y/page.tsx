"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getCarModel } from "@/data/models";
import styles from "./model-y.module.css";

const SLIDES = [
  { id: "standard", name: "Model Y", tagline: "Electric Midsize SUV", text: "2.49% APR Available", img: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Hero-Desktop-US.jpg", stats: [{ label: "Range (EPA est.)", value: "321 mi" }, { label: "0-60 mph", value: "6.8 s" }, { label: "Cargo Space", value: "74 cu ft" }] },
  { id: "premium", name: "Model Y Premium", tagline: "Elevated Performance", text: "2.49% APR Available", img: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Premium-Hero-Desktop-NA.jpg", stats: [{ label: "Range (EPA est.)", value: "327 mi" }, { label: "0-60 mph", value: "4.3 s" }, { label: "Cargo Space", value: "76 cu ft" }] },
  { id: "performance", name: "Model Y Performance", tagline: "Ultimate Speed", text: "3.99% APR Available", img: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Performance-Hero-Desktop-NA.jpg", stats: [{ label: "Range (EPA est.)", value: "306 mi" }, { label: "0-60 mph", value: "3.3 s" }, { label: "Cargo Space", value: "76 cu ft" }] },
  { id: "lpremium", name: "Model Y L Premium", tagline: "Long Wheelbase", text: "Starting at $61,990", img: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-L-Hero-Desktop-NA.jpg", stats: [{ label: "Range (EPA est.)", value: "332 mi" }, { label: "0-60 mph", value: "4.4 s" }, { label: "Cargo Space", value: "89 cu ft" }] },
];

const SPEC_DATA = [
  { name: "Standard", range: "321 mi", zeroTo60: "6.8 s", drive: "Rear-Wheel Drive", cargo: "74 cu ft", specs: [{ label: "Weight (Curb Mass)", value: "4,061 lbs" }, { label: "Wheels", value: "18\" or 19\"" }, { label: "Seating", value: "5 seats" }, { label: "Displays", value: "16\" Center Touchscreen" }, { label: "Ground Clearance", value: "6.4\"" }, { label: "Supercharging Max", value: "225 kW Max; Pay Per Use" }, { label: "Charging Speed", value: "Up to 160 miles added in 15 minutes" }, { label: "Basic Vehicle Warranty", value: "4 years or 50,000 mi" }] },
  { name: "Premium", range: "327 mi", zeroTo60: "4.3 s", drive: "Dual Motor AWD", cargo: "76 cu ft", specs: [{ label: "Weight (Curb Mass)", value: "4,473 lbs" }, { label: "Wheels", value: "19\" or 20\"" }, { label: "Seating", value: "Up to 7 seats" }, { label: "Displays", value: "16\" Center / 8\" Rear" }, { label: "Ground Clearance", value: "6.6\"" }, { label: "Supercharging Max", value: "250 kW Max; Pay Per Use" }, { label: "Charging Speed", value: "Up to 169 miles added in 15 minutes" }, { label: "Basic Vehicle Warranty", value: "4 years or 50,000 mi" }] },
  { name: "Performance", range: "306 mi", zeroTo60: "3.3 s", drive: "Dual Motor AWD", cargo: "76 cu ft", specs: [{ label: "Weight (Curb Mass)", value: "4,466 lbs" }, { label: "Wheels", value: "21\"" }, { label: "Seating", value: "5 seats" }, { label: "Displays", value: "16\" Center / 8\" Rear" }, { label: "Ground Clearance", value: "6\"" }, { label: "Supercharging Max", value: "250 kW Max; Pay Per Use" }, { label: "Charging Speed", value: "Up to 144 miles added in 15 minutes" }, { label: "Basic Vehicle Warranty", value: "4 years or 50,000 mi" }] },
  { name: "L Premium", range: "332 mi", zeroTo60: "4.4 s", drive: "Dual Motor AWD", cargo: "89 cu ft", specs: [{ label: "Weight (Curb Mass)", value: "4,612 lbs" }, { label: "Wheels", value: "19\" or 20\"" }, { label: "Seating", value: "Up to 6 seats" }, { label: "Displays", value: "16\" Center / 8\" Second-Row" }, { label: "Ground Clearance", value: "6.7\"" }, { label: "Supercharging Max", value: "250 kW Max; Pay Per Use" }, { label: "Charging Speed", value: "Up to 172 miles added in 15 minutes" }, { label: "Basic Vehicle Warranty", value: "4 years or 50,000 mi" }] }
];

export default function ModelYPage() {
  const model = getCarModel("model-y");
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
  const slide = SLIDES[currentSlide];
  const currentSpec = SPEC_DATA[activeSpec];

  return (
    <div className={styles.page}>
      
      {/* 01 - MASTER SLIDESHOW HERO */}
      <section className={styles.hero}>
        {SLIDES.map((s, idx) => (
          <img key={s.id} src={s.img} alt={s.name} className={`${styles.heroImage} ${idx === currentSlide ? styles.activeImage : ""}`} />
        ))}
        <div className={styles.heroOverlay} />
        
        {/* TEXT LAYERS */}
        {SLIDES.map((s, idx) => (
          <div key={s.id} className={`${styles.heroContent} ${idx === currentSlide ? styles.active : ""}`}>
            <h1 className={styles.title}>{s.name}</h1>
            <p className={styles.subtitle}>{s.tagline}</p>
            <p className={styles.heroDesc}>{s.text}</p>
            <div className={styles.actions}>
              <Link href={`/apply?model=model-y`} className={styles.btnPrimary}>Order Now</Link>
              <a href="#specs" className={styles.btnSecondary}>View Specs</a>
            </div>
          </div>
        ))}

        {/* STATS LAYERS */}
        {SLIDES.map((s, idx) => (
          <div key={`stats-${s.id}`} className={`${styles.statsBar} ${idx === currentSlide ? styles.active : ""}`}>
            {s.stats.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
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

      {/* 02 - SCULPTED EXTERIOR */}
      <section className={`${styles.editorialSection} ${styles.fadeUp}`}>
        <div className={styles.mediaFullWidth} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Premium-Exterior-Desktop-NA.jpg)` }} />
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Exterior</p>
          <h2 className={styles.heading}>Sculpted Exterior</h2>
          <p className={styles.body}>Every angle of the exterior is designed with precision for aesthetics and aerodynamics. The front fascia features sleek, clean lines for a strong front profile.</p>
          <div className={styles.featureGrid}>
            <div><h4>Clean Lines</h4><p>The front fascia features sleek, clean lines for a strong front profile.</p></div>
            <div><h4>Smooth Ride</h4><p>Suspension, wheels and tires work together to create a smooth drive. Active and passive sound damping insulate the cabin.</p></div>
            <div><h4>Distinctive Lighting</h4><p>Our single, cross-car lamp is the first indirect reflective body panel taillight of its kind.</p></div>
          </div>
        </div>
      </section>

      {/* 03 - PREMIUM COMFORT */}
      <section className={`${styles.editorialSection} ${styles.darkTheme} ${styles.fadeUp}`}>
        <div className={styles.videoFullWidth}>
          <video src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-Y-Premium-Comfort-Desktop-NA.mp4" poster="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Premium-Comfort-Desktop-NA-Poster.jpg" autoPlay muted loop playsInline />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Interior</p>
          <h2 className={styles.heading}>Premium Comfort</h2>
          <p className={styles.body}>A spacious cabin seats up to seven comfortably under an all-glass roof. Premium materials, advanced features and wraparound ambient lighting create an immersive cabin environment.</p>
          <div className={styles.featureGrid}>
            <div><h4>Comfort From Any Seat</h4><p>Front and rear touchscreens make all your climate and entertainment settings easily accessible. HEPA filtration improves air quality.</p></div>
            <div><h4>Immersive Soundscape</h4><p>Step inside, close the door and experience the vast silence offered by specially engineered acoustic glass.</p></div>
            <div><h4>Fully Connected</h4><p>Calls come in clear. Data downloads fast. Doors and trunks unlock when you approach.</p></div>
          </div>
        </div>
      </section>

      {/* 04 - EXPANSIVE STORAGE */}
      <section className={`${styles.editorialSection} ${styles.fadeUp}`}>
        <div className={styles.videoFullWidth}>
          <video src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-Y-Premium-Storage-Desktop-NA-7-Seater.mp4" poster="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Premium-Storage-Desktop-NA-7-Seater-Poster.jpg" autoPlay muted loop playsInline />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Utility</p>
          <h2 className={styles.heading}>Expansive Storage</h2>
          <p className={styles.body}>With 76 cubic feet of storage space, you can fit up to seven plus everything they need to bring along. A hands-free trunk automatically unlocks as you approach so you can easily load bags, groceries, sporting equipment and more.</p>
        </div>
      </section>

      {/* 05 - THE FUTURE OF TRAVEL (Autonomous) */}
      <section className={`${styles.editorialSection} ${styles.darkTheme} ${styles.fadeUp}`}>
        <div className={styles.videoFullWidth}>
          <video src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-Y-Premium-Autonomous-Desktop-NA-V2.mp4" poster="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Premium-Autonomous-Desktop-NA-Poster-V2.jpg" autoPlay muted loop playsInline />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Autopilot</p>
          <h2 className={styles.heading}>The Future of Travel Is Autonomous</h2>
          <p className={styles.body}>Equipped with active safety features including Automatic Emergency Braking when obstacles get too close and Lane Departure Avoidance to keep you in your lane. Upgrade to Full Self-Driving (Supervised) to unlock more features.</p>
          <div className={styles.featureGrid}>
            <div><h4>Full Self-Driving</h4><p>A suite of advanced driver-assistance features designed to provide more active guidance.</p></div>
            <div><h4>Front-Facing Cameras</h4><p>Enhanced visibility for greater safety, easier parking and driver-assistance features.</p></div>
            <div><h4>Blind Spot Monitoring</h4><p>Illuminated warning lights and on-screen visualizations help you safely check your surroundings.</p></div>
          </div>
        </div>
      </section>

      {/* 06 - SAFETY */}
      <section className={`${styles.editorialSection} ${styles.fadeUp}`}>
        <div className={styles.mediaFullWidth} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Premium-Safety-Desktop-NA.jpg)` }} />
        <div className={styles.textContainer}>
          <p className={styles.eyebrow}>Safety</p>
          <h2 className={styles.heading}>Engineered for Your Safety</h2>
          <p className={styles.body}>Safety at Tesla is paramount. Every Tesla vehicle is designed with impact-absorbing zones, a stiff passenger compartment to minimize intrusion and multiple airbags to help protect occupants. Active safety features can help reduce impact severity or help prevent accidents altogether.</p>
        </div>
      </section>

      {/* 07 - SPECS CONFIGURATOR */}
      <section className={styles.specsSection} id="specs">
        <div className={styles.specsContainer}>
          <div className={styles.specsHeader}>
            <p className={styles.eyebrow}>Specifications</p>
            <h2 className={styles.specsTitle}>Explore Model Y</h2>
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
            <Link href={`/apply?model=model-y`} className={styles.orderBtn}>Order Now</Link>
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