import LOGIN from "../Components/InAndOut/LOGIN";
import { useState, useContext } from "react";
import USER_CONTEXT from "../Merkurial/store/Context/USER_CONTEXT/user_context";
import AUTH_GUARD from "../Merkurial/Auth/AUTH";

const Login = (props) => {
    const userCtx = useContext(USER_CONTEXT)
    const [message, setMessage] = useState(null)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const states = {email: email, password: password}
    const setters = [setEmail, setPassword]

    const handleChanges = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        name === "email" && setEmail(value)
        name === "password" && setPassword(value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()        
        const login = await userCtx.login(email, password)
        console.log("IS LOGGED IN: ", login)
    }
  return (
    <AUTH_GUARD needsAdmin={false} needsUser={false} needsLoggedIn={false}>
      <LOGIN 
          handleLogin={handleLogin}
          handleChanges={handleChanges}
          states={states}
          setters={setters}
          messager={[message, setMessage]}
    />
  </AUTH_GUARD>
  );
};

export default Login;
