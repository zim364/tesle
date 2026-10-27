"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getCarModel } from "@/data/models";
import { getVehicleOptions } from "@/data/vehicleOptions";
import styles from "./apply.module.css";

const STEPS = [
  { id: 1, label: "Configuration" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Details" },
  { id: 4, label: "Summary" }
];

function StepProgress({ current }: { current: number }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      padding: "16px 0",
      marginBottom: 32,
      borderBottom: "1px solid #e5e5e5"
    }}>
      {STEPS.map((s, i) => {
        const done = s.id < current;
        const active = s.id === current;
        return (
          <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 26, height: 26, borderRadius: "50%",
                display: "grid", placeItems: "center",
                background: done ? "#22c55e" : active ? "#171a20" : "#e5e5e5",
                color: done || active ? "#fff" : "#999",
                fontSize: 12, fontWeight: 600,
                flexShrink: 0
              }}>
                {done ? "✓" : s.id}
              </span>
              <span style={{
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? "#171a20" : "#5c5e62",
                whiteSpace: "nowrap"
              }}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1,
                height: 1,
                background: done ? "#22c55e" : "#e5e5e5",
                margin: "0 12px"
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const modelSlug = searchParams.get("model") || "model-3";
  const model = getCarModel(modelSlug);

  const [step, setStep] = useState(1);
  const [activeTrim, setActiveTrim] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("lease");
  const [leaseTerm, setLeaseTerm] = useState(36);
  const [leaseMileage, setLeaseMileage] = useState(10000);
  const [leaseDownPayment, setLeaseDownPayment] = useState(5000);
  const [financeTerm, setFinanceTerm] = useState(60);
  const [financeDownPayment, setFinanceDownPayment] = useState(5000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({ id: "", insurance: "", address: "" });
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    street: "", city: "", state: "", zip: ""
  });

  if (!model) {
    return <div style={{ padding: 100, textAlign: "center" }}>Model not found. Please go back.</div>;
  }

  const trims = model.trims || [];
  const defaultPrices: Record<string, string[]> = {
    "cybertruck": ["$79,990", "$89,990", "$99,990"],
    "model-y": ["$44,990", "$48,990", "$54,990", "$61,990"],
    "model-3": ["$38,990", "$42,490", "$50,990"],
    "roadster": ["$200,000", "$250,000"]
  };

  const priceList = defaultPrices[modelSlug] || ["$50,000"];
  const trimPrices = trims.map((t: any, i: number) => t.price || priceList[i] || "$50,000");
  const basePrice = parseInt((trimPrices[activeTrim] || "50000").replace(/[$,]/g, ""), 10);

  const optionGroups = getVehicleOptions(modelSlug);
  const selectedOptionList = optionGroups.map(g => {
    const chosen = g.choices.find(c => c.id === selectedOptions[g.id]) || g.choices[0];
    return { groupName: g.name, name: chosen.name, price: chosen.price };
  });
  const optionsTotal = selectedOptionList.reduce((s, x) => s + x.price, 0);
  const numericPrice = basePrice + optionsTotal;
  const changedOptions = selectedOptionList.filter(x => x.price > 0);

  const calculateLease = () => {
    const residualValue = numericPrice * 0.55;
    const depreciation = (numericPrice - residualValue) / leaseTerm;
    const financeFee = (numericPrice + residualValue) * 0.0021;
    return Math.round(depreciation + financeFee);
  };
  const monthlyLease = calculateLease();

  const calculateFinance = () => {
    const principal = numericPrice - financeDownPayment;
    const monthlyRate = 0.055 / 12;
    if (principal <= 0) return 0;
    return Math.round(principal * (monthlyRate * Math.pow(1 + monthlyRate, financeTerm)) / (Math.pow(1 + monthlyRate, financeTerm) - 1));
  };
  const monthlyFinance = calculateFinance();

  const estimatedTaxes = numericPrice * 0.08;
  const cashTotal = numericPrice + estimatedTaxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionSelect = (groupId: string, optionId: string) => {
    setSelectedOptions(prev => ({ ...prev, [groupId]: optionId }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "id" | "insurance" | "address") => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFiles(prev => ({ ...prev, [type]: e.target.files![0].name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
    }, 2500);
  };

  const handleDownload = async () => {
    const element = document.getElementById("pdf-document");
    if (!element) return;
    const html2pdf = (await import("html2pdf.js")).default;
    // @ts-ignore
    html2pdf().set({
      margin: 0.3,
      filename: "Tesla_" + model.name.replace(/\s+/g, "_") + "_Order.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    }).from(element).save();
  };

  if (isProcessing) {
    return (
      <div className={styles.processingScreen}>
        <svg viewBox="0 0 342 35" xmlns="http://www.w3.org/2000/svg" className={styles.teslaLoader}>
          <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z" fill="currentColor"/>
        </svg>
        <h2 className={styles.processingTitle}>Processing Secure Application</h2>
        <p className={styles.processingDesc}>Verifying documents and generating your order summary...</p>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className={styles.documentPage}>
        <div className={styles.documentWrapper}>
          <div className={styles.document} id="pdf-document">
            <div className={styles.docHeader}>
              <svg viewBox="0 0 342 35" xmlns="http://www.w3.org/2000/svg" className={styles.docLogo}>
                <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z" fill="#E82127"/>
              </svg>
              <div className={styles.docHeaderRight}>
                <p>Reference: {model.name.substring(0, 2).toUpperCase()}-2026-8942</p>
              </div>
            </div>

            <div className={styles.docSection}>
              <h2 className={styles.docSectionTitle}>Vehicle Configuration</h2>
              <div className={styles.docRow}><span>Model</span><span>{model.name}</span></div>
              <div className={styles.docRow}><span>Trim</span><span>{trims[activeTrim]?.name}</span></div>
              <div className={styles.docRow}><span>Range</span><span>{trims[activeTrim]?.range}</span></div>
              <div className={styles.docRow}><span>Base Price</span><span>{trimPrices[activeTrim]}</span></div>
              {optionsTotal > 0 && (
                <div className={styles.docRow} style={{ fontWeight: 600 }}>
                  <span>Configured Total</span>
                  <span>${numericPrice.toLocaleString()}</span>
                </div>
              )}
            </div>

            {changedOptions.length > 0 && (
              <div className={styles.docSection}>
                <h2 className={styles.docSectionTitle}>Configured Options</h2>
                {changedOptions.map((opt, i) => (
                  <div key={i} className={styles.docRow}>
                    <span>{opt.groupName}</span>
                    <span>{opt.name} (+${opt.price.toLocaleString()})</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.docSection}>
              <h2 className={styles.docSectionTitle}>Payment Method</h2>
              {paymentMethod === "cash" && (
                <><div className={styles.docRow}><span>Method</span><span>Cash</span></div><div className={styles.docRow}><span>Estimated Total</span><span>${cashTotal.toLocaleString()}</span></div></>
              )}
              {paymentMethod === "lease" && (
                <><div className={styles.docRow}><span>Method</span><span>Lease</span></div><div className={styles.docRow}><span>Term</span><span>{leaseTerm} Months</span></div><div className={styles.docRow}><span>Est. Monthly Payment</span><span>${monthlyLease}/mo</span></div><div className={styles.docRow}><span>Down Payment</span><span>${leaseDownPayment.toLocaleString()}</span></div></>
              )}
              {paymentMethod === "finance" && (
                <><div className={styles.docRow}><span>Method</span><span>Finance</span></div><div className={styles.docRow}><span>Term</span><span>{financeTerm} Months</span></div><div className={styles.docRow}><span>Est. Monthly Payment</span><span>${monthlyFinance}/mo</span></div><div className={styles.docRow}><span>Down Payment</span><span>${financeDownPayment.toLocaleString()}</span></div></>
              )}
            </div>

            <div className={styles.docSection}>
              <h2 className={styles.docSectionTitle}>Applicant Details</h2>
              <div className={styles.docRow}><span>Name</span><span>{formData.firstName} {formData.lastName}</span></div>
              <div className={styles.docRow}><span>Email</span><span>{formData.email}</span></div>
              <div className={styles.docRow}><span>Phone</span><span>{formData.phone}</span></div>
              <div className={styles.docRow}><span>Address</span><span>{formData.street}, {formData.city}, {formData.state}</span></div>
            </div>

            <div className={styles.docSection}>
              <h2 className={styles.docSectionTitle}>Verified Documents</h2>
              <div className={styles.docRow}><span>Government ID</span><span>Verified</span></div>
              <div className={styles.docRow}><span>Proof of Insurance</span><span>Verified</span></div>
              <div className={styles.docRow}><span>Proof of Address</span><span>Verified</span></div>
            </div>

            <div className={styles.docFooter}>
              <p>This document serves as a summary of your application. Please present this to your Tesla Advisor.</p>
            </div>
          </div>

          <div className={styles.docActions}>
            <button onClick={handleDownload} className={styles.btnPrint}>Download Application (PDF)</button>

            <Link href="/" className={styles.btnReturn}>Return to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>

        {/* LEFT: Vehicle summary */}
        <div className={styles.summaryColumn}>
          <Link href={"/models/" + modelSlug} className={styles.backLink}>Back</Link>
          <h1 className={styles.title}>Order Your {model.name}</h1>
          <p className={styles.subtitle}>
            {step === 1 && "Select your configuration to begin."}
            {step === 2 && "Choose how you would like to pay."}
            {step === 3 && "Tell us about yourself."}
          </p>

          <div className={styles.vehicleCard}>
            <img src={model.heroImage} alt={model.name} className={styles.vehicleImage} />
            <div className={styles.vehicleInfo}>
              <h2>{model.name}</h2>

              {step === 1 ? (
                <div className={styles.sliderContainer}>
                  {trims.map((trim: any, idx: number) => (
                    <div
                      key={trim.name}
                      className={styles.slide + " " + (activeTrim === idx ? styles.activeSlide : "")}
                      onClick={() => setActiveTrim(idx)}
                    >
                      <h3 className={styles.slideTitle}>{trim.name}</h3>
                      <p className={styles.slideSpecs}>{trim.range} Range</p>
                      <p className={styles.slidePrice}>{trimPrices[idx]}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ marginTop: 16, fontSize: 14 }}>
                  <p style={{ margin: "4px 0", color: "#5c5e62", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Trim</p>
                  <p style={{ margin: "0 0 16px 0", fontWeight: 500 }}>{trims[activeTrim]?.name}</p>

                  {changedOptions.length > 0 && (
                    <>
                      <p style={{ margin: "4px 0", color: "#5c5e62", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Options</p>
                      <div style={{ marginBottom: 16 }}>
                        {changedOptions.map((opt, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                            <span style={{ color: "#171a20" }}>{opt.groupName}: {opt.name}</span>
                            <span style={{ color: "#5c5e62" }}>+${opt.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className={styles.selectedSummary}>
                <p>Total Vehicle Price</p>
                <p className={styles.price}>${numericPrice.toLocaleString()}</p>
                {optionsTotal > 0 && (
                  <p style={{ fontSize: 12, color: "#5c5e62", marginTop: 4 }}>
                    ${basePrice.toLocaleString()} vehicle + ${optionsTotal.toLocaleString()} options
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Step form */}
        <div className={styles.formColumn}>
          <StepProgress current={step} />

          {/* STEP 1: Configuration */}
          {step === 1 && (
            <div className={styles.stepContainer}>
              <div className={styles.stepHeader}>
                <span className={styles.stepIndicator}>Step 1 of 3</span>
                <h2 className={styles.sectionHeading}>Configuration</h2>
              </div>
              <p className={styles.sectionDesc}>Customize your {model.name} with the options below.</p>

              {optionGroups.length === 0 && (
                <p style={{ color: "#5c5e62", fontSize: 14, margin: "24px 0" }}>
                  No additional configuration options available for this model.
                </p>
              )}

              {optionGroups.map(group => {
                const current = selectedOptions[group.id] || group.choices[0].id;
                return (
                  <div key={group.id} style={{ marginBottom: 24 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, color: "#171a20", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {group.name}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {group.choices.map(choice => (
                        <button
                          key={choice.id}
                          type="button"
                          onClick={() => handleOptionSelect(group.id, choice.id)}
                          style={{
                            padding: "12px 16px",
                            border: current === choice.id ? "2px solid #3e6ae1" : "1px solid #d0d0d0",
                            borderRadius: 6,
                            background: current === choice.id ? "#f0f4ff" : "#fff",
                            cursor: "pointer",
                            fontSize: 13,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontFamily: "inherit",
                            color: "#171a20"
                          }}
                        >
                          {choice.color && (
                            <span style={{ width: 16, height: 16, borderRadius: "50%", background: choice.color, border: "1px solid #ccc", flexShrink: 0 }} />
                          )}
                          <span>{choice.name}</span>
                          {choice.price > 0 && <span style={{ color: "#5c5e62" }}>+${choice.price.toLocaleString()}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              <button type="button" className={styles.submitBtn} onClick={() => setStep(2)} style={{ marginTop: 32 }}>
                Continue to Payment
              </button>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <div className={styles.stepContainer}>
              <div className={styles.stepHeader}>
                <button type="button" className={styles.backToConfig} onClick={() => setStep(1)}>&larr; Back to Configuration</button>
                <span className={styles.stepIndicator}>Step 2 of 3</span>
                <h2 className={styles.sectionHeading}>Payment Method</h2>
              </div>

              <div className={styles.toggleGroup}>
                <button type="button" className={styles.toggleBtn + " " + (paymentMethod === "cash" ? styles.activeToggle : "")} onClick={() => setPaymentMethod("cash")}>Cash</button>
                <button type="button" className={styles.toggleBtn + " " + (paymentMethod === "lease" ? styles.activeToggle : "")} onClick={() => setPaymentMethod("lease")}>Lease</button>
                <button type="button" className={styles.toggleBtn + " " + (paymentMethod === "finance" ? styles.activeToggle : "")} onClick={() => setPaymentMethod("finance")}>Finance</button>
              </div>

              {paymentMethod === "cash" && (
                <div className={styles.leasePanel}>
                  <div className={styles.monthlyDisplay}>
                    <span className={styles.monthlyAmount}>${cashTotal.toLocaleString()}</span>
                  </div>
                  <p className={styles.dueAtSigning}>Due at delivery</p>
                  <div className={styles.breakdownList}>
                    <div className={styles.breakdownRow}><span>Vehicle Price</span><span>${numericPrice.toLocaleString()}</span></div>
                    <div className={styles.breakdownRow}><span>Estimated Taxes and Fees</span><span>${estimatedTaxes.toLocaleString()}</span></div>
                    <div className={styles.breakdownRowTotal}><span>Total Due</span><span>${cashTotal.toLocaleString()}</span></div>
                  </div>
                  <p className={styles.leaseFinePrint}>Final taxes and fees will be calculated based on your registration address.</p>
                </div>
              )}

              {paymentMethod === "lease" && (
                <div className={styles.leasePanel}>
                  <div className={styles.monthlyDisplay}>
                    <span className={styles.monthlyAmount}>${monthlyLease}</span>
                    <span className={styles.monthlyLabel}>/mo</span>
                  </div>
                  <p className={styles.dueAtSigning}>Due at signing: ${leaseDownPayment.toLocaleString()}</p>
                  <div className={styles.leaseControls}>
                    <div className={styles.controlGroup}>
                      <label>Term</label>
                      <select value={leaseTerm} onChange={(e) => setLeaseTerm(Number(e.target.value))}>
                        <option value={24}>24 months</option>
                        <option value={36}>36 months</option>
                        <option value={48}>48 months</option>
                      </select>
                    </div>
                    <div className={styles.controlGroup}>
                      <label>Mileage</label>
                      <select value={leaseMileage} onChange={(e) => setLeaseMileage(Number(e.target.value))}>
                        <option value={10000}>10,000 miles</option>
                        <option value={12000}>12,000 miles</option>
                        <option value={15000}>15,000 miles</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.downPaymentSlider}>
                    <label>Down Payment: ${leaseDownPayment.toLocaleString()}</label>
                    <input type="range" min="0" max="15000" step="500" value={leaseDownPayment} onChange={(e) => setLeaseDownPayment(Number(e.target.value))} />
                  </div>
                  <p className={styles.leaseFinePrint}>Excess mileage: $0.25/mile. $695 acquisition fee applies.</p>
                </div>
              )}

              {paymentMethod === "finance" && (
                <div className={styles.leasePanel}>
                  <div className={styles.monthlyDisplay}>
                    <span className={styles.monthlyAmount}>${monthlyFinance}</span>
                    <span className={styles.monthlyLabel}>/mo</span>
                  </div>
                  <p className={styles.dueAtSigning}>Estimated APR: 5.5%</p>
                  <div className={styles.leaseControls} style={{ gridTemplateColumns: "1fr" }}>
                    <div className={styles.controlGroup}>
                      <label>Loan Term</label>
                      <select value={financeTerm} onChange={(e) => setFinanceTerm(Number(e.target.value))}>
                        <option value={36}>36 months</option>
                        <option value={48}>48 months</option>
                        <option value={60}>60 months</option>
                        <option value={72}>72 months</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.downPaymentSlider}>
                    <label>Down Payment: ${financeDownPayment.toLocaleString()}</label>
                    <input type="range" min="0" max="30000" step="1000" value={financeDownPayment} onChange={(e) => setFinanceDownPayment(Number(e.target.value))} />
                  </div>
                  <div className={styles.breakdownList}>
                    <div className={styles.breakdownRow}><span>Amount Financed</span><span>${(numericPrice - financeDownPayment).toLocaleString()}</span></div>
                  </div>
                  <p className={styles.leaseFinePrint} style={{ marginTop: "24px" }}>Financing subject to credit approval. Final terms may vary.</p>
                </div>
              )}

              <button type="button" className={styles.submitBtn} onClick={() => setStep(3)} style={{ marginTop: 32 }}>
                Continue to Details
              </button>
            </div>
          )}

          {/* STEP 3: Details */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className={styles.stepContainer}>
              <div className={styles.stepHeader}>
                <button type="button" className={styles.backToConfig} onClick={() => setStep(2)}>&larr; Back to Payment</button>
                <span className={styles.stepIndicator}>Step 3 of 3</span>
                <h2 className={styles.sectionHeading}>Your Details</h2>
              </div>

              <div className={styles.formSection}>
                <p className={styles.sectionDesc}>Please provide your legal name and contact details.</p>
                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>First Name <span className={styles.required}>*</span></label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter first name" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Last Name <span className={styles.required}>*</span></label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter last name" />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>Email Address <span className={styles.required}>*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@example.com" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Phone Number <span className={styles.required}>*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(555) 123-4567" />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <h2 className={styles.sectionHeading}>Delivery Address <span className={styles.required}>*</span></h2>
                <p className={styles.sectionDesc}>This address must match the billing address on your documents.</p>
                <div className={styles.inputGroup}>
                  <label>Street Address</label>
                  <input type="text" name="street" value={formData.street} onChange={handleInputChange} placeholder="123 Main Street" style={{ marginBottom: "16px" }} />
                  <div className={styles.addressRow}>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <h2 className={styles.sectionHeading}>Verification Documents <span className={styles.required}>*</span></h2>
                <p className={styles.sectionDesc}>To comply with regulations, all uploads must be clear and unexpired.</p>
                <div className={styles.docChecklist}>
                  <div className={styles.docUploadRow}>
                    <div className={styles.docInfo}>
                      <span className={styles.docTitle}>1. Government-Issued ID</span>
                      <span className={styles.docDesc}>{uploadedFiles.id || "Driver License or Passport"}</span>
                    </div>
                    <label className={styles.docBtn + " " + (uploadedFiles.id ? styles.docBtnSuccess : "")}>
                      {uploadedFiles.id ? "Replace" : "Upload"}
                      <input type="file" onChange={(e) => handleFileUpload(e, "id")} />
                    </label>
                  </div>
                  <div className={styles.docUploadRow}>
                    <div className={styles.docInfo}>
                      <span className={styles.docTitle}>2. Proof of Insurance</span>
                      <span className={styles.docDesc}>{uploadedFiles.insurance || "Valid auto insurance card"}</span>
                    </div>
                    <label className={styles.docBtn + " " + (uploadedFiles.insurance ? styles.docBtnSuccess : "")}>
                      {uploadedFiles.insurance ? "Replace" : "Upload"}
                      <input type="file" onChange={(e) => handleFileUpload(e, "insurance")} />
                    </label>
                  </div>
                  <div className={styles.docUploadRow}>
                    <div className={styles.docInfo}>
                      <span className={styles.docTitle}>3. Proof of Address</span>
                      <span className={styles.docDesc}>{uploadedFiles.address || "Utility bill or bank statement"}</span>
                    </div>
                    <label className={styles.docBtn + " " + (uploadedFiles.address ? styles.docBtnSuccess : "")}>
                      {uploadedFiles.address ? "Replace" : "Upload"}
                      <input type="file" onChange={(e) => handleFileUpload(e, "address")} />
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <label className={styles.checkboxGroup}>
                  <input type="checkbox" />
                  <span>I certify that all information is accurate, and the documents uploaded are authentic and belong to me. <span className={styles.required}>*</span></span>
                </label>
                <button type="submit" className={styles.submitBtn}>Submit Application</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>Loading...</div>}>
      <ApplyForm />
    </Suspense>
  );
}