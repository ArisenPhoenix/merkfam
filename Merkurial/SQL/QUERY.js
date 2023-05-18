import { Client } from "pg";

export const HANDLE_QUERY_ERROR = async (error) => {
  try {
    let json = JSON.parse(error)
    if (json.error || json.message){
        return {ok: false, message: json.error ? json.error : json.message ? json.message : json.err, data: error, status: 500}
    }
  } catch (jsonParseError) { // means error is already an object
    const msg = error.message
    console.log("ERROR MESSAGE: ", msg)
    switch (true) {
      case msg.includes("already exists"):
        return {ok: true, message: "Already Exists", err: msg, status: 208}

      case msg.includes("does not exist"):
        return {ok: true, message: "Does Not Exist", err: msg, status: 208}

      case msg.includes("duplicate"):
        return {ok: true, message: "Unique Parameter For Table Was Defiled and Duplicated :)", err: msg, status: 208}

      default:
        return {ok: false, message: "Unknown Error", err: msg, status: 500}
    }
  }
};

const QUERY = async (query) => {
  const client = new Client(process.env.NEON_DB_URL)
  try {
    await client.connect()
    const response = await client.query((query)); // sends queries
    console.log("RESPONSE: ", response)
    client.end();
    return { ok: true, message: null, response: response, err: null, status: 200 };
  } catch (err) {
    const returnData = HANDLE_QUERY_ERROR(err)
    client.end();
    return returnData
  }
};

export default QUERY;
