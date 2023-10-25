"use client";

import React from "react";
import { useBuyCredits } from "@/hooks/useBuyCredits";
import Link from "next/link";
import { LogoutBtn } from "./LogoutButton";
import LoginPage from "@/app/login/page";
import styles from "../src/app/page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
// @ts-ignore
import { Hanko } from "@teamhanko/hanko-elements";

export default function Header() {
  const session = Hanko.session;
  // const { data: session } = Hanko.session;

  // const isLoggedIn = !!session.data;
  const isLoggedIn = !!session;

  // if (!session?.user) {
  //   throw new Error("You must be logged in");
  // }

  const buyCredits = useBuyCredits();

  const credits = session?.user.getCredits.useQuery(undefined, {
    enabled: isLoggedIn,
  });

  // const credits = api.user.getCredits.useQuery(undefined, {
  //   enabled: isLoggedIn,
  // });

  const handleBuyCredits = async () => {
    try {
      await buyCredits.buyCredits();
    } catch (error) {
      console.error(error);
    }
  };
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
            {isLoggedIn && (
              <Link href="/collection" className={styles.navlink}>
                Collection
              </Link>
            )}
            <Link href="/pricing" className={styles.navlink}>
              Pricing
            </Link>
            {/* <Link href="/collection">Collection</Link> */}
            <div className={styles.navsubmenu}>
              {isLoggedIn && (
                <>
                  <div>Credits remaining {credits.data}</div>
                  <li>
                    {/* <button
                    onClick={() => {
                      buyCredits().catch(console.error);
                    }}
                  > */}
                    <button
                      onClick={handleBuyCredits}
                      className={styles.navsubmenubuttons}
                    >
                      Buy Credits
                    </button>
                  </li>
                  <LogoutBtn />
                </>
              )}
              {!isLoggedIn && (
                <button
                  onClick={() => {
                    LoginPage;
                  }}
                >
                  Login
                </button>
              )}
              {/* <button
                className={styles.navsubmenubuttons}
                onClick={() => {
                  LoginPage;
                }}
              >
                Login
              </button> */}
              {/* <button
                    onClick={() => {
                      buyCredits().catch(console.error);
                    }}
                  > */}
              {/* <LogoutBtn />
              <Link href="/login">Login</Link> */}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

// import React from "react";
// import { useBuyCredits } from "@/hooks/useBuyCredits";
// import Link from "next/link";
// import { LogoutBtn } from "./LogoutButton";
// import LoginPage from "@/app/login/page";
// import styles from "../src/app/page.module.css";
// // @ts-ignore
// import { Hanko } from "@teamhanko/hanko-elements";

// export default function Header() {
//   // const sess = Hanko.session;
//   // const session = hanko.session.get();

//   // if (session) {
//   //   console.info(`userID: ${session.userID}, jwt: ${session.jwt}`);
//   // }

//   const buyCredits = useBuyCredits();

//   // const isLoggedIn = !sess;
//   // const session = Hanko.state.session.SessionState;
//   // const session = Hanko.state;

//   // const isLoggedIn = !!session.getState();

//   // const credits = Hanko.session
//   //   .get(Hanko.session.userID)
//   //   .getCredits.useQuery(undefined, {
//   //     enabled: isLoggedIn,
//   //   });

//   const handleBuyCredits = async () => {
//     try {
//       await buyCredits.buyCredits();
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <>
//       <header className={styles.nav}>
//         <div>
//           <Link href="/" className={styles.navhome}>
//             Generate Images
//           </Link>
//           <nav className={styles.navmenu}>
//             <Link href="/generate" className={styles.navlink}>
//               Generate
//             </Link>
//             <Link href="/dashboard" className={styles.navlink}>
//               Dashboard
//             </Link>
//             {/* Testing */}
//             <Link href="/collection">Collection</Link>
//             <div>Credits remaining {credits.data}</div>
//             <li>
//               {/* <button
//                     onClick={() => {
//                       buyCredits().catch(console.error);
//                     }}
//                   > */}
//               <button onClick={handleBuyCredits}>Buy Credits</button>
//             </li>
//             <LogoutBtn />
//             <button
//               onClick={() => {
//                 LoginPage;
//               }}
//             >
//               Login
//             </button>
//             {isLoggedIn && <Link href="/collection">Collection</Link>}
//             {isLoggedIn && (
//               <>
//                 <div>Credits remaining {credits.data}</div>
//                 <li>
//                   {/* <button
//                     onClick={() => {
//                       buyCredits().catch(console.error);
//                     }}
//                   > */}
//                   <button onClick={handleBuyCredits}>Buy Credits</button>
//                 </li>
//                 <LogoutBtn />
//               </>
//             )}
//             {!isLoggedIn && (
//               <button
//                 onClick={() => {
//                   LoginPage;
//                 }}
//               >
//                 Login
//               </button>
//             )}
//           </nav>
//         </div>
//       </header>
//     </>
//   );
// }
