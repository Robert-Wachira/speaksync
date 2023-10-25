import Footer from "../../../components/Footer";
import HankoProfile from "../../../components/HankProfile";
import Header from "../../../components/Header";
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
