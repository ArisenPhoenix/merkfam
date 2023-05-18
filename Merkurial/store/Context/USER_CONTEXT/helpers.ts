import SQL_TABLE, { ForeignKey, ForeignKeys, ColumnInput } from "Merkurial/SQL/OBJECT_CLASS/SQL"
import { userSchema } from "../../../../schemas"

interface UserObject {
    user_id: number | null,
    username: string | null,
    first_name: string | null,
    last_name: string | null,
    password: string | null,
    sex: string | null,
    is_user: boolean,
    is_admin: boolean,
    isLoggedIn: boolean
}

interface UpdatedUserObject {
    userId: string|null|number,
    isUser: boolean,
    isAdmin: boolean,
    isLoggedIn: boolean,
    username: string|null,
    firstName: string|null,
    lastName: string|null,
    sex: string|null,
}

interface SetIsLoggingOut {
    (object: boolean): void
}

interface Messenger {
    (message: string): void
  }

export const defaultUserData: UpdatedUserObject = {
    userId: null,
    username: "",
    firstName: "",
    lastName: "",
    sex: "",
    isUser: false,
    isAdmin: false,
    isLoggedIn: false,
};

interface SetUserData {
    (userData: UpdatedUserObject): void
}

export const logoutUser = (setLoggingOut: SetIsLoggingOut, setUserData: SetUserData) => {
    setLoggingOut(true);
    setUserData(defaultUserData);
};

export const GET_USER = async (values: ColumnInput[], tablename: string, foreignKeys: ForeignKey | ForeignKeys | null) => {
    const UserTable = new SQL_TABLE(tablename, "/api/postgre_neon", userSchema, foreignKeys, null)
    const userRow = UserTable.newRow()
    const user = await userRow.findRowByColumnsAndValues(values)
    console.log("GET_USER Response: ", user)
}

export const loginUser = async (email:string, password: string, setUserData: SetUserData) => {
    if (typeof email === "string" && typeof password === "string"){
        const familyTable = new SQL_TABLE("family", "/api/login", userSchema, null, null)
        let user = await familyTable.SelectAllByValues({email: email, password: password})
        
        if (user){
            const userData: UserObject = user[0]
            
            const userInfo: UpdatedUserObject = {
                userId: userData.user_id,
                isUser: userData.is_user,
                isAdmin: userData.is_admin,
                isLoggedIn: userData.is_user || userData.is_admin,
                username: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name,
                sex: userData.sex,
            }
            setUserData(userInfo)
            return true
        }
    }
    return false
}