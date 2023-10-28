"use client";

import dynamic from "next/dynamic";
import Footer from "../../../components/Footer";
const HankoAuth = dynamic(() => import("../../../components/HankoAuth"), {
  ssr: false,
});
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
