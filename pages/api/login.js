import { MongoClient, ServerApiVersion } from "mongodb";
const handleLogin = async (req, res) => {
  if (req.method === "POST") {
    try {
      if (err) {
        return console.log("There was an error retreiving data from database.");
      }
    } catch {
      console.log("No Errors Getting Data.");
    }

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const data = req.body;
    // console.log("auth data below:");
    // console.log(data);

    // Auth User
    console.log("trying to log user in now...");

    const endpoint = process.env.SORS_FIREBASE_LOGIN_URI;

    const options = {
      method: "POST",
      body: JSON.stringify({
        displayName: data.displayName,
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      }),
    };

    const response = await fetch(endpoint, options, headers)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        res.json(error);
        next();
      });

    const body = await response.json();

    if (body.error) {
      console.log("error in body sending error back");
      console.log(body.error);
      res.send(body);
    } else {
      // Get From Mongo User DataBase
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      const uri = process.env.SORS_MONGO_URI;
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });
      return new Promise((resolve, reject) => {
        client.connect((err) => {
          const usersCollection = client.db("sors").collection("usersDB");
          if (err) {
            // console.log("error connecting to database");
            return err;
          }

          usersCollection
            .findOne({
              localId: body.localId,
            })
            .then(
              (response) => {
                // console.log("response");
                // console.log(response);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Cache-Control", "max-age=180000");
                res.send({ ...response, ...data, ...body });
                resolve();
              },
              (err) => {
                console.log("The error in login wil be shown below:");
                console.log(err);
                return res.send(err);
              }
            )
            .catch((err) => {
              // console.log("an error occured at line 217");
              console.log(err);
            });
        });
      });
    }
  }
};
export default handleLogin;
