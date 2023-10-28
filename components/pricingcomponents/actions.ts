"use server";

import { stripe } from "../../src/lib/stripe";
import { getSessionValid, getUserId } from "./sessions";
import { userI } from "./sess";
//@ts-ignore
import { Hanko } from "@teamhanko/hanko-elements";

export async function checkoutAction(credits: number) {
  // const sess = hanko?.session.isValid();
  // const sess = getSessionValid();
  const sess = Hanko.session;

  // const uid = getUserId();
  const uid = Hanko.user;

  // const isLoggedIn = !!sess.isValid();
  // const isLoggedIn = !!sess;

  // if (!isLoggedIn) {
  //   throw new Error("You must be logged in to checkout");
  // }
  const session = await userI;

  // const session = await Hanko?.session;

  if (!session) {
    throw new Error("You must be logged in to checkout");
  }
  const priceIds: Record<number, string> = {
    50: process.env.PRICE_ID_50!,
    120: process.env.PRICE_ID_120!,
    250: process.env.PRICE_ID_250!,
  };

  const priceId = priceIds[credits];

  if (!priceId) {
    throw new Error("Invalid price id");
  }

  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    metadata: {
      // userId: session.res.userId,
      // userId: session.user.id,
      // userEmail: uid.email,
      // userId: resId,
      credits: credits,
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.HOST_NAME}/dashboard`,
    cancel_url: `${process.env.HOST_NAME}/pricing`,
  });
}
