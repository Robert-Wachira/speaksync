"use client";

import PricingCard from "./pricing-card";
import styles from "../page.module.css";
import Head from "next/head";
import Image from "next/image";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function Pricing() {
  return (
    <>
      <div className={styles.divmain}>
        <Head>
          <title>Imggen Pricing</title>
          <Image src="/imggen.png" alt="logo" />
        </Head>
        <Header />
        <main className={styles.main}>
          <PricingCard />
        </main>
        <Footer />
      </div>
    </>
  );
}
