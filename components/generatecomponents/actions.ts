// import { prisma } from "@/server/db";

// const { count } = await prisma.user.updateMany({
//   where: {
//     id: session!.user.id,
//     credits: {
//       gte: 1,
//     },
//     data: {
//       credits: {
//         decrement: 1,
//       },
//     },
//   },
// });

// if (count <= 0) {
//   return makeActionError("You do not have enough credits");
// }
