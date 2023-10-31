"use client";

import React from "react";
import Link from "next/link";
import { LogoutBtn } from "./LogoutButton";
import styles from "../src/app/page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const isLoggedIn = !!sess;

  return (
    <>
      <header className={styles.nav}>
        <div>
          {isLoggedIn && (
            <Link href="/dashboard" className={styles.navhome}>
              <Image
                alt="logo"
                src="/speaksync.png"
                width={150}
                height={30}
                className={styles.logoimg}
              />
            </Link>
          )}
          {!isLoggedIn && (
            <Link href="/" className={styles.navhome}>
              <Image
                alt="logo"
                src="/speaksync.png"
                width={150}
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
              <Link href="/transcribe" className={styles.navlink}>
                Transcribe
              </Link>
            )}
            {isLoggedIn && (
              <Link href="/pricing" className={styles.navlink}>
                Pricing
              </Link>
            )}
            <div className={styles.navsubmenu}>
              {isLoggedIn && (
                <>
                  <Link href="/logout" passHref legacyBehavior>
                    <LogoutBtn />
                  </Link>
                </>
              )}
              {!isLoggedIn && (
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
