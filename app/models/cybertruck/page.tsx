"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./cybertruck.module.css";
import { getCarModel } from "@/data/models";

export default function CybertruckPage() {
  const model = getCarModel("cybertruck");
  const [activeSpecTab, setActiveSpecTab] = useState(0);

  if (!model) return null;

  return (
    <div className={styles.page}>
      
      {/* 01 - HERO */}
      <section className={styles.hero}>
        <div className={styles.heroImage} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Hero-Desktop-NA-SA-APAC.png)` }} />
        <div className={styles.heroContent}>
          <img src="/cybertruck/cybertrucklogo.svg" alt="Cybertruck" className={styles.heroLogoImage} />
          <p className={styles.leasePrice}>Lease From $1,129/mo</p>
          <div className={styles.heroActions}>
            <Link href="/apply?model=cybertruck" className={styles.btnBlue}>Order Now</Link>
          </div>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>5-Star</span>
            <span className={styles.statLabel}>Safety Rating<sup>1</sup></span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>325<small>mi</small></span>
            <span className={styles.statLabel}>Range (EPA est.)<sup>2</sup></span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>6'x4'</span>
            <span className={styles.statLabel}>Bed</span>
          </div>
        </div>
        <p className={styles.heroLegal}>Images shown depict Cybertruck Premium AWD with optional upgrades.</p>
      </section>

      {/* 02 - VIDEO: REDEFINING */}
      <section className={styles.mediaSection}>
        <div className={styles.mediaWrapper}>
          <video 
            className={styles.videoPlaceholder} 
            src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Cybertruck-Redefining-Desktop-v2.mp4" 
            autoPlay muted loop playsInline
          />
        </div>
        <div className={styles.textContainer}>
          <h2>Redefining the Pickup Truck</h2>
          <p>Whatever the task, terrain or weather - Cybertruck is engineered to do it all.</p>
        </div>
      </section>

      {/* 03 - 3 COLUMN GRID */}
      <section className={styles.grid3Col}>
        <div className={styles.card}>
          <div className={styles.cardImage} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Safety-Carousel-Slide-1-FSD-Desktop.jpg)` }} />
          <h3>Full Self-Driving (Supervised)</h3>
          <p>A suite of advanced driver-assistance features designed to provide more active guidance and assisted driving under your active supervision.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardImage} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Safety-Carousel-Slide-2-Safety-Desktop.jpg)` }} />
          <h3>Engineered for Your Safety</h3>
          <p>Active safety features can help reduce impact severity or help prevent accidents altogether. Forward Collision Warning, Active Emergency Braking and Lane Departure Avoidance come standard.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardImage} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Safety-Carousel-Slide-3-Protect-Desktop.jpg)` }} />
          <h3>Protect Your Truck</h3>
          <p>Enable Sentry Mode to monitor your unattended truck and automatically activate the alarm, increase touchscreen brightness and play music at max volume.</p>
        </div>
      </section>

      {/* 04 - VIDEO: BRING IT ALL */}
      <section className={styles.mediaSection}>
        <div className={styles.mediaWrapper}>
          <video 
            className={styles.videoPlaceholder} 
            src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Cybertruck-Redefining-Carousel-Slide-1-Bring-Desktop-v2.mp4" 
            autoPlay muted loop playsInline
          />
        </div>
        <div className={styles.textContainer}>
          <h2>Bring It All</h2>
          <p>Weekend road trips, outdoor adventures or a day at the job site - with up to 120 cubic feet of cargo space, you can bring along everything you need. Second-row seat cushions fold up for even more storage.</p>
        </div>
      </section>

      {/* 05 - VIDEO: TOUGH ON THE OUTSIDE */}
      <section className={styles.mediaSection}>
        <div className={styles.mediaWrapper}>
          <video 
            className={styles.videoPlaceholder} 
            src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Cybertruck-InsideOutside-Desktop-v2.mp4" 
            autoPlay muted loop playsInline
          />
        </div>
        <div className={styles.textContainer}>
          <h2>Tough on the Outside, Comfortable on the Inside</h2>
          <p>Stainless-steel exterior, premium interior.<sup>3</sup></p>
        </div>
      </section>

      {/* 06 - 2 COLUMN GRID */}
      <section className={styles.grid2Col}>
        <div className={styles.card}>
          <div className={styles.cardImage} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-InsideOutside-Carousel-Slide-1-Ready-Desktop-v2.jpg)` }} />
          <h3>Ready When You Are</h3>
          <p>With driver profiles, your Cybertruck will automatically adjust your seat and wheel position to your preferences.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardImage} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-InsideOutside-Carousel-Slide-2-Enter-Desktop.jpg)` }} />
          <h3>Enter Another World</h3>
          <p>Adaptive suspension can lower the entry height for easy access when you get in. Close the doors and enjoy the quiet cabin.</p>
        </div>
      </section>

      {/* 07 - VIDEO: TAKE ON ANY TERRAIN */}
      <section className={styles.mediaSection}>
        <div className={styles.mediaWrapper}>
          <video 
            className={styles.videoPlaceholder} 
            src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Cybertruck-Terrain-Desktop.mp4" 
            autoPlay muted loop playsInline
          />
        </div>
        <div className={styles.textContainer}>
          <h2>Take on Any Terrain</h2>
          <p>For city driving and off-roading, adapt your driving style to match your task or terrain. Drive modes are designed to be versatile and reliable, so you can go anywhere.</p>
        </div>
      </section>

      {/* 08 - 3 COLUMN TEXT */}
      <section className={styles.grid3ColText}>
        <div>
          <h3>Slippery Surface</h3>
          <p>Designed for when you lose traction in snowy, rocky or muddy conditions.</p>
        </div>
        <div>
          <h3>Overland Mode</h3>
          <p>Designed for precision driving when off-roading on a variety of surfaces, from gravel to deep snow.</p>
        </div>
        <div>
          <h3>Wade Mode</h3>
          <p>Designed to help you navigate tire-high waters by raising the ride height and pressurizing the battery pack.<sup>3</sup></p>
        </div>
      </section>

      {/* 09 - VIDEO: AUTONOMOUS */}
      <section className={styles.mediaSection}>
        <div className={styles.mediaWrapper}>
          <video 
            className={styles.videoPlaceholder} 
            src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Cybertruck-Autonomous-Desktop.mp4" 
            autoPlay muted loop playsInline
          />
        </div>
        <div className={styles.textContainer}>
          <h2>The Future of Travel Is Autonomous</h2>
          <p>Cybertruck is available with Full Self-Driving (Supervised), a suite of advanced driver-assistance features designed to provide more active guidance and assisted driving under your active supervision.</p>
        </div>
      </section>

      {/* 10 - VIDEO: SAFETY */}
      <section className={styles.safetySection}>
        <div className={styles.safetyVideoWrapper}>
          <video 
            className={styles.videoPlaceholder} 
            src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Cybertruck-Safety-Desktop-v3.mp4" 
            autoPlay muted loop playsInline
          />
        </div>
        <div className={styles.safetyText}>
          <h2>Designed to Be the Safest Truck on the Road</h2>
          <p>With a low center of gravity, impact-absorbing castings and the lowest probability of rollover for any truck tested by NHTSA, Cybertruck has earned a five-star overall safety rating.<sup>1</sup> <a href="#">Learn More</a></p>
          <div className={styles.stars}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p className={styles.ratingText}>Overall NHTSA Safety Rating</p>
        </div>
      </section>

      {/* 11 - POWERSHARE */}
      <section className={styles.powerShareSection}>
        <div className={styles.powerImage} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Powershare-Desktop.jpg)` }} />
        <div className={styles.powerText}>
          <h2>Power Anything With Cybertruck</h2>
          <p><strong>Powershare</strong> allows you to draw up to 11.5 kW of continuous power directly from your truck's 123 kWh battery. Home backup requires Powershare Gateway and Universal Wall Connector or Powerwall with Wall Connector. No additional hardware is needed to use onboard outlets.</p>
        </div>
      </section>

      {/* 12 - SPECS */}
      <section className={styles.specsSection} id="specs">
        <div className={styles.specsContainer}>
          <div className={styles.specsHeader}>
            <h2 className={styles.specsTitle}>CYBERTRUCK <span>Specs</span></h2>
            
            <div className={styles.specsTabs}>
              {model.trims.map((trim, idx) => (
                <button 
                  key={trim.name} 
                  className={`${styles.specTab} ${activeSpecTab === idx ? styles.specTabActive : ""}`}
                  onClick={() => setActiveSpecTab(idx)}
                >
                  {trim.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.specsGrid}>
            <div className={styles.specsLeft}>
              <div className={styles.specGroup}>
                <h4>Performance</h4>
                <div className={styles.specRow}><span>Range (est.)</span><span>{model.trims[activeSpecTab].range}</span></div>
                <div className={styles.specRow}><span>Acceleration</span><span>{model.trims[activeSpecTab].acceleration} 0-60 mph</span></div>
                <div className={styles.specRow}><span>Drive</span><span>All-Wheel Drive</span></div>
                <div className={styles.specRow}><span>Top Speed</span><span>{model.trims[activeSpecTab].topSpeed}</span></div>
                <div className={styles.specRow}><span>Towing</span><span>11,000 lbs</span></div>
              </div>

              <div className={styles.specGroup}>
                <h4>Dimensions</h4>
                <div className={styles.specRow}><span>Weight</span><span>6,843 lbs</span></div>
                <div className={styles.specRow}><span>Cargo</span><span>120.7 cu ft</span></div>
                <div className={styles.specRow}><span>Wheels</span><span>20"</span></div>
                <div className={styles.specRow}><span>Seating</span><span>5 seats</span></div>
                <div className={styles.specRow}><span>Displays</span><span>18.5" Center Touchscreen<br/>9.4" Rear Touchscreen</span></div>
                <div className={styles.specRow}><span>Ground Clearance</span><span>16" in Extract Mode</span></div>
                <div className={styles.specRow}><span>Overall Width</span><span>Folded mirrors: 86.6"</span></div>
                <div className={styles.specRow}><span>Overall Height</span><span>70.6"</span></div>
                <div className={styles.specRow}><span>Overall Length</span><span>223.7"</span></div>
              </div>
            </div>
            
            <div className={styles.specsRight}>
              <div className={styles.specsImage} />
            </div>
          </div>
        </div>
      </section>

      {/* 13 - FOOTER HERO */}
      <section className={styles.footerHero}>
        <div className={styles.heroImage} style={{ backgroundImage: `url(https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-End-of-Page-Desktop-NA-v2.png)` }} />
        <div className={styles.heroContent}>
          <img src="/cybertruck/cybertrucklogo.svg" alt="Cybertruck" className={styles.heroLogoImage} />
          <div className={styles.heroActions}>
            <Link href="/apply?model=cybertruck" className={styles.btnBlue}>Order Now</Link>
          </div>
        </div>
      </section>

    </div>
  );
}