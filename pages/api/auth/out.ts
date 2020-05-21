import withSession from "../../../lib/withSession";

export default withSession((req, res) => {
  req.session.destroy();
  res.send("Logged out");
}, false);
