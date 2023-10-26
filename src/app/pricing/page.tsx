"use client";

import PricingCard from "./pricing-card";
import styles from "../page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const cost = ["$9", "$19", "$29"];

export default function Pricing() {
  return (
    <>
      <div className={styles.divmain}>
        <Header />
        <main className={styles.main}>
          {/* <PricingCard cost={"$9"} /> */}
          <PricingCard />

          {/* <PricingCard cost={"$19"} />
          <PricingCard cost={"$29"} /> */}
        </main>
        <Footer />
      </div>
    </>
  );
}
