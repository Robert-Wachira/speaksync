import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export function useBuyCredits() {
  const checkout = checkout.createCheckout.useMutation();

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
