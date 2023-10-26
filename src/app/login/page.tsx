"use client";

import Footer from "../../../components/Footer";
import HankoAuth from "../../../components/HankoAuth";
import Header from "../../../components/Header";
import styles from "../page.module.css";

export default function LoginPage() {
  return (
    <>
      <div className={styles.divmain}>
        <Header />
        <main className={styles.main}>
          <HankoAuth />
        </main>
        <Footer />
      </div>
    </>
  );
}
