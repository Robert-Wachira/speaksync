"use client";

import React from "react";
import { useBuyCredits } from "@/hooks/useBuyCredits";
import Link from "next/link";
import { LogoutBtn } from "./LogoutButton";
import LoginPage from "@/app/login/page";
import styles from "../src/app/page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// const Hanko = dynamic(() => import("../components/HankoAuth"), { ssr: false });
// @ts-ignore
import { Hanko } from "@teamhanko/hanko-elements";

const hankoAPI = process.env.NEXT_PUBLIC_HANKO_API_URL;

export default function Header() {
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    // @ts-ignore
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoAPI ?? ""))
    );
  }, []);

  const sess = hanko?.session.isValid();
  const cred = hanko?.user;

  // const logout = async () => {
  //   try {
  //     await hanko?.user.logout();
  //     router.push("/login");
  //     router.refresh();
  //     return;
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //   }
  // };

  // const session = Hanko.session;
  const isLoggedIn = !!sess;

  // const buyCredits = useBuyCredits();

  // const credits = hanko?.user.getCredits.useQuery(undefined, {
  //   enabled: isLoggedIn,
  // });

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
          {isLoggedIn && (
            <Link href="/dashboard" className={styles.navhome}>
              <Image
                alt="logo"
                src="/Imggen.png"
                width={50}
                height={30}
                className={styles.logoimg}
              />
            </Link>
          )}
          {!isLoggedIn && (
            <Link href="/" className={styles.navhome}>
              <Image
                alt="logo"
                src="/Imggen.png"
                width={50}
                height={30}
                className={styles.logoimg}
              />
            </Link>
          )}
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
                  {/* <div>Credits remaining {credits.data}</div> */}
                  <div>Credits remaining</div>
                  {/* <button
                    onClick={() => useBuyCredits()}
                    className={styles.navsubmenubuttons}
                  >
                    Buy Credits
                  </button> */}
                  <Link href="/logout" passHref legacyBehavior>
                    <LogoutBtn />
                  </Link>
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
