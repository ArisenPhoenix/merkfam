import { useContext, useEffect, useState } from "react";
import USER_CONTEXT from "../store/Context/USER_CONTEXT/user_context";
import { useRouter } from "next/router";
import LoadingScreen from "../../Merkurial/Components/UI/LoadingScreen/LoadingScreen"


const AUTH_GUARD = (props) => {
  const [canGo, setCanGo] = useState(false);
  const router = useRouter();
  const userCtx = useContext(USER_CONTEXT);
  const {isAdmin, isLoggedIn, isUser} = userCtx.userData
  const { needsAdmin, needsLoggedIn, needsUser } = props;

  useEffect(() => {
    switch (true) {
      case isUser && !needsUser:
        console.log("isUser && !needsUser")
        setCanGo(true);
        break;

      case needsAdmin && isAdmin:
        console.log("needsAdmin && isAdmin")
        setCanGo(true)
        break;

      case needsUser && isUser:
        console.log("needsUser && isUser")
        setCanGo(true)
        break;

      case needsLoggedIn && isLoggedIn:
        console.log("needsLoggedIn && isLoggedIn")
        setCanGo(true)
        break;

      case !needsAdmin && !needsUser && !needsLoggedIn:
        console.log("!needsAdmin && !needsUser && !needsLoggedIn")
        setCanGo(true)
        break;

      default:
        console.log("default")
        router.push("/login");
        break;
    }
  }, [isAdmin, isLoggedIn, isUser]);

  if (canGo) {
    return props.children;
  } else {
    return <LoadingScreen />;
  }
};

export default AUTH_GUARD;
