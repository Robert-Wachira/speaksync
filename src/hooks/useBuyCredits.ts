import { loadStripe } from "@stripe/stripe-js";
//@ts-ignore
import { Hanko } from "@teamhanko/hanko-elements";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
// const session = Hanko.session;
const session = Hanko.session;

export function useBuyCredits() {
  // const checkout = session.checkout.createCheckout.useMutation();
  const checkout = session?.user.checkout.createCheckout.useMutation();

  return {
    buyCredits: async () => {
      // const response = await checkout.mutateAsync();
      const response = await checkout.mutateAsync();
      const stripe = await stripePromise;
      //   const response = await fetch("/api/payments", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application-json",
      //     },
      //     // body: JSON.stringify({
      //     //   priceID: priceId
      //     // })
      //   });
      //   const session = await response.json();
      //   const result = await stripe?.redirectToCheckout({
      //     sessionId: session.id,
      //   });
      //   if (result.error) {
      //     console.error(result.error);
      //   }
      // },
      // catch(error) {
      //   console.error("An error occurred:", error);
      await stripe?.redirectToCheckout({
        sessionId: response.id,
      });
    },
  };
}
