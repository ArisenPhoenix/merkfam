const FETCH = async (api_route, method, body, functionThatCalled) => {
  functionThatCalled &&
    console.log(`${functionThatCalled} is fetching using the ${method} method`);
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
    if (response.error || response.status !== 200 || response.err) {
      return { err: response };
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(
      functionThatCalled
        ? `ERROR IN FETCH CATCH | Called By: ${functionThatCalled}`
        : "ERROR: ",
      err
    );
    console.log("FETCH ERROR: ", err);
    return { err: err };
  }
};

export default FETCH;

// export const AWS_GET = async (email, setStorage) => {
//   const retreivedData = await FETCH("/api/get_user", "POST", email);
//   if (retreivedData.error || retreivedData.status == 400) {
//     return retreivedData;
//   }
//   try {
//     const fixedData = itemToData(retreivedData);
//     setStorage && setStorage(fixedData);
//     return fixedData;
//   } catch (err) {
//     console.log("AWS GET ERROR: ", err);
//     return { error: err };
//   }
// };

// export const AWS_PUT = async (data) => {
//   let dataToSend;
//   let result;
//   try {
//     dataToSend = dataToItem(data);
//     result = await FETCH("/api/get_user", "PUT", dataToSend);
//     // console.log("AWS_PUT RESULT: ", result);
//   } catch (err) {
//     console.log("ERR IN AWS PUT: ", err);
//     result = basic_user_profile();
//   }

//   return result;
// };
