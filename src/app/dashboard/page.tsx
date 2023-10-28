"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import dynamic from "next/dynamic";
const HankoProfile = dynamic(() => import("../../../components/HankoProfile"), {
  ssr: false,
});
// import HankoProfile from "../../../components/HankoProfile";

import styles from "../page.module.css";

const DashboardPage = () => {
  return (
    <div className={styles.divmain}>
      <Header />
      <main className={styles.main}>
        <HankoProfile />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
