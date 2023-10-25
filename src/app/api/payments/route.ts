import Stripe from "stripe";
import { prisma } from "@/server/db";
// import buffer from 'micro'

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
  // const buf = await buffer(req)
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
