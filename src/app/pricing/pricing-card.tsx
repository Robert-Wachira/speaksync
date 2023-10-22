// export default function PricingCard() {
//   return (
//     <>
//       <main>
//         <div>
//           <button
//             onClick={() =>
//               checkoutAction(credits)
//                 .then(async (session) => {
//                   const stripe = await stripePromise;
//                   if (stripe === null) return;
//                   await stripe.redirectToCheckout({ sessionId: session.id });
//                 })
//                 .catch(() => {
//                   toast({
//                     variant: "destructive",
//                     title: "Something went wrong",
//                     description: "You must be logged in to buy credits",
//                   });
//                 })
//             }
//           >
//             Buy for ${cost}
//           </button>
//         </div>
//       </main>
//     </>
//   );
// }
