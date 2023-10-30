## Implementation of Hanko Authentication on a Next.JS Application with the incorporation of Stripe, Replicate and Prisma

Hanko is a platform that enables you to log in using passkeys thus eliminating the need to use passwords and 2FA thus enhancing the authentication of the users while making it easy to sign in and remove the need to always memorize passwords or write them down on a notebook.

Passkeys are now the future of authentication with huge organizations such as Apple, Google and Microsoft leading the front in promoting the use of the passkeys as a way to replace the day-in-day-out passwords. In this article, we will be looking at Hanko's implementation of passkeys.

### Goal

In this article, we will build a Next.js application that generates images with the help of Replicate with the inclusion of various aspects propelling the project including Hanko for Authentication, Stripe for Payments and Prisma to maintain the database.

### Prerequisites

To follow along, you will need:

[Node.js](https://nodejs.org/en) installed on your computer.

Basic knowledge of working with TypeScript.

A [Hanko](https://hanko.io/) profile.

A [Stripe](https://stripe.com/) profile.

A [Replicate](https://replicate.com/) account.

### Overview (ToC)

### Introduction

Passkeys are a new form of authentication which is set to revamp the existing passwords and 2-Factor-Authentication (2FA) and even replace them to being the main form of authentication. Passkeys entail using your biometric data as a form

### Setting up the development application

The application will use the following dependencies:

Hanko: You'll need Hanko for the authentication of the users.

Jose:

Stripe: You'll need Stripe to process payments within the system.

Replicate: You'll need Replicate to act as the endpoint for the LLM.

Prisma: You'll need Prisma for database management.

#### Creating the app

Next.js is a React framework that is used to build web applications using JavaScript. It is termed as a Full-Stack Language since you can be able to perform both front-end and back-end functions on it.
For us to get started, we first need to create a directory from which we will be working from and then run the following command under the bash in Visual Studio Code:

```bash
npx create-next-app@latest .
```

This will therefore install Next.js app into your directory. You can then apply the following settings:

Settings

### Setting up Prisma

#### Setting up Supabase

### Setting up Hanko Authentication

### Setting up Stripe

### Setting up Replicate
