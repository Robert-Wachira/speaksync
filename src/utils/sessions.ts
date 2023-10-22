import cookie from "cookie";

// Create a session
const createSession = (res, data) => {
  const serializedData = JSON.stringify(data);
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("session", serializedData, {
      path: "/",
      httpOnly: true,
      maxAge: 3600, // Session duration in seconds
    })
  );
};

// Read a session
const readSession = (req) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const sessionData = cookies.session;
  return sessionData ? JSON.parse(sessionData) : null;
};

// Delete a session
const deleteSession = (res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("session", "", {
      path: "/",
      expires: new Date(0),
    })
  );
};

export { createSession, readSession, deleteSession };
