import HEADING from "../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING"
import BasicForm from "../../Merkurial/Components/UI/Forms/BasicForm/BasicForm"
import PASSWORD from "../../Merkurial/Components/UI/Basics/PASSWORD/PASSWORD"
import EMAIL from "../../Merkurial/Components/UI/Basics/EMAIL/email"
import { DE_KEBABIFY, SuperTitleFy } from "../../Merkurial/Helpers/Text/text"
import INPUT_LABEL from "../../Merkurial/Components/UI/Basics/INPUT_LABEL/INPUT_LABEL"

const LOGIN = (props) => {
    const states = props.states
    const [message, setMessage] = props.messager

    return <>
        <HEADING text="Login" />
        <BasicForm onSubmit={props.handleLogin} text="Login">
            {message && <HEADING text={message} />}
        
            {Object.entries(states).map((entry, index) => {
                // console.log("ENTRY: ", entry)
                const stateText = entry[0]
                const state = entry[1]
                const text = SuperTitleFy(DE_KEBABIFY(stateText))
                if (typeof state === "number"){
                    return (
                        <INPUT_LABEL 
                            key={index} 
                            input={{text:text, value: state}}/>
                    )
                } else if (stateText.includes("email")){
                    return (
                        <EMAIL
                            key={index} 
                            label={{text: text}}
                            input={{text: text, value: state, name: stateText, onChange: props.handleChanges}}
                            setMessage={setMessage}
                />
                    )
                } else if (stateText.includes("password") || stateText.includes("pwd")){
                    return (
                        <PASSWORD
                            key={index} 
                            label={{text: text}}
                            input={{value: state, onChange: props.handleChanges, name: "password"}}
                            setMessage={setMessage}
                />
                    )
                } else {
                    return (
                        <INPUT_LABEL 
                            key={index} 
                            input={{text:text, value: state}}/>
                    )
                }
                
                
            })}
        </BasicForm>
    </> 
}

export default LOGIN