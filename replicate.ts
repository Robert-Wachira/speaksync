// import Replicate from "replicate";

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// const model =
//   "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f";

// const output = async () => {
//   await replicate.run(model, {
//     input: {
//       motion_module: "mm_sd_v14",
//     },
//   });
// };

// const prediction = async () => {
//   await replicate.predictions.create({
//     version: "beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
//     input: {
//       motion_module: "mm_sd_v14",
//     },
//     webhook: "https://example.com/your-webhook",
//     webhook_events_filter: ["completed"],
//   });
// };
