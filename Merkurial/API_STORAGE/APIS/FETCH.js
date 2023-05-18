
const FETCH = async (api_route, method, body, functionThatCalled) => {
  // functionThatCalled &&
  //   console.log(`${functionThatCalled} is fetching using the ${method} method`);
  // console.log("FETCH BODY: ", body)
  const m = method.toUpperCase();
  const b = body ? body : null;
  try {
    const response = await fetch(api_route, {
      method: m.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
      body: m === "GET" ? null : JSON.stringify(b),
    });

    try {
      return response.json()
    } catch {
      return response
    }
    
    // return {ok: true, message: response.message, ...response};
  } catch (err) {
    console.log(
      functionThatCalled
        ? `ERROR IN FETCH CATCH | Called By: ${functionThatCalled}`
        : "ERROR: ",
      err
    );
    return { err: err, ok: false, message: "FETCHING Error" };
  }
};

export default FETCH;
 