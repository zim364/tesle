"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./reserve.module.css";

const TIERS = [
  { id: "performance", name: "Performance", deposit: 50000, desc: "Road-ready base model." },
  { id: "thrust", name: "Thrust", deposit: 250000, desc: "Equipped with cold-gas thrusters." },
  { id: "rocket", name: "Rocket", deposit: 0, desc: "Invitation only. Not street legal." }
];

type Option = { id: string; name: string; price: number; color?: string };

const OPTION_GROUPS: { id: string; name: string; options: Option[] }[] = [
  {
    id: "paint",
    name: "Exterior Paint",
    options: [
      { id: "stealth-grey", name: "Stealth Grey", price: 0, color: "#4a4d52" },
      { id: "pearl-white", name: "Pearl White", price: 1500, color: "#edece7" },
      { id: "deep-blue", name: "Deep Blue Metallic", price: 2000, color: "#1e3a5f" },
      { id: "ultra-red", name: "Ultra Red", price: 2500, color: "#8b1a1a" }
    ]
  },
  {
    id: "wheels",
    name: "Wheels",
    options: [
      { id: "aero", name: "Aero Wheels", price: 0 },
      { id: "sport", name: "Sport Wheels", price: 3500 },
      { id: "carbon", name: "Carbon Aero", price: 6000 }
    ]
  },
  {
    id: "interior",
    name: "Interior",
    options: [
      { id: "black", name: "All Black", price: 0 },
      { id: "white", name: "White Premium", price: 2000 }
    ]
  },
  {
    id: "autopilot",
    name: "Autopilot",
    options: [
      { id: "standard", name: "Standard Autopilot", price: 0 },
      { id: "fsd", name: "Full Self-Driving Capability", price: 8000 }
    ]
  }
];

