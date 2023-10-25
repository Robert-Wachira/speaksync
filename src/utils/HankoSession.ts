//@ts-ignore
import { Hanko } from "@teamhanko/hanko-elements";

export async function getSession() {
  try {
    const {
      data: { sess },
    } = await Hanko.session.isValid();
    return sess;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}

export async function getUserDetails() {
  try {
    const { data: userDetails } = await Hanko.session._get();
    return userDetails;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
