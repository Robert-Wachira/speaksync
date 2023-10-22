import HankoAuth from "../../../components/HankoAuth";
import styles from "../page.module.css";

export default function LoginPage() {
  return (
    <>
      <div className={styles.login}>
        <HankoAuth />
      </div>
    </>
  );
}
