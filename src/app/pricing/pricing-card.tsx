import { checkoutAction } from "./actions";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const cost = ["9", "19", "29"];

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function PricingCard() {
  const credits = 20;

  return (
    <>
      <main>
        <div>
          <button
            onClick={() =>
              checkoutAction(credits)
                .then(async (session) => {
                  const stripe = await stripePromise;
                  if (stripe === null) return;
                  await stripe.redirectToCheckout({ sessionId: session.id });
                })
                .catch(() => {
                  // toast({
                  //   variant: "destructive",
                  //   title: "Something went wrong",
                  //   description: "You must be logged in to buy credits",
                  // });
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
      </main>
    </>
  );
}
