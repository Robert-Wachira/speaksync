"use client";

import PricingCard from "./pricing-card";
import styles from "../page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function Pricing() {
  return (
    <>
      <div className={styles.divmain}>
        <Header />
        <main className={styles.main}>
          <PricingCard />
        </main>
        <Footer />
      </div>
    </>
  );
}
