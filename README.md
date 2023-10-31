## Implementation of Hanko Authentication on a Next.JS Application with the incorporation of Stripe, Replicate and Prisma ORM

In this project, we will look into how we can implement passkeys using Hanko Authentication.

Accompanied in this is a link to an article showing how the system was implemented with much detail.

SpeakSync is a site where you can be able to transcribe your audios with the help of AI the same way as one may obtain the services of sites such as Rev for transcription services. With the rise of AI making work easier, we can use this to implement transcription in place of using humans who are prone to errors.

SpeakSync has been created using [Next.js](https://nextjs.org/) while showcasing the use of [Hanko Authentication](https://hanko.io/) together with [Prisma](https://www.prisma.io/) for the ORM, [Replicate](https://replicate.com) for the AI and [Stripe](https://stripe.com/) for payments.

### Functunality

- Hanko Authentication.
- Prima ORM database management.
- Stripe Payment method implemented.
- Replicate functionality implemented.

### Getting Started

You can be able to get started by

1. Clone this repository.

```
git clone https://github.com/Robert-Wachira/speaksync.git
```

2. Install the Dependencies.

```
npm install
# or
yarn install
```

3. Setting up of the Hanko, Prisma and Stripe by following this [article](https://robert-wachira.hashnode.dev/implementation-of-hanko-authentication-on-a-nextjs-application-with-the-incorporation-of-stripe-replicate-and-prisma-orm).
4. Running the Application.

```
npm run dev
# or
yarn dev
```

5. Accessing the website by looking up http://localhost:3000.
6. The live demo can be accessed at https://speaksync.vercel.app.
