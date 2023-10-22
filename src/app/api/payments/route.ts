import Stripe from "stripe";
import { prisma } from "@/server/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

type Metadata = {
  userId: string;
  credits: string;
};

export async function POST(req: Request, res: Response) {
  const body = await req.text();
  const signature = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEB_HOOK_SECRET
    );
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
          //@ts-ignore
          credits: {
            increment: parseInt(credits),
          },
        },
      });

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
