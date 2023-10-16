import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version:
        // "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",
        "beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",

      // input: { prompt: req.body.prompt },
      input: {
        prompt: req.body.prompt,
        motion_module: "mm_sd_v14",
        // imageUrl: req.body.imageUrl,
      },
    }),
  });

  let jsonStartResponse = await response.json();
  let endpointOutput = jsonStartResponse.output.get;

  let generatedImage: String | null = null;
  while (!generatedImage) {
    // Loop in 1s intervals until the alt text is ready
    console.log("Polling for result...");
    let finalResponse = await fetch(endpointOutput, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Token " + process.env.REPLICATE_API_KEY,
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    });
    let jsonFinalResponse = await finalResponse.json();

    if (jsonFinalResponse.status === "succeeded") {
      generatedImage = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  res
    .status(200)
    .json(generatedImage ? generatedImage : "Failed to generate image");

  if (response.status !== 201) {
    let error = await response.json();
    return new Response(JSON.stringify({ detail: error.detail }));
    // res.status(500).end(JSON.stringify({ detail: error.detail }));
    // res.end(JSON.stringify({ detail: error.detail }));

    // res.statusCode = 500;
    // res.end(JSON.stringify({ detail: error.detail }));
    // return;
  }

  const prediction = await response.json();
  console.log("Prediction response:", prediction);
  // console.log("Prediction out:", prediction.output);
  return new Response(JSON.stringify({ prediction }));
}
