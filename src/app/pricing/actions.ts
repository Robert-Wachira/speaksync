"use server";

import { readSession } from "@/utils/sessionHandler";
import Stripe from "stripe";

export async function checkoutAction(credits: number, context) {
  const session = await readSession(context.req);

  if (!session?.user) {
    throw new Error("You must be logged in to checkout");
  }

  const priceIds: Record<number, string> = {
    50: process.env.PRICE_ID_50!,
    100: process.env.PRICE_ID_100!,
    250: process.env.PRICE_ID_250!,
  };

  const priceId = priceIds[credits];
  if (!priceId) {
    throw new Error("Invalid price id");
  }
  return Stripe.Checkout.Sessions.create({
    // const sess = await Stripe.Checkout.Sessions.create({
    mode: "payement",
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
