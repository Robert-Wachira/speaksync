"use client";

import React from "react";
import { useBuyCredits } from "@/hooks/useBuyCredits";
import Link from "next/link";
import { LogoutBtn } from "./LogoutButton";
import LoginPage from "@/app/login/page";
import styles from "../src/app/page.module.css";
import Image from "next/image";
// @ts-ignore
import { Hanko } from "@teamhanko/hanko-elements";

export default function Header() {
  const session = Hanko.session;
  const isLoggedIn = !!session;

  const buyCredits = useBuyCredits();

  const credits = session?.user.getCredits.useQuery(undefined, {
    enabled: isLoggedIn,
  });

  // const handleBuyCredits = async () => {
  //   try {
  //     await buyCredits.buyCredits();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <>
      <header className={styles.nav}>
        <div>
          <Link href="/" className={styles.navhome}>
            <Image
              alt="logo"
              src="/Imggen.png"
              width={50}
              height={30}
              className={styles.logoimg}
            />
          </Link>
          <nav className={styles.navmenu}>
            {isLoggedIn && (
              <Link href="/dashboard" className={styles.navlink}>
                Dashboard
              </Link>
            )}
            {isLoggedIn && (
              <Link href="/generate" className={styles.navlink}>
                Generate
              </Link>
            )}
            <Link href="/pricing" className={styles.navlink}>
              Pricing
            </Link>
            <div className={styles.navsubmenu}>
              {isLoggedIn && (
                <>
                  <div>Credits remaining {credits.data}</div>
                  <li>
                    <button
                      onClick={() => useBuyCredits}
                      className={styles.navsubmenubuttons}
                    >
                      Buy Credits
                    </button>
                  </li>
                  <LogoutBtn />
                </>
              )}
              {!isLoggedIn && (
                // <button
                //   onClick={() => {
                //     LoginPage;
                //   }}
                // >
                //   Login
                // </button>
                <Link href="/login" className={styles.navlink}>
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
