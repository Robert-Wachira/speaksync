import { readSession } from "@/utils/sessions";

export async function getServerSideProps(context) {
  const session = readSession(context.req);
  if (!session) {
    return {
      redirect: {
        destination: "/login", // Redirect to the login page if not authenticated
        permanent: false,
      },
    };
  }

  // Continue with the protected route logic
}
