import FETCH from "../Merkurial/API_STORAGE/APIS/FETCH";

const SIGNUP_PAGE = () => {
  const signupHandler = async () => {
    const r = await FETCH("/api/signup", "POST", {});
    console.log("RESPONSE: ", r);
  };
  return <button onClick={signupHandler}>Signup</button>;
};

export default SIGNUP_PAGE;
