export async function POST(req: Request, res: Response) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version:
        "249170b5f45bb1e0aa68440f1f28ef25f5ee50a882af365555068f1f61ae791b",

      input: {
        file_string: "...",
      },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    return new Response(JSON.stringify({ detail: error.detail }));
  }

  const transcription = await response.json();
  console.log("Transcription response:", transcription);
  return new Response(JSON.stringify({ transcription }));
}
