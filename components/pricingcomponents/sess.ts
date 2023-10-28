export async function userI(req: Request, res: Response) {
  const response = await fetch(`${process.env.HOST_NAME}/me`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  console.log(response);
}