export default function ReservePage() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", country: ""
  });
  const [selectedOptions, setSelectedOptions] = useState<Record<string, Option>>(() => {
    const init: Record<string, Option> = {};
    OPTION_GROUPS.forEach(g => { init[g.id] = g.options[0]; });
    return init;
  });
  const [orderNum, setOrderNum] = useState("");
  const [configRef, setConfigRef] = useState("");

  const optionsTotal = Object.values(selectedOptions).reduce((s, o) => s + o.price, 0);
  const grandTotal = selectedTier.deposit + optionsTotal;
  const pickedGroups = OPTION_GROUPS.filter(g => selectedOptions[g.id].id !== g.options[0].id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOptionSelect = (groupId: string, option: Option) => {
    setSelectedOptions(prev => ({ ...prev, [groupId]: option }));
  };

  const handleGenerateReceipt = () => {
    setOrderNum("RN-" + (Math.floor(Math.random() * 90000000) + 10000000));
    setConfigRef("CFG-" + Math.random().toString(36).slice(2, 8).toUpperCase());
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  const handleDownload = async () => {
    const element = document.getElementById("tesla-receipt");
    if (!element) return;

    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = "820px";
    clone.style.padding = "28px";
    clone.style.borderRadius = "0";
    clone.style.boxShadow = "none";
    clone.style.background = "#ffffff";
    clone.classList.add("pdf-receipt-shrink");

    // Remove image + its divider directly in the DOM (bulletproof)
    const imgWrap = clone.querySelector('[class*="receiptImageWrapper"]') as HTMLElement | null;
    if (imgWrap) imgWrap.style.display = "none";
    const imgDivider = imgWrap && imgWrap.nextElementSibling as HTMLElement | null;
    if (imgDivider) imgDivider.style.display = "none";

    const holder = document.createElement("div");
    holder.style.position = "fixed";
    holder.style.left = "-99999px";
    holder.style.top = "0";
    holder.style.width = "820px";
    holder.style.background = "#ffffff";

    const style = document.createElement("style");
    style.textContent = [
      ".pdf-receipt-shrink * { font-size: 11px; line-height: 1.3; }",
      ".pdf-receipt-shrink h1 { font-size: 24px !important; margin: 0 0 4px 0 !important; }",
      ".pdf-receipt-shrink h2 { font-size: 18px !important; margin: 0 0 4px 0 !important; }",
      ".pdf-receipt-shrink h3 { font-size: 13px !important; margin: 0 0 4px 0 !important; }",
      ".pdf-receipt-shrink p { margin: 2px 0 !important; }",
      ".pdf-receipt-shrink [class*='receiptDivider'] { margin: 14px 0 !important; }",
      ".pdf-receipt-shrink [class*='receiptHeader'] { margin-bottom: 12px !important; }",
      ".pdf-receipt-shrink [class*='receiptTitleArea'] { margin-bottom: 12px !important; }",
      ".pdf-receipt-shrink [class*='receiptGrid'] { gap: 32px !important; }",
      ".pdf-receipt-shrink [class*='configItem'] { padding: 4px 0 !important; }",
      ".pdf-receipt-shrink [class*='totalRow'] { padding: 4px 0 !important; }",
      ".pdf-receipt-shrink [class*='grandTotalRow'] { padding-top: 8px !important; margin-top: 4px !important; }",
      ".pdf-receipt-shrink [class*='noticeBox'] { padding: 8px 10px !important; margin-top: 8px !important; font-size: 9.5px !important; }",
      ".pdf-receipt-shrink [class*='receiptFooterNav'] { margin-top: 12px !important; }",
      ".pdf-receipt-shrink [class*='receiptFooterNav'] p { font-size: 12px !important; margin-bottom: 4px !important; }",
      ".pdf-receipt-shrink [class*='footerLinks'] { font-size: 9px !important; gap: 10px !important; }",
      ".pdf-receipt-shrink [class*='receiptLogo'] { width: 100px !important; }",
      ".pdf-receipt-shrink [data-html2canvas-ignore='true'] { display: none !important; }"
    ].join("\n");

    holder.appendChild(style);
    holder.appendChild(clone);
    document.body.appendChild(holder);

    let canvas: HTMLCanvasElement | null = null;
    try {
      canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });
    } finally {
      document.body.removeChild(holder);
    }
    if (!canvas) return;

    const pdf = new jsPDF({ unit: "in", format: "letter", orientation: "portrait" });
    const margin = 0.35;
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const usableW = pageW - margin * 2;
    const usableH = pageH - margin * 2;

    const imgW = canvas.width / 2;
    const imgH = canvas.height / 2;

    let drawW = usableW;
    let drawH = (imgH / imgW) * drawW;

    if (drawH > usableH) {
      drawH = usableH;
      drawW = (imgW / imgH) * drawH;
    }

    const x = (pageW - drawW) / 2;
    const y = (pageH - drawH) / 2;

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    pdf.addImage(imgData, "JPEG", x, y, drawW, drawH);
    pdf.save("Tesla_Roadster_Configuration_Summary.pdf");
  };

  if (isProcessing) {
    return (
      <div className={styles.processingScreen}>
        <svg viewBox="0 0 342 35" xmlns="http://www.w3.org/2000/svg" className={styles.teslaLoader}>
          <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z" fill="currentColor"/>
        </svg>
        <h2 className={styles.processingTitle}>Preparing Your Configuration</h2>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className={styles.receiptPage}>
        <div className={styles.receiptCard} id="tesla-receipt">
          <div className={styles.receiptHeader}>
            <svg viewBox="0 0 342 35" xmlns="http://www.w3.org/2000/svg" className={styles.receiptLogo}>
              <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z" fill="#000"/>
            </svg>
            <div className={styles.receiptHeaderRight}>
              <span>US</span>
            </div>
          </div>

          <div className={styles.receiptTitleArea}>
            <h1>Configuration Ready</h1>
            <p>Present this summary to your Tesla advisor</p>
          </div>

          <div className={styles.receiptImageWrapper}>
            <img src="/roadster/Roadster-02-Pilot-Desktop.avif" alt="Roadster" />
          </div>

          <div className={styles.receiptDivider} />

          <div className={styles.receiptGrid}>
            <div className={styles.receiptCol}>
              <p className={styles.receiptLabel}>YOUR ROADSTER</p>
              <h2 className={styles.receiptVariant}>{selectedTier.name}</h2>
              <p className={styles.receiptSubVariant}>Reservation</p>
              <p className={styles.receiptDesc}>{selectedTier.desc}</p>
            </div>

            <div className={styles.receiptCol}>
              <p className={styles.receiptLabel}>ORDER NUMBER</p>
              <h3 className={styles.receiptOrderNum}>{orderNum}</h3>

              <div style={{ marginTop: '32px' }}>
                <p className={styles.receiptLabel}>DEPOSIT</p>
                <div className={styles.receiptPaymentRow}>
                  <div>
                    <span className={styles.receiptAmount}>${selectedTier.deposit.toLocaleString()} Deposit</span>
                    <span className={styles.receiptDate}>To be completed with your Tesla advisor</span>
                  </div>
                  <span className={styles.receiptStatusPending}>Pending</span>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <p className={styles.receiptLabel}>Configuration Reference</p>
                <h3 className={styles.receiptOrderNum}>{configRef}</h3>
              </div>
            </div>
          </div>

          {pickedGroups.length > 0 && (
            <>
              <div className={styles.receiptDivider} />
              <div>
                <p className={styles.receiptLabel}>CONFIGURED OPTIONS</p>
                <ul className={styles.configList}>
                  {pickedGroups.map(g => {
                    const sel = selectedOptions[g.id];
                    return (
                      <li key={g.id} className={styles.configItem}>
                        <span>{g.name}: <strong>{sel.name}</strong></span>
                        <span className={styles.configValue}>{sel.price > 0 ? "+$" + sel.price.toLocaleString() : "Included"}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}

          <div className={styles.receiptDivider} />

          <div className={styles.totalsBlock}>
            <div className={styles.totalRow}>
              <span>Reservation deposit</span>
              <span>${selectedTier.deposit.toLocaleString()}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Configuration options subtotal</span>
              <span>+${optionsTotal.toLocaleString()}</span>
            </div>
            <div className={styles.totalRow + " " + styles.grandTotalRow}>
              <span>Estimated configuration total</span>
              <span>${grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className={styles.noticeBox}>
            This is a customer configuration summary, Present this to your Tesla advisor for review. Final pricing, taxes, and fees are determined by Tesla. Payment will be completed  with your Tesla advisor.
          </div>

          <div className={styles.receiptDivider} />

          <div className={styles.receiptFooterArea}>
            <div className={styles.receiptFooterLeft}>
              <div>
                <p>You will receive an email with your order details shortly.</p>
                <span className={styles.receiptSmallText}>Your configuration will be reviewed by a Tesla advisor who will contact you to confirm options, complete payment, and schedule delivery.</span>
              </div>
            </div>
            <button className={styles.viewAccountBtn} data-html2canvas-ignore="true">View In Account</button>
          </div>

          <div className={styles.receiptFooterNav}>
            <p>TESLA</p>
            <div className={styles.footerLinks}>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Contact</a>
              <a href="#">Do Not Sell or Share My Personal Information</a>
            </div>
          </div>
        </div>

        <div className={styles.receiptActions}>
          <button onClick={handleDownload} className={styles.downloadBtn}>Download PDF Summary</button>
          <Link href="/" className={styles.homeBtn}>Return to Home</Link>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className={styles.optionsPage}>
        <div className={styles.optionsContainer}>
          <h1 className={styles.optionsHeading}>Configure Your Roadster</h1>
          <p className={styles.optionsSubheading}>
            {selectedTier.name} reservation selected. Choose your options below, then generate your summary to present to a Tesla advisor.
          </p>

          {OPTION_GROUPS.map(group => (
            <div key={group.id} className={styles.optionGroup}>
              <p className={styles.optionGroupTitle}>{group.name}</p>
              <div className={styles.optionList}>
                {group.options.map(option => (
                  <div
                    key={option.id}
                    className={styles.optionItem + " " + (selectedOptions[group.id].id === option.id ? styles.activeOption : "")}
                    onClick={() => handleOptionSelect(group.id, option)}
                  >
                    <div className={styles.optionLeft}>
                      {option.color && <span className={styles.optionSwatch} style={{ background: option.color }} />}
                      <span className={styles.optionName}>{option.name}</span>
                    </div>
                    <span className={styles.optionPrice}>
                      {option.price > 0 ? "+$" + option.price.toLocaleString() : "Included"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className={styles.optionsSummary}>
            <div className={styles.summaryRow}>
              <span>{selectedTier.name} reservation deposit</span>
              <strong>${selectedTier.deposit.toLocaleString()}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Configuration options</span>
              <strong>+${optionsTotal.toLocaleString()}</strong>
            </div>
            <div className={styles.summaryRow + " " + styles.summaryGrand}>
              <span>Estimated total</span>
              <span>${grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className={styles.optionsActions}>
            <button className={styles.btnGhost} onClick={() => setStep(1)}>Back</button>
            <button className={styles.btnGold} onClick={handleGenerateReceipt}>Generate Summary</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.visualSection}>
        <div className={styles.bgImage} />
        <div className={styles.overlay} />
        <div className={styles.visualContent}>
          <Link href="/models/roadster" className={styles.backLink}>Back to Roadster</Link>
          <h1 className={styles.title}>Reserve the Future</h1>
          <p className={styles.subtitle}>Secure your allocation for the quickest car ever made.</p>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Reservation</span>
            <h2 className={styles.heading}>Select Configuration</h2>
          </div>

          <div className={styles.tierGrid}>
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={styles.tierCard + " " + (selectedTier.id === tier.id ? styles.activeTier : "") + " " + (tier.id === "rocket" ? styles.disabledTier : "")}
                onClick={() => tier.id !== "rocket" && setSelectedTier(tier)}
              >
                <div className={styles.tierHeader}>
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  <span className={styles.tierPrice}>
                    {tier.deposit > 0 ? "$" + tier.deposit.toLocaleString() + " deposit" : "Invite Only"}
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

            <button type="submit" className={styles.btnGold}>Continue to Options</button>
            <p className={styles.disclaimer}>By reserving, you agree to the Roadster Reservation Agreement. Deposit is fully refundable up to 30 days before delivery.</p>
          </form>
        </div>
      </div>
    </div>
  );
}