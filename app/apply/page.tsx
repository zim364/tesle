"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getCarModel } from "@/data/models";
import styles from "./apply.module.css";

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
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    street: "", city: "", state: ""
  });

  if (!model) {
    return <div style={{ padding: 100, textAlign: "center" }}>Model not found. Please go back.</div>;
  }

  const trims = model.trims || [];
  const defaultPrices: Record<string, string[]> = {
    "cybertruck": ["$79,990", "$99,990", "$119,990"],
    "model-y": ["$44,990", "$48,990", "$54,990", "$61,990"],
    "model-3": ["$38,990", "$42,990", "$50,990"],

    "roadster": ["$200,000", "$250,000"],
  };

  const priceList = defaultPrices[modelSlug] || ["$50,000"];
  const trimPrices = trims.map((t: any, i: number) => t.price || priceList[i] || "$50,000");
  const numericPrice = parseInt((trimPrices[activeTrim] || "50000").replace(/[$,]/g, ""), 10);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'insurance' | 'address') => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFiles(prev => ({ ...prev, [type]: e.target.files![0].name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
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
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: "avoid-all" }
    }).from(element).save();
  };

  if (isProcessing) {
    return (
      <div className={styles.processingScreen}>
        <div className={styles.loader}></div>
        <h2 className={styles.processingTitle}>Processing Secure Application</h2>
        <p className={styles.processingDesc}>Verifying documents and generating your order summary...</p>
      </div>
    );
  }

  if (step === 3) {
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
            </div>

            <div className={styles.docSection}>
              <h2 className={styles.docSectionTitle}>Payment Method</h2>
              {paymentMethod === "cash" && (
                <>
                  <div className={styles.docRow}><span>Method</span><span>Cash</span></div>
                  <div className={styles.docRow}><span>Estimated Total</span><span>${cashTotal.toLocaleString()}</span></div>
                </>
              )}
              {paymentMethod === "lease" && (
                <>
                  <div className={styles.docRow}><span>Method</span><span>Lease</span></div>
                  <div className={styles.docRow}><span>Term</span><span>{leaseTerm} Months</span></div>
                  <div className={styles.docRow}><span>Est. Monthly Payment</span><span>${monthlyLease}/mo</span></div>
                  <div className={styles.docRow}><span>Down Payment</span><span>${leaseDownPayment.toLocaleString()}</span></div>
                </>
              )}
              {paymentMethod === "finance" && (
                <>
                  <div className={styles.docRow}><span>Method</span><span>Finance</span></div>
                  <div className={styles.docRow}><span>Term</span><span>{financeTerm} Months</span></div>
                  <div className={styles.docRow}><span>Est. Monthly Payment</span><span>${monthlyFinance}/mo</span></div>
                  <div className={styles.docRow}><span>Down Payment</span><span>${financeDownPayment.toLocaleString()}</span></div>
                </>
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

        {/* LEFT COLUMN */}
        <div className={styles.summaryColumn}>
          <Link href={"/models/" + modelSlug} className={styles.backLink}>Back</Link>
          <h1 className={styles.title}>Order Your {model.name}</h1>
          <p className={styles.subtitle}>Select your configuration to begin.</p>

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
                <div className={styles.selectedSummary} style={{ marginTop: "16px", borderTop: "none", paddingTop: "0" }}>
                  <p>Selected Model: <strong>{trims[activeTrim]?.name}</strong></p>
                </div>
              )}

              <div className={styles.selectedSummary}>
                <p>Total Vehicle Price</p>
                <p className={styles.price}>{trimPrices[activeTrim]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.formColumn}>

          {step === 1 && (
            <div className={styles.stepContainer}>
              <div className={styles.stepHeader}>
                <span className={styles.stepIndicator}>Step 1 of 2</span>
                <h2 className={styles.sectionHeading}>Payment Method</h2>
              </div>

              <div className={styles.toggleGroup}>
                <button className={styles.toggleBtn + " " + (paymentMethod === "cash" ? styles.activeToggle : "")} onClick={() => setPaymentMethod("cash")}>Cash</button>
                <button className={styles.toggleBtn + " " + (paymentMethod === "lease" ? styles.activeToggle : "")} onClick={() => setPaymentMethod("lease")}>Lease</button>
                <button className={styles.toggleBtn + " " + (paymentMethod === "finance" ? styles.activeToggle : "")} onClick={() => setPaymentMethod("finance")}>Finance</button>
              </div>

              {paymentMethod === "cash" && (
                <div className={styles.leasePanel}>
                  <div className={styles.monthlyDisplay}>
                    <span className={styles.monthlyAmount}>${cashTotal.toLocaleString()}</span>
                  </div>
                  <p className={styles.dueAtSigning}>Due at delivery</p>
                  <div className={styles.breakdownList}>
                    <div className={styles.breakdownRow}><span>Vehicle Price</span><span>${numericPrice.toLocaleString()}</span></div>
                    <div className={styles.breakdownRow}><span>Estimated Taxes & Fees</span><span>${estimatedTaxes.toLocaleString()}</span></div>
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

              <button className={styles.submitBtn} onClick={() => setStep(2)}>Continue to Details</button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className={styles.stepContainer}>
              <div className={styles.stepHeader}>
                <button type="button" className={styles.backToConfig} onClick={() => setStep(1)}>&larr; Back to Payment</button>
                <span className={styles.stepIndicator}>Step 2 of 2</span>
                <h2 className={styles.sectionHeading}>Applicant Details</h2>
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
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" /></div>
                  
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
                      <input type="file" onChange={(e) => handleFileUpload(e, 'id')} />
                    </label>
                  </div>
                  <div className={styles.docUploadRow}>
                    <div className={styles.docInfo}>
                      <span className={styles.docTitle}>2. Proof of Insurance</span>
                      <span className={styles.docDesc}>{uploadedFiles.insurance || "Valid auto insurance card"}</span>
                    </div>
                    <label className={styles.docBtn + " " + (uploadedFiles.insurance ? styles.docBtnSuccess : "")}>
                      {uploadedFiles.insurance ? "Replace" : "Upload"}
                      <input type="file" onChange={(e) => handleFileUpload(e, 'insurance')} />
                    </label>
                  </div>
                  <div className={styles.docUploadRow}>
                    <div className={styles.docInfo}>
                      <span className={styles.docTitle}>3. Proof of Address</span>
                      <span className={styles.docDesc}>{uploadedFiles.address || "Utility bill or bank statement"}</span>
                    </div>
                    <label className={styles.docBtn + " " + (uploadedFiles.address ? styles.docBtnSuccess : "")}>
                      {uploadedFiles.address ? "Replace" : "Upload"}
                      <input type="file" onChange={(e) => handleFileUpload(e, 'address')} />
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <label className={styles.checkboxGroup}>
                  <input type="checkbox" />
                  <span>I certify that all information is accurate, and the documents uploaded are authentic and belong to me. <span className={styles.required}>*</span></span>
                </label>
                <button type="submit" className={styles.submitBtn}>Submit Secure Application</button>
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