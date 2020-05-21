import withSession from "../../../lib/withSession";

export default withSession(async (req, res) => {
  // Fetch token from auth service
  req.session.set("token", "secure_token_from_auth_service");
  await req.session.save();
  res.send("Logged in");
}, false);
