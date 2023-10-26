"use server";

import Stripe from "stripe";
import { prisma } from "@/server/db";
// import buffer from "micro";
//@ts-ignore
import { Hanko } from "@teamhanko/hanko-elements";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

type Metadata = {
  userId: string;
  credits: string;
};

export async function POST(req: Request, res: Response) {
  const body = await req.text();
  // const buf = await buffer(req);
  const signature = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      // buf,
      body,
      signature,
      webhookSecret
    );
    console.log("Event", event);
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      const completedEvent = event.data.object as Stripe.Checkout.Session & {
        metadata: Metadata;
      };

      const userId = completedEvent.metadata.userId;
      const credits = completedEvent.metadata.credits;

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          credits: {
            increment: parseInt(credits),
            // increment: credits,
          },
        },
      });

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
}

// import Stripe from "stripe";
// //@ts-ignore
// import { Hanko } from "@teamhanko/hanko-elements";

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
