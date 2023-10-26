"use client";

import PricingCard from "./pricing-card";
import styles from "../page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useState } from "react";

const cost = ["$9", "$19", "$29"];

export default function Pricing() {
  const [credits, setCredit] = useState({
    name: "50",
    description: "$50 Credits",
    quantity: 1,
    price: 9,
    // name: "100",
    // description: "100 Credits",
    // quantity: 1,
    // price: 19,
    // name: "250",
    // description: "250 Credits",
    // quantity: 1,
    // price: 29,
  });
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
