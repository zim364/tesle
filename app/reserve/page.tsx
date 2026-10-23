"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./reserve.module.css";

const TIERS = [
  { id: "performance", name: "Performance", deposit: 50000, desc: "Road-ready base model." },
  { id: "thrust", name: "Thrust", deposit: 250000, desc: "Equipped with cold-gas thrusters." },
  { id: "rocket", name: "Rocket", deposit: 0, desc: "Invitation only. Not street legal." }
];

export default function ReservePage() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", country: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2500);
  };

  const handleDownload = async () => {
    const element = document.getElementById("certificate");
    if (!element) return;
    const html2pdf = (await import("html2pdf.js")).default;
    // @ts-ignore
    html2pdf().set({
      margin: 0.5,
      filename: "Tesla_Roadster_Reservation.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#050505" },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    }).from(element).save();
  };

  // PROCESSING SCREEN
  if (isProcessing) {
    return (
      <div className={styles.processingScreen}>
        <div className={styles.loader}></div>
        <h2 className={styles.processingTitle}>Securing Your Reservation</h2>
        <p className={styles.processingDesc}>Processing encrypted allocation request...</p>
      </div>
    );
  }

  // SUCCESS / CERTIFICATE SCREEN
  if (step === 2) {
    return (
      <div className={styles.certificatePage}>
        <div className={styles.certificateWrapper}>
          
          <div className={styles.certificate} id="certificate">
            <div className={styles.certHeader}>
              <img src="/roadster/Roadster-Logo-Final-Desktop-Left-Aligned.avif" alt="Roadster" className={styles.certLogo} />
              <p className={styles.certRef}>REF: RD-2026-001</p>
            </div>
            
            <div className={styles.certBody}>
              <p className={styles.certEyebrow}>Official Reservation Certificate</p>
              <h1 className={styles.certTitle}>Roadster {selectedTier.name}</h1>
              
              <div className={styles.certDetails}>
                <div className={styles.certRow}><span>Reserved For</span><span>{formData.firstName} {formData.lastName}</span></div>
                <div className={styles.certRow}><span>Email</span><span>{formData.email}</span></div>
                <div className={styles.certRow}><span>Region</span><span>{formData.country}</span></div>
                <div className={styles.certRow}><span>Deposit Due</span><span>${selectedTier.deposit.toLocaleString()}</span></div>
              </div>

              <p className={styles.certLegal}>
                This certificate confirms your place in the reservation queue for the Next-Generation Tesla Roadster. A Tesla Advisor will contact you to finalize the deposit and delivery details. This document is non-transferable.
              </p>
            </div>
          </div>

          <div className={styles.certActions}>
            <button onClick={handleDownload} className={styles.btnGold}>Download Certificate (PDF)</button>
            <Link href="/" className={styles.btnOutline}>Return to Home</Link>
          </div>

        </div>
      </div>
    );
  }

  // MAIN FORM
  return (
    <div className={styles.page}>
      
      {/* LEFT: CINEMATIC IMAGE */}
      <div className={styles.visualSection}>
        <div className={styles.bgImage} />
        <div className={styles.overlay} />
        <div className={styles.visualContent}>
          <Link href="/models/roadster" className={styles.backLink}>&larr; Back to Roadster</Link>
          <h1 className={styles.title}>Reserve the Future</h1>
          <p className={styles.subtitle}>Secure your allocation for the quickest car ever made.</p>
        </div>
      </div>

      {/* RIGHT: RESERVATION FORM */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          
          <div className={styles.header}>
            <span className={styles.eyebrow}>Reservation</span>
            <h2 className={styles.heading}>Select Configuration</h2>
          </div>

          {/* TIER SELECTOR */}
          <div className={styles.tierGrid}>
            {TIERS.map((tier) => (
              <div 
                key={tier.id}
                className={`${styles.tierCard} ${selectedTier.id === tier.id ? styles.activeTier : ""} ${tier.id === "rocket" ? styles.disabledTier : ""}`}
                onClick={() => tier.id !== "rocket" && setSelectedTier(tier)}
              >
                <div className={styles.tierHeader}>
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  <span className={styles.tierPrice}>
                    {tier.deposit > 0 ? `$${tier.deposit.toLocaleString()} deposit` : "Invite Only"}
                  </span>
                </div>
                <p className={styles.tierDesc}>{tier.desc}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter first name" />
              </div>
              <div className={styles.inputGroup}>
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter last name" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@example.com" />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" />
              </div>
              <div className={styles.inputGroup}>
                <label>Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="United States" />
              </div>
            </div>

            <div className={styles.totalBox}>
              <span>Deposit Due Today</span>
              <span className={styles.totalAmount}>${selectedTier.deposit.toLocaleString()}</span>
            </div>

            <button type="submit" className={styles.btnGold}>
              Confirm Reservation &rarr;
            </button>
            <p className={styles.disclaimer}>By reserving, you agree to the Roadster Reservation Agreement. Deposit is fully refundable up to 30 days before delivery.</p>
          </form>
        </div>
      </div>
    </div>
  );
}