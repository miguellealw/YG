import {
  getAccessToken,
  getSession,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";
import axios from "axios";

export default withApiAuthRequired(async function getCategories(req, res) {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  const { user } = getSession(req, res);

  switch (req.method) {
    // GET Categories
    case "GET": {
      const response = await axios({
        method: "get",
        url: `http://localhost:5000/api/v1.0/users/current_user/categories?auth_id=${user.sub}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      res.status(200).json(response.data);
      break;
    }

    // POST - create categories
    case "POST": {
      const name: string = req.body.categoryName;
      const response = await axios({
        method: "POST",
        url: `http://localhost:5000/api/v1.0/users/current_user/categories?auth_id=${user.sub}`,
        data: { name },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

			res.status(200).json(response.data)
      break;
    }
    // PUT - update category - TODO: move this file to folder - read here https://nextjs.org/docs/api-routes/dynamic-api-routes#index-routes-and-dynamic-api-routes
    case "PUT": {
      break;
    }
    // DELETE - delete category
    case "DELETE": {
      break;
    }
  }
});
