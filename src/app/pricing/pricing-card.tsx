"use client";

import { checkoutAction } from "./actions";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import styles from "../page.module.css";

const cost = ["9", "19", "29"];
const credits = 20;

// const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default function PricingCard() {
  return (
    <>
      <main>
        <div>
          <div>
            <p>Buy your Credits</p>
            <p>Use the credits as tokens to generate new images</p>
            <div>
              <div className={styles.card}>
                <p>${credits} Credits</p>
                <p>Acquire your credits</p>
                <button
                  onClick={() =>
                    checkoutAction(credits)
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
                  Buy for ${cost}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
