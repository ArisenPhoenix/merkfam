import { userSchema } from "../../schemas"
import SQL_TABLE from "../../Merkurial/SQL/OBJECT_CLASS/SQL"
import { useState, useEffect } from "react"
import HEADING from "../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING"
import BasicForm from "../../Merkurial/Components/UI/Forms/BasicForm/BasicForm"
import SELECTION from "../../Merkurial/Components/UI/Basics/SELECTION/SELECTION"
import INPUT_LABEL from "../../Merkurial/Components/UI/Basics/INPUT_LABEL/INPUT_LABEL"
import { DE_KEBABIFY, SuperTitleFy } from "../../Merkurial/Helpers/Text/text"
import PASSWORD from "../../Merkurial/Components/UI/Basics/PASSWORD/PASSWORD"
import EMAIL from "../../Merkurial/Components/UI/Basics/EMAIL/email"

const SIGNUP = (props) => {
    const sexOptions = ["M", "F"]
    const [message, setMessage] = useState(null)
    const [tableMessnger, setTableMessenger] = useState(null)
    const [userName, setUserName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [sex, setSex] = useState(sexOptions[0])
    const [submitted, setSubmitted] = useState(false)
    const isUser = true
    const isAdmin = true
    const values = [userName, firstName, lastName, email, password, sex, isUser, isAdmin]
    const setters = [setUserName, setFirstName, setLastName, setPassword, setEmail]

    const clearValues = () => {
        setters.forEach((setterTo) => {
            setterTo("")
        })
    }

    const checkValues = () => {
        for (let value of values) {
            if (typeof value === "string" && value.trim() === ""){
                setMessage("There Can Be No Empty Fields!!!")
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                return false
            } 
        }
        return true
    }
    
    const handleChanges=(e)=>{
        const name = e.target.name
        const value = e.target.value
        name === "username" && setUserName(value)
        name === "first name" && setFirstName(value)
        name === "last name" && setLastName(value)
        name === "email" && setEmail(value)
        name === "password" && setPassword(value)
        name === "sex" && setSex(value)
    }

    useEffect(() => {
        if (submitted){
            setTimeout(() => {
                setSubmitted(false)
            }, 2000)
        }
        console.log("EMAIL: ", email)
    }, [submitted, email])

    const handleSignup = async (e) => {
        e.preventDefault()
        if(!checkValues()){
            return
        }
        const familyTable = new SQL_TABLE("family", "/api/login", userSchema, null, setMessage)
        // await familyTable.DELETE_TABLE()
        // await familyTable.CREATE_TABLE()
        const memberRow = familyTable.newRow(values)
        // console.log("MAKE MEMBER RES: ", memberRow)
        if (memberRow.isPopulated){
            const makeMember = await memberRow.addRow()
            console.log("makeMember: ", makeMember)
            if (makeMember){
                setTimeout(async() => {
                    const memberId = await memberRow.getId()
                    if (memberId){
                        const userData = await memberRow.FindRowById(memberId)
                        console.log("USER DATA: \n", userData)
                        console.log("Everything is done!")
                        setSubmitted(true)
                        clearValues()
                    }
                }, 2000)
            }
        }   
    }

    return <>
        <HEADING text="Signup" />
        <BasicForm onSubmit={handleSignup} text="Submit">
        {message && <HEADING text={message} />}
            {userSchema.map((input, index) => {
                const text = SuperTitleFy(DE_KEBABIFY(input.column, "_"))
                if (index !== 0 && index !== userSchema.length-1 && text !== "Is User" && text !== "Is Admin"){
                    
                    if (text == "Sex"){
                        return (
                            <SELECTION key={index} options={sexOptions}/>
                        )
                    } else if (text == "Password"){
                        return (
                        <PASSWORD
                            key={index}
                            label={{text: "Password"}}
                            input={{value: password, onChange: handleChanges, name: "password"}}
                            setMessage={setMessage}
                            validate={true}
                            submitted={submitted}
                        />)
                    } else if (text.toLowerCase().includes("email")){
                        return (
                            <EMAIL key={index}
                                label={{text: text}}
                                input={{text: text, value: values[index-1], name: text.toLowerCase(), onChange:handleChanges}}
                                setMessage={setMessage}
                                validate={true}
                                submitted={submitted}
                            />
                        )
                    }
                    else {
                        return (
                            <INPUT_LABEL key={index}
                                label={{text: text}}
                                input={{text: text, value: values[index-1], name: text.toLowerCase(), onChange:handleChanges}}
                                
                            />
                        )
                    }
            }
            })}
        </BasicForm>
    </> 
}

export default SIGNUP