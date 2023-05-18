import { useContext } from "react"
import HEADING from "../Merkurial/Components/UI/SectionHeaders/Headers/HEADING"
import USER_CONTEXT from "../Merkurial/store/Context/USER_CONTEXT/user_context"
import AUTH_GUARD from "../Merkurial/Auth/AUTH"

const Logout = (props) => {
    const userCtx = useContext(USER_CONTEXT)
    return <AUTH_GUARD needsLoggedIn={true}>
        <HEADING text="Logout" />
        <input type="hidden" onClick={userCtx.logoutUser()}>
        </input>
    </AUTH_GUARD>
}

export default Logout