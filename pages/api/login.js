import QUERY from "../../Merkurial/SQL/QUERY";

const handleLogin = async (req, res) => {
  const { method } = req
  const { query, type, email, password } = req.body

  if (type === "GET"){
    const r = await QUERY(query)
    console.log("LOGIN RESPONSE: ", r)
    return res.json({...r, ok: true})
  } else if (method === "POST"){
    const r = await QUERY(query)
    console.log("SIGN UP RESPONSE: ", r)
    return res.json({...r, ok: true})
  } else if (method === "PUT") {
    const r = await QUERY(query)
    console.log("UPDATE USER DATA RESPONSE: ", r)
    return res.json({...r, ok: true})
  } else if (method === "DELETE"){
    const r = await QUERY(query)
    console.log("DELETE ACCOUNT RESPONSE: ", r)
    return res.json({...r, ok: true})
  }
};
export default handleLogin;
