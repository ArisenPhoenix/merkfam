import QUERY from "../../Merkurial/SQL/QUERY"

const HANDLE_POSTGRE_TABLES = async(req, res) => {
    console.log("SUCCESSFULLY ENTERED HANDLE_POSTGRE_TABLES")
    const { method } = req
    const { query, type } = req.body
    // console.log("QUERY: ", query)
    if (type === "GET"){
        const response = await QUERY(query)
        console.log("RESPONSE: ", response)
        return res.json({...response, ok: true})
    }
    if (method === "POST"){
        const response = await QUERY(query)
        res.status(response.status)
        return res.json(response)
            
    } else if (method === "DELETE"){
        const response = await QUERY(query)
        console.log(response)
        return res.json(response)
 
    } else if (method == "GET"){
        
        // const data = response.data
        // delete response.response
        // const returnData = {data, ...response}
        // console.log(returnData)
        // return res.json(returnData)
    }
    
    
}

export default HANDLE_POSTGRE_TABLES