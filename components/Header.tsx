import React from "react";
// import { useBuyCredits } from "@/hooks/useBuyCredits";
import Link from "next/link";
import { LogoutBtn } from "./LogoutButton";
import LoginPage from "@/app/login/page";
import styles from "../src/app/page.module.css";

export default function Header() {
  // const session = useSession();
  // const buyCredits = useBuyCredits();

  // const isLoggedIn = !!session.data;

  // const credits = api.user.getCredits.useQuery(undefined, {
  //   enabled: isLoggedIn,
  // });
  return (
    <>
      <header className={styles.nav}>
        <div>
          <Link href="/" className={styles.navhome}>
            Generate Images
          </Link>
          <nav className={styles.navmenu}>
            <Link href="/generate" className={styles.navlink}>
              Generate
            </Link>
            <Link href="/dashboard" className={styles.navlink}>
              Dashboard
            </Link>
            {/* {isLoggedIn && (
              <li>
                <Link href="/collection">Collection</Link>
              </li>
            )} */}
          </nav>
          {/* <ul>
            {isLoggedIn && (
              <>
                <div>Credits remaining {credits.data}</div>
                <li>
                  <button
                    onClick={() => {
                      buyCredits().catch(console.error);
                    }}
                  >
                    Buy Credits
                  </button>
                </li>
                <li>
                  <LogoutBtn />
                </li>
              </>
            )}
            {!isLoggedIn && (
              <li>
                <button
                  onClick={() => {
                    LoginPage;
                  }}
                ></button>
              </li>
            )}
          </ul> */}
        </div>
      </header>
    </>
  );
}
