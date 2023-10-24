"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import Head from "next/head";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Home() {
  return (
    <div className={styles.divmain}>
      <Head>
        <title>Image Generator</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>DISCOVER THE FUTURE OF AI WITH US</h1>
        <p className={styles.p}>
          With the power of AI, we bring to you a way to generate Images.
        </p>
        <div className={styles.plink}>
          <Link href="/generate" className={styles.plink}>
            Get Started Right Now
          </Link>
          {/* <button>
            <Link href="/generate">Get Started right now</Link>
          </button> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
