import { loadStripe } from "@stripe/stripe-js";
//@ts-ignore
import { Hanko } from "@teamhanko/hanko-elements";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const session = Hanko.session;

export function useBuyCredits() {
  const checkout = session?.user.checkout.createCheckout.useMutation();

  return {
    buyCredits: async () => {
      const response = await checkout.mutateAsync();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.id,
      });
    },
  };
}
