// import { MongoClient, ServerApiVersion } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Merkurial/API_STORAGE/APIS/MONGO/MONGO_SETUP";
import FireBaseAuth from "../../Merkurial/API_STORAGE/APIS/FIREBASE/Auth";

const handleSignup = async (req, res) => {
  //   handle signup basically uses firebase auth for strong security and then while still in server uses
  //   that data retrieved from server and creates an account data object using mongo atlas
  //   login uses the same methodology except it uses email and password to authenticate the user
  //   with firebase and then information is retrieved from mongo Atlas
  const method = req.method;
  // const body = req.body;
  const fake_body = {
    first_name: "Brandon",
    last_name: "Marcure",
    displayName: "Phoenix",
    email: "brandonusamarcure@gmail.com",
    password: "big_cakes11",
  };

  const body = fake_body;

  if (method === "POST") {
    try {
      // if (err) {
      //   return console.log("There was an error posting to database.");
      // }
      const endpoint = process.env.FAMILY_FIREBASE_SIGNUP_KEY;

      const data = {
        // if user leaves display name empty then default to first name
        displayName:
          body.displayName !== "" && body.displayName
            ? body.displayName
            : body.first_name,
        email: body.email,
        password: body.password,
        returnSecureToken: false,
      };

      const response = await FireBaseAuth(endpoint, data, "POST");
      console.log("FIREBASE RESPONSE: ", response);
      // const r = await response.json();

      if (response.err) {
        console.log("r.error");
        console.log("ERROR: ", response.err);
        return res.send({
          ok: false,
          err: "AUTH Account Creation Error.",
          msg: "Couldn't Create A Firebase Account.",
        });
      }

      const filter = {};
      const update = { ...body };
      delete update.displayName;
      update.username = response.displayName;
      const uri = process.env.FAMILY_MONGO_URI;
      const db = process.env.FAMILY_MONGO_DB;
      const cl = process.env.FAMILY_MONGO_COLLECTION;
      const REST_TYPE = "SAVE_USER";
      const RETURN_TYPE = "send";
      const mongoResponse = await MONGO_PROMISE_WRAP(
        uri,
        db,
        cl,
        filter,
        update,
        REST_TYPE,
        res,
        RETURN_TYPE
      );

      if (RETURN_TYPE === "send") {
        return { alreadySent: true };
      } else {
        return res.json({ data: mongoResponse });
      }
      // return res.send(mongoResponse);
    } catch (err) {
      console.log("Error: ");
      return res.send({
        ok: false,
        msg: "An Error Occured In handleSignup.",
        err: err,
      });
    }
  }
};
export default handleSignup;
