"use client";

import PricingCard from "./pricing-card";
import styles from "../page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";
// import PricinCard from "../../../components/pricingcomponents/creditprice";
import data from "../../../components/pricingcomponents/credits.json";

export default function Pricing({ props }) {
  // const [creditings, setCreditings] = useState({
  //   credits: ["50", "100", "250"],
  //   description: ["50 Credits", "100 Credits", "250 Credits"],
  //   quantity: 1,
  //   price: ["9", "19", "29"],
  // });
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
