"use client";

import { checkoutAction } from "../../../components/pricingcomponents/actions";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../page.module.css";
import data from "../../../components/pricingcomponents/credits.json";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PricingCard() {
  return (
    <>
      <div className={styles.divmain}>
        <main className={styles.main}>
          <h1>Buy your Credits</h1>
          <p className={styles.p}>
            Use the credits as tokens to transcribe new audios
          </p>
          <div>
            <div className={styles.cardlayout}>
              {data.map((credit) => (
                <div key={credit.id} className={styles.card}>
                  <p>{credit.credits} Credits</p>
                  <p>Acquire your {credit.description}</p>
                  <img src={credit.image} />
                  <button
                    onClick={() =>
                      checkoutAction(credit.credits)
                        .then(async (session) => {
                          const stripe = await stripePromise;
                          if (stripe === null) return;
                          await stripe.redirectToCheckout({
                            sessionId: session.id,
                          });
                        })
                        .catch(() => {
                          toast.error(
                            "Something went wrong. You must be logged in to buy credits",
                            {
                              position: toast.POSITION.BOTTOM_RIGHT,
                            }
                          );
                        })
                    }
                  >
                    Buy for ${credit.price}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
