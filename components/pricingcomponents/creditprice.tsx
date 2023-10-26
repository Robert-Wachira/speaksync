// import Link from "next/link";

// const PricinCard = ({ credit }) => {
//   const dynamicSubTitle = (price) => {
//     if (price.nickname === "50 Credits") {
//       return <p className="text-[#f1592a] mt-1">50 Credits</p>;
//     } else if (price.nickname === "100 Credits") {
//       return <p className="text-[#f1592a] mt-1">100 Credits</p>;
//     } else if (price.nickname === "250 Credits") {
//       return <p className="text-[#f1592a] mt-1">250 Credits</p>;
//     }

//     const dynamicDescription = (price) => {
//       if (price.nickname === "50 Credits") {
//         return (
//           <div className="mt-6 space-y-4">
//             <div className="flex space-x-3">
//               <h2 className="text-sm text-gray-500">$9</h2>
//             </div>
//           </div>
//         );
//       } else if (price.nickname === "100 Credits") {
//         return (
//           <div className="mt-6 space-y-4">
//             <div className="flex space-x-3">
//               <p className="text-sm text-gray-500">$19</p>
//             </div>
//           </div>
//         );
//       } else if (price.nickname === "250 Credits") {
//         return (
//           <div className="mt-6 space-y-4">
//             <div className="flex space-x-3">
//               <p className="text-sm text-gray-500">$29</p>
//             </div>
//           </div>
//         );
//       }
//     };

//     // POST request
//     const handleSubscription = async (e) => {
//       e.preventDefault();
//       const response = await fetch("/api/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application-json",
//         },
//         body: JSON.stringify({
//           priceID: price.id,
//         }),
//       });

//       console.log(response);
//     };

//     return (
//       <div className="border-gray-100 shadow-2xl border-4 text-center mt-10 max-w-[1040px]">
//         <div>
//           <div className="bg-gray-100 h-28 items-center font-bold">
//             <h4 className="text-3xl">{price.nickname}</h4>
//             <p>{dynamicSubTitle(price)}</p>
//             {/* <h3>First 2,000lbs Included</h3> */}
//           </div>
//           <div>
//             <div className="flex flex-col items-center justify-center pt-4">
//               <h1 className="text-5xl font-bold">
//                 {(price.unit_amount / 100).toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "USD",
//                 })}
//               </h1>
//               <h3>Additional weight just $.05 / lb</h3>
//             </div>
//             <ul className="flex justify-center">
//               <li className="text-xl font-bold">{dynamicDescription(price)}</li>
//             </ul>
//             <button
//               className="mt-8 flex w-full justify-center rounded-md border border-transparent bg-[#f1592a] py-2 px-4 text-sm font-medium text-white shadow-sm"
//               onClick={handleSubscription}
//             >
//               Rent This Dumpster
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
// };
// export default PricinCard;

// // export default function CreditPrice({ credit }) {
// //   return (
// //     <div className="postlayout">
// //       <Link href={`/backend/${credit.slug}`}>
// //         <img
// //           src={credit.frontmatter.coverImage}
// //           alt=""
// //           className="md:h-64 lg:h-64 w-full object-cover rounded-md sm:h-32"
// //         />
// //         <div className="px-6 py-4 flex flex-col justify-between">
// //           <div className="h-10 flex-1 sm:h-5">
// //             <div className="mt-2 px-0 font-bold text-2xl leading-7">
// //               {credit.frontmatter.title}
// //             </div>
// //             <div className="mb-2 p-0 text-sm">
// //               {credit.frontmatter.date} by {credit.frontmatter.author}
// //             </div>
// //             <p className="mb-3 text-base leading-6">
// //               {credit.frontmatter.excerpt}
// //             </p>
// //             <p className="mb-3 text-base leading-6">
// //               {credit.frontmatter.content}
// //             </p>
// //           </div>
// //         </div>
// //       </Link>
// //     </div>
// //   );
// // }
