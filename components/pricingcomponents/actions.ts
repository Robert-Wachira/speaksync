"use server";

import Stripe from "stripe";
//@ts-ignore
import { Hanko } from "@teamhanko/hanko-elements";

export async function checkoutAction(credits: number) {
  const session = await Hanko.session;

  if (!session?.user) {
    throw new Error("You must be logged in to checkout");
  }

  const priceIds: Record<number, string> = {
    50: process.env.PRICE_ID_50,
    100: process.env.PRICE_ID_100,
    250: process.env.PRICE_ID_250,
  };

  const priceId = priceIds[credits];
  if (!priceId) {
    throw new Error("Invalid price id");
  }

  //@ts-ignore
  return Stripe.Checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    metadata: {
      userId: session.user.id,
      credits: credits,
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.HOST_NAME}/`,
    cancel_url: `${process.env.HOST_NAME}/pricing`,
  });
}
