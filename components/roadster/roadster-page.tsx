"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import styles from "./roadster.module.css";

const IMG = "/roadster";

export function RoadsterPage() {
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -galleryRef.current.clientWidth : galleryRef.current.clientWidth;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.page}>

      {/* 01 - HERO */}
      <section className={styles.hero}>
        <img 
          src={`${IMG}/Roadster-01-Hero-Desktop.avif`} 
          alt="Roadster Hero" 
          className={styles.heroImg} 
        />
        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <img 
            src={`${IMG}/Roadster-Logo-Final-Desktop-Left-Aligned.avif`} 
            alt="Roadster" 
            className={styles.logoImg} 
          />
          <div className={styles.heroActions}>
            <Link href="/reserve" className={styles.btnPrimary}>RESERVE NOW</Link>
          </div>
        </div>

        <div className={styles.heroIcons}>
          <div className={styles.iconBox}>
            <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
              <g clipPath="url(#clip0_4389_24679)">
                <path d="M12 33L-7 33" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="20" cy="27" r="10" stroke="white" strokeWidth="3.5"/>
                <path d="M-6.86036 -0.112584C-7.82378 -0.189704 -8.6673 0.528782 -8.74442 1.4922C-8.82154 2.45561 -8.10305 3.29914 -7.13964 3.37626L-7 1.63184L-6.86036 -0.112584ZM31.6147 7.5722L32.9843 6.48292L32.5768 5.9705L31.933 5.8514L31.6147 7.5722ZM36.961 14.2947L35.5914 15.384C35.9234 15.8014 36.4276 16.0447 36.961 16.0447V14.2947ZM28.903 30.855L27.258 31.452L28.452 34.742L30.097 34.145L29.5 32.5L28.903 30.855ZM39.0203 28.1556L37.3352 27.6837L39.0203 28.1556ZM37.7767 29.4963L37.1797 27.8513L37.7767 29.4963ZM42.8125 14.6121L44.4977 15.0839V15.0839L42.8125 14.6121ZM-7 1.63184C-7.13964 3.37626 -7.13971 3.37625 -7.13975 3.37625C-7.13971 3.37625 -7.13971 3.37625 -7.13964 3.37626C-7.1395 3.37627 -7.13922 3.37629 -7.13879 3.37632C-7.13793 3.37639 -7.13651 3.37651 -7.13451 3.37667C-7.13052 3.37699 -7.12426 3.3775 -7.11575 3.3782C-7.09873 3.3796 -7.07271 3.38175 -7.03789 3.38468C-6.96824 3.39054 -6.86339 3.39951 -6.72485 3.41176C-6.44777 3.43626 -6.03601 3.47389 -5.50181 3.52601C-4.43336 3.63027 -2.87548 3.7925 -0.926145 4.0237C2.9734 4.48622 8.43476 5.22424 14.6753 6.32539L14.9793 4.60202L15.2834 2.87864C8.96474 1.76368 3.43642 1.01661 -0.513905 0.548065C-2.48951 0.313741 -4.07162 0.148944 -5.16191 0.0425574C-5.70709 -0.0106386 -6.1294 -0.0492392 -6.41655 -0.0746318C-6.56012 -0.0873284 -6.66992 -0.0967237 -6.7444 -0.102991C-6.78164 -0.106125 -6.81005 -0.108477 -6.82944 -0.110068C-6.83913 -0.110864 -6.84658 -0.11147 -6.85174 -0.111888C-6.85432 -0.112097 -6.85633 -0.11226 -6.85777 -0.112376C-6.85849 -0.112434 -6.85906 -0.11248 -6.8595 -0.112515C-6.85971 -0.112532 -6.85993 -0.112549 -6.86004 -0.112558C-6.86022 -0.112573 -6.86036 -0.112584 -7 1.63184ZM14.9793 4.60202L14.6753 6.32539C20.9534 7.43319 25.1103 8.1754 27.697 8.64053C28.9904 8.87309 29.8911 9.03637 30.468 9.14144C30.7565 9.19397 30.9641 9.23194 31.0992 9.25675C31.1668 9.26915 31.2163 9.27825 31.2488 9.28424C31.2651 9.28723 31.2771 9.28944 31.2849 9.2909C31.2889 9.29162 31.2918 9.29216 31.2937 9.29251C31.2946 9.29269 31.2953 9.29281 31.2958 9.2929C31.296 9.29294 31.2962 9.29297 31.2962 9.29298C31.2963 9.29299 31.2963 9.293 31.2963 9.293C31.2964 9.293 31.2963 9.293 31.6147 7.5722C31.933 5.8514 31.933 5.85139 31.9329 5.85138C31.9329 5.85137 31.9328 5.85136 31.9328 5.85135C31.9326 5.85132 31.9324 5.85128 31.9321 5.85123C31.9316 5.85113 31.9307 5.85098 31.9297 5.85078C31.9276 5.85039 31.9244 5.84981 31.9203 5.84904C31.912 5.84751 31.8995 5.84522 31.8829 5.84214C31.8495 5.836 31.7992 5.82674 31.7308 5.8142C31.594 5.7891 31.385 5.75085 31.0951 5.69806C30.5153 5.59249 29.612 5.42874 28.3164 5.19578C25.7253 4.72985 21.5645 3.98696 15.2834 2.87864L14.9793 4.60202ZM36.961 14.2947V16.0447H42.5718V14.2947V12.5447H36.961V14.2947ZM42.8125 14.6121L41.1273 14.1402L37.3352 27.6837L39.0203 28.1556L40.7055 28.6274L44.4977 15.0839L42.8125 14.6121ZM37.7767 29.4963L37.1797 27.8513L28.903 30.855L29.5 32.5L30.097 34.145L38.3737 31.1413L37.7767 29.4963ZM31.6147 7.5722L30.245 8.66148L35.5914 15.384L36.961 14.2947L38.3307 13.2054L32.9843 6.48292L31.6147 7.5722ZM39.0203 28.1556L37.3352 27.6837C37.3134 27.7614 37.2555 27.8238 37.1797 27.8513L37.7767 29.4963L38.3737 31.1413C39.511 30.7286 40.3793 29.7925 40.7055 28.6274L39.0203 28.1556ZM42.5718 14.2947V16.0447C41.5785 16.0447 40.8595 15.0967 41.1273 14.1402L42.8125 14.6121L44.4977 15.0839C44.8548 13.8086 43.8961 12.5447 42.5718 12.5447V14.2947Z" fill="white"/>
                <path d="M50.9994 3.41406H36.9604L46.6531 4.60214L49.0292 6.97828L50.9994 5.19617V3.41406Z" fill="white"/>
                <path d="M46.6531 4.60214L47.7137 3.54148L46.8356 3.11328L46.6531 4.60214ZM36.9604 3.41406V1.91406L36.7779 4.90292L36.9604 3.41406ZM50.9994 3.41406H52.4994V1.91406H50.9994V3.41406ZM50.9994 5.19617L52.0056 6.3086L52.4994 5.86197V5.19617H50.9994ZM49.0292 6.97828L47.9686 8.03894L48.9774 9.04777L50.0355 8.09071L49.0292 6.97828ZM35.5 11L36.2895 12.2754C38.6985 10.7842 41.4652 9.19681 43.6373 7.97836C44.7217 7.37007 45.6546 6.85557 46.316 6.49333C46.6467 6.31223 46.9094 6.16927 47.0891 6.07174C47.1789 6.02298 47.2481 5.98558 47.2945 5.96046C47.3178 5.9479 47.3354 5.93841 47.347 5.93211C47.3529 5.92895 47.3573 5.9266 47.3601 5.92505C47.3616 5.92428 47.3626 5.92371 47.3633 5.92334C47.3636 5.92316 47.3639 5.92303 47.364 5.92295C47.3641 5.92291 47.3641 5.92289 47.3642 5.92287C47.3642 5.92286 47.3642 5.92286 46.6531 4.60214C45.942 3.28141 45.9419 3.28144 45.9418 3.28148C45.9418 3.28151 45.9417 3.28157 45.9415 3.28163C45.9413 3.28176 45.941 3.28193 45.9406 3.28216C45.9397 3.28262 45.9385 3.28328 45.9369 3.28414C45.9337 3.28587 45.929 3.28841 45.9228 3.29175C45.9104 3.29843 45.8921 3.3083 45.8682 3.32125C45.8202 3.34714 45.7496 3.38535 45.6582 3.43496C45.4754 3.53417 45.2093 3.67898 44.875 3.86208C44.2064 4.22822 43.2645 4.74772 42.1696 5.36191C39.9831 6.58844 37.1732 8.20003 34.7105 9.7246L35.5 11ZM36.9604 3.41406V4.91406H50.9994V3.41406V1.91406H36.9604V3.41406ZM50.9994 3.41406H49.4994V5.19617H50.9994H52.4994V3.41406H50.9994ZM50.9994 5.19617L49.9932 4.08375L48.023 5.86585L49.0292 6.97828L50.0355 8.09071L52.0056 6.3086L50.9994 5.19617ZM36.9604 3.41406L36.7779 4.90292L46.4706 6.09099L46.6531 4.60214L46.8356 3.11328L37.1429 1.92521L36.9604 3.41406ZM49.0292 6.97828L50.0899 5.91762L47.7137 3.54148L46.6531 4.60214L45.5924 5.6628L47.9686 8.03894L49.0292 6.97828Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_4389_24679">
                  <rect width="56" height="56" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span>Active Aero</span>
          </div>
          
          <div className={styles.iconBox}>
            <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
              <path d="M32.7612 10.7305C32.8597 11.1554 32.9829 11.6867 33.1216 12.3057C33.5002 13.9957 34.0048 16.3342 34.5093 18.9268C35.4054 23.5323 36.2772 28.8288 36.4722 32.7305L19.5542 32.7305C19.7492 28.8288 20.621 23.5323 21.5171 18.9268C22.0215 16.3342 22.5261 13.9957 22.9048 12.3057C23.0435 11.6867 23.1667 11.1554 23.2651 10.7305L32.7612 10.7305Z" stroke="white" strokeWidth="3"/>
              <path d="M17.9868 2.7041L37.9868 2.7041C37.9868 2.7041 33.9868 5.1486 33.9868 6.7041L22.1001 6.7041C22.1001 5.1486 17.9868 2.7041 17.9868 2.7041Z" fill="white"/>
              <path d="M19.5 41.9727C19.5 42.2488 19.2761 42.4727 19 42.4727C18.7239 42.4727 18.5 42.2488 18.5 41.9727L18.5 38.7305C18.5 38.4543 18.7239 38.2305 19 38.2305C19.2761 38.2305 19.5 38.4543 19.5 38.7305L19.5 41.9727Z" fill="#606060"/>
              <path d="M24 46.2662C24 46.7987 23.6642 47.2305 23.25 47.2305C22.8358 47.2305 22.5 46.7987 22.5 46.2662L22.5 39.1948C22.5 38.6622 22.8358 38.2305 23.25 38.2305C23.6642 38.2305 24 38.6622 24 39.1948L24 46.2662Z" fill="#B0B0B0"/>
              <path d="M29 52.0519C29 52.7028 28.5523 53.2305 28 53.2305C27.4477 53.2305 27 52.7028 27 52.0519L27 39.409C27 38.7581 27.4477 38.2305 28 38.2305C28.5523 38.2305 29 38.7581 29 39.409L29 52.0519Z" fill="white"/>
              <path d="M33.5 46.2759C33.4999 46.803 33.1641 47.2305 32.75 47.2305C32.3359 47.2305 32.0001 46.803 32 46.2759L32 39.185C32 38.6578 32.3358 38.2305 32.75 38.2305C33.1642 38.2305 33.5 38.6578 33.5 39.185L33.5 46.2759Z" fill="#B0B0B0"/>
              <path d="M37.5 41.9727C37.5 42.2488 37.2761 42.4727 37 42.4727C36.7239 42.4727 36.5 42.2488 36.5 41.9727L36.5 38.7305C36.5 38.4543 36.7239 38.2305 37 38.2305C37.2761 38.2305 37.5 38.4543 37.5 38.7305L37.5 41.9727Z" fill="#606060"/>
            </svg>
            <span>Cold-Gas Thrusters</span>
          </div>
          
          <div className={styles.iconBox}>
            <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
              <path d="M49 24C49 12.402 39.598 3 28 3C16.402 3 7 12.402 7 24C7 35.598 16.402 45 28 45C39.598 45 49 35.598 49 24ZM50 24C50 36.1503 40.1503 46 28 46C15.8497 46 6 36.1503 6 24C6 11.8497 15.8497 2 28 2C40.1503 2 50 11.8497 50 24Z" fill="white"/>
              <path d="M24.3896 31.2068C25.4712 31.747 26.6905 32.0526 27.9817 32.0526C28.1229 32.0526 28.2633 32.0485 28.4028 32.0413L27.1236 41C27.1236 41 24.4394 40.9999 22.2026 39.6579C19.9657 38.3158 20.4131 35.1842 20.4131 35.1842L24.3896 31.2068Z" fill="white"/>
              <path d="M39.4009 36.6408C39.379 36.6626 37.4884 38.5421 34.9727 39.1712C32.453 39.8011 30.56 37.2953 30.5435 37.2734V31.6341C31.8718 31.1885 33.0458 30.408 33.9635 29.3903L39.4009 36.6408Z" fill="white"/>
              <path d="M20.3414 26.5435C20.7854 27.8777 21.5673 29.0569 22.5879 29.9783L15.3592 35.4009C15.3592 35.4009 13.4615 33.5025 12.8288 30.9718C12.1987 28.4508 14.7076 26.5579 14.7266 26.5435H20.3414Z" fill="white"/>
              <path d="M45 24.8764C45 24.8764 45 27.5606 43.6579 29.7974C42.3161 32.0338 39.1842 31.5869 39.1842 31.5869L35.1885 27.5912C35.7284 26.5098 36.0343 25.2909 36.0343 24C36.0343 23.8637 36.0305 23.7283 36.0238 23.5937L45 24.8764Z" fill="white"/>
              <path d="M12.3421 18.2026C13.6837 15.9665 16.8136 16.4128 16.8158 16.4131L20.7862 20.3835C20.2385 21.471 19.929 22.6992 19.929 24C19.929 24.1342 19.9321 24.2676 19.9386 24.4002L11 23.1236C11 23.1236 11 20.4394 12.3421 18.2026Z" fill="white"/>
              <path d="M40.6408 12.5991C40.6681 12.6265 42.5431 14.5152 43.1712 17.0273C43.8024 19.5523 41.2849 21.4478 41.2734 21.4565H35.6219C35.1801 20.1289 34.4044 18.9542 33.3911 18.0348L40.6408 12.5991Z" fill="white"/>
              <path d="M21.0273 8.82879C23.558 8.19612 25.4565 10.7266 25.4565 10.7266V16.3528C24.1229 16.7929 22.9423 17.57 22.0191 18.5861L16.5991 11.3592C16.621 11.3373 18.5115 9.45783 21.0273 8.82879Z" fill="white"/>
              <path d="M28.8764 7C28.8764 7 31.5606 7 33.7974 8.34211C36.0343 9.68421 35.5869 12.8158 35.5869 12.8158L31.5973 16.8045C30.5099 16.2571 29.2821 15.9474 27.9817 15.9474C27.8525 15.9474 27.724 15.951 27.5963 15.957L28.8764 7Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M27.9816 19.5263C30.4523 19.5263 32.4553 21.5293 32.4553 24C32.4553 26.4708 30.4523 28.4737 27.9816 28.4737C25.5108 28.4737 23.5079 26.4708 23.5079 24C23.5079 21.5293 25.5108 19.5263 27.9816 19.5263ZM27.9816 21.3158C26.4991 21.3158 25.2974 22.5176 25.2974 24C25.2974 25.4825 26.4991 26.6842 27.9816 26.6842C29.464 26.6842 30.6658 25.4825 30.6658 24C30.6658 22.5176 29.464 21.3158 27.9816 21.3158Z" fill="white"/>
            </svg>
            <span>Multi-Mode Suction System</span>
          </div>
        </div>
      </section>

      {/* 02 - PILOT */}
      <section className={styles.splitSection}>
        <div className={styles.splitText}>
          <p className={styles.eyebrow}>02 - Pilot</p>
          <h2>A True Pilot&rsquo;s Car</h2>
          <p>Roadster can perform at levels unlike any other production car. It goes beyond Plaid to unlock an entirely new dimension of driving. It challenges the limits of design, engineering and physics to deliver an expertly crafted extra-terrestrial vehicle.</p>
        </div>
        <div className={styles.splitImage}>
          <div className={`${styles.bg} ${styles.bright}`} style={{ backgroundImage: `url(${IMG}/Roadster-02-Pilot-Desktop.avif)`, backgroundPosition: "right center" }} />
          <div className={styles.imageFadeLeft} />
        </div>
      </section>

      {/* 03 - GALLERY */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryHeader}>
          <p className={styles.eyebrow}>03 - Design</p>
          <h2>Form follows function.</h2>
        </div>
        
        <div className={styles.galleryWrapper}>
          <button className={`${styles.galleryArrow} ${styles.galleryArrowLeft}`} onClick={() => scrollGallery("left")}>&#10094;</button>
          
          <div className={styles.galleryGrid} ref={galleryRef}>
            <div className={styles.gridItem} style={{ backgroundImage: `url(${IMG}/Roadster-03-Carousel-Slide-1-Desktop.avif)` }} />
            <div className={styles.gridItem} style={{ backgroundImage: `url(${IMG}/Roadster-03-Carousel-Slide-2-Desktop.avif)` }} />
            <div className={styles.gridItem} style={{ backgroundImage: `url(${IMG}/Roadster-03-Carousel-Slide-3-Desktop.avif)` }} />
            <div className={styles.gridItem} style={{ backgroundImage: `url(${IMG}/Roadster-03-Carousel-Slide-4-Desktop.avif)` }} />
            <div className={styles.gridItem} style={{ backgroundImage: `url(${IMG}/Roadster-03-Carousel-Slide-5-Desktop.avif)` }} />
            <div className={styles.gridItem} style={{ backgroundImage: `url(${IMG}/Roadster-06-Gravity-Desktop.avif)` }} />
          </div>
          
          <button className={`${styles.galleryArrow} ${styles.galleryArrowRight}`} onClick={() => scrollGallery("right")}>&#10095;</button>
        </div>
      </section>

      {/* 04 - WORLD */}
      <section className={`${styles.splitSection} ${styles.reverse}`}>
        <div className={styles.splitImage}>
          <div className={`${styles.bg} ${styles.bright}`} style={{ backgroundImage: `url(${IMG}/Roadster-04-World-Desktop.avif)`, backgroundPosition: "left center" }} />
          <div className={styles.imageFadeRight} />
        </div>
        <div className={styles.splitText}>
          <p className={styles.eyebrow}>04 - World</p>
          <h2>Out of This World</h2>
          <p>We already put Roadster in a rocket. Now we put a rocket in Roadster. We created a vehicle capable of next-level performance. Additional SpaceX components can transform that road performance into a truly revolutionary experience.</p>
        </div>
      </section>

      {/* 05 - GRAPH */}
      <section className={styles.splitSection}>
        <div className={styles.splitText}>
          <p className={styles.eyebrow}>05 - Physics</p>
          <h2>Beyond The Limits of Physics</h2>
          <p>Our multi-mode fan and ground sealing system acts as a downforce generator, pulling air out from beneath the vehicle. This provides enough suction to hold the vehicle upside down, even when stationary.</p>
        </div>
        <div className={styles.splitImage}>
          <div className={`${styles.bg} ${styles.bright}`} style={{ backgroundImage: `url(${IMG}/Roadster-05-Graph-Desktop.avif)`, backgroundPosition: "right center" }} />
          <div className={styles.imageFadeLeft} />
        </div>
      </section>

      {/* 06 - AUGMENTS */}
      <section className={styles.specsSection} id="specs">
        <div className={styles.specsBg} style={{ backgroundImage: `url(${IMG}/Roadster-07-Augments-Desktop.avif)` }} />
        <div className={styles.specsContent}>
          <div className={styles.specsHeader}>
            <p className={styles.eyebrow}>06 - Augments</p>
            <h2>Performance by Reservation</h2>
            <p className={styles.specsDesc}>Road ready with seating for two. Features active aerodynamics and a multi-mode suction system that maximizes downforce for next-level performance on and off the track.</p>
          </div>
          <div className={styles.tierGrid}>
            <div className={styles.tierCard}>
              <h3>Thrust</h3>
              <p className={styles.tierBadge}>Limited Release</p>
              <p className={styles.tierText}>Race ready with seating for two. Features a multi-mode suction system paired with cold-gas thrusters in the rear of the vehicle that propel Roadster from 0-60 in under 1 second.</p>
            </div>
            <div className={styles.tierCard}>
              <h3>Rocket</h3>
              <p className={styles.tierBadge}>Invite Only</p>
              <p className={styles.tierText}>Air ready with seating for one. Features a multi-mode suction system paired with cold-gas thrusters positioned around the perimeter of the vehicle that support forward and upward acceleration as well as lateral rotational movement. So yes, it can fly.</p>
              <p className={styles.tierNote}>* Not approved for public road use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 - END IMAGE */}
      <section className={styles.endImageSection}>
        <div className={styles.bg} style={{ backgroundImage: `url(${IMG}/Roadster-08-End-Desktop.avif)` }} />
        <div className={styles.imageFadeBottom} />
      </section>

      {/* 08 - END TEXT */}
      <section className={styles.endTextSection}>
        <Link href="/reserve" className={styles.btnOutline}>RESERVE NOW</Link>
        <div className={styles.legalText}>
          <p>1 Available with the Rocket trim only, which is not available in all regions.</p>
          <p>The features and specifications indicated on this page are reflective of our Thrust augment only and are available as an optional upgrade.</p>
        </div>
        <div className={styles.footer}>
          Tesla (c) 2026 &nbsp;&nbsp;&nbsp; Privacy & Legal
        </div>
      </section>
    </div>
  );
}