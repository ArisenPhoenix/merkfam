import { useState } from "react"
import BasicForm from "../../../Merkurial/Components/UI/Forms/BasicForm/BasicForm"
import INPUT_LABEL from "../../../Merkurial/Components/UI/Basics/INPUT_LABEL/INPUT_LABEL"
import SELECTION from "../../../Merkurial/Components/UI/Basics/SELECTION/SELECTION"
import css from "./SchedulePayments.module.css"
import HEADING from "../../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING"
import SQL_TABLE from "../../../Merkurial/SQL/OBJECT_CLASS/SQL"
import { useMessage } from "../../../Merkurial/hooks/useMessage"
import { debtSchema, userSchema } from "../../schemas"

const ScheduledPayments = (props) => {
    const types = ["Credit Card", "Loan", "Insurance", "Gas", "Utilities", "Food", "Shopping", "Vice", "General"]
    const options = ["Daily", "Bi-Weekly", "Monthly", "Yearly"]
    const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [payPeriod, setPayPeriod] = useState(options[2])
    const [debtName, setDebtName] = useState("")
    const [debtAmount, setDebtAmount] = useState(0)
    const [type, setType] = useState(types[0])
    const [month, setMonth] = useState(monthOptions[0])
    const [day, setDay] = useState(1)
    const [message, setMessage] = useMessage(3000, null)

    const handleChanges=(e)=>{
        const name = e.target.name
        const value = e.target.value
        name === "type" && setType(value)
        name === "payPeriod" && setPayPeriod(value)
        name === "month" && setMonth(value)
        name === "debtName" && setDebtName(value)
        name === "debtAmount" && setDebtAmount(value)
        name === "day" && setDay(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const monthNum = payPeriod == "Yearly" ? monthOptions.indexOf(month)+1 : -1
        const data = [
            type,
            payPeriod,
            debtName,
            debtAmount,
            monthNum,
            day,
        ]

        const DebtTable = new SQL_TABLE(
            "debts",
            "/api/postgre_neon",
            debtSchema,
            null,
            setMessage
        )
        DebtTable.hasTable = true
    
        // await Table.DELETE_TABLE()

        // let hasTable = Table.hasTable
        
        // await Table.CREATE_TABLE()
        // console.log("HAS TABLE: ", hasTable)

        if (DebtTable.hasTable){
            const debt = DebtTable.newRow(data)
            console.log("DEBT PROPERTIES: \n", debt.properties())
            // const query = debt.getAddQueryString("users", "user_id")
            // console.log("QUERY: \n ", query)
            // const addResponse = await debt.addDebt()
            // console.log("ADD RESPONSE: ", addResponse)
        }

        // const getTableR = await Table.GET_TABLE()
        // console.log("GET TABLE RESPONSE: ", getTableR)
    }

    return (
        <>  
            
            <BasicForm className={css.form} text="Add" onSubmit={handleSubmit} display="flex">
                {message && <HEADING text={message} />}
                <HEADING text="Payment Info:" />
                <SELECTION 
                    text="Type"
                    className={css.selection} 
                    selectClass={css.selectClass} 
                    options={types} 
                    value={type} 
                    onChange={handleChanges} 
                    labelClass={css.mainInfoLabel}
                    name="type"
                    />

                <SELECTION 
                    text="Period" 
                    className={css.selection} 
                    selectClass={css.selectClass} 
                    options={options} 
                    value={payPeriod} 
                    onChange={handleChanges} 
                    labelClass={css.mainInfoLabel}
                    name="payPeriod" 
                    />
                
                {payPeriod === "Yearly" &&
                    <SELECTION 
                        text="Month"
                        className={css.selection} 
                        selectClass={css.selectClass} 
                        options={monthOptions} 
                        value={month} 
                        onChange={handleChanges} 
                        labelClass={css.mainInfoLabel}
                        name="type"
                    />
                }
                <INPUT_LABEL className={css.mainInfo} 
                    label={{text:"Day", className: css.mainInfoLabel}} 
                    input={{className: css.mainInfoInput, name:"day", type:"number", min:"1", max:"31", value:day, onChange:handleChanges}} 
                    />

                <INPUT_LABEL 
                    className={css.mainInfo} 
                    label={{text: "Name", className: css.mainInfoLabel}} 
                    input={{className: css.mainInfoInput, name:"debtName", value:debtName, onChange:handleChanges, placeholder: "unique name"}} 
                    />

                <INPUT_LABEL className={css.mainInfo} 
                    label={{text:"Amount", className: css.mainInfoLabel}} 
                    input={{className: css.mainInfoInput, name:"debtAmount", type:"number", value:debtAmount, onChange:handleChanges}} 
                    />

                

            </BasicForm>
        </>
        )
}

export default ScheduledPayments