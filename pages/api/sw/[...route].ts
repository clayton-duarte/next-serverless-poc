import Axios, { AxiosRequestConfig } from "axios";
import urlJoin from "url-join";

import withSession from "../../../lib/withSession";

export default withSession(async (req, res) => {
  const token = req.session.get("token");

  const externalRoute = urlJoin(
    process.env.EXTERNAL_API_SW,
    ...(req.query.route as string[])
  );

  try {
    const { data } = await Axios({
      method: req.method as AxiosRequestConfig["method"],
      url: externalRoute,
      headers: {
        Auth: `Bearer ${token}`,
      },
    });
    res.send(data);
  } catch (err) {
    if (err.response.status) {
      res.statusCode = err.response.status;
      res.send(err.response.data);
    } else {
      throw new Error(err);
    }
  }
});
