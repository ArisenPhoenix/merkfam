import ARGS from "./postgreArgs"
import FETCH from "../../API_STORAGE/APIS/FETCH"
import CONVERT_CONSTRUCTOR_TO_CREATE_TABLE_IF_NOT_EXISTS from "../HELPERS/convertObjectToQuery.js"

export type Key = string|number
export type Value = string | null | number | boolean
export type Param = string
export type Params = Param[]
export type ColumnName = string
export type RowName = string

export interface InitialResponse {
  RowCtor: any,
  command: any, 
  rowCount: number|null, 
  oid: null | number | string, 
  rows: RowsResponse, 
  fields: Object[], 
  _parsers: null[]|string[]|number[]
} 

/**
 * ColumnEntry is a key value pair, the key being the column name and the value the value within that column
 * @param {ColumnName} column - column name used within the table
 * @param {Value} value - Value within the the column and row
 */
export interface ColumnEntry {
  column: ColumnName
  value: Value
}

/** Cell is a structured column entry which allows for arrays, it is a dictionary with pre-defined keys
 * @param {ColumnName} column - key is column
 * @param {Value} value - key is value
 */
export interface Cell {
  [column: ColumnName]: [value: Value]
}

/** Column Data is a Single Entry For A Schema and has predefined Keys
 * @param {ColumnName} column is column and is always a string
 * @param {Params} params is a string array of SQL column arguments needed for creating the table i.e FOREIGN KEY or VARCHAR
 */
export interface ColumnData {
  column: ColumnName;
  params: Params;
}

/** Schema is an array of objects containing Column Data - key being column values being a Param Array
 * @param {ColumnName}
 * @param {Params}
 */
export type Schema = ColumnData[]

/** ColumnInput - an object of containing column Names as keys and values within as values
 * @param {ColumnName} key - the key just must be a string
 * @param {Value} value - the value within that cell
 */
export type ColumnInput = {[key: ColumnName]: Value}


/** Primary Key - a very simple object with {key: "", value: } structure
 * @param {ColumnName} key - the name of the column containing the Primary Key
 * @param {Value} value - the value of the primary key - must be a string or number
 */
export interface PrimaryKey {
  key: ColumnName;
  value: Key
}

export interface RowsResponse {
  rows: ColumnInput[]
} 

/** ForeignKey - data used for the foreign key within an SQL table
 * @param {string} - the name of the table being referred to
 * @param {ColumnName} - the name of the column being referenced for the table that contains the foreign key
 */
export interface ForeignKey {
  table: string;
  columnName: ColumnName;
}

export type ForeignKeys = ForeignKey[]

/** Messenger - a simple interface being used to allow a call back function for purposes of messages within an app
 * @param {string} message - a parameter needed to send data back to the callback
 * @returns {void|string}
 */
interface Messenger {
  (message: string): void
}

export type Sex = "M" | "F"



export interface TABLE_RESPONSE {
  ok: boolean,
  rows: RowsResponse|null,
  err: string|null|boolean
  message: string|null,
  hasTable: boolean|null|undefined
}

 
export default class SQL_TABLE {
  tableName: string;
  callAddress: string
  tableSchema: Schema | null;
  columnNames: string[]|null
  foreignKeys: ForeignKey | ForeignKey[] | null;
  primaryKey: PrimaryKey|null;
  primaryKeyData: ColumnData;
  hasTable: boolean;
  tableDataObj: object;
  messenger: Messenger | null

  constructor(
    tableName: string,
    callAddress: string,
    tableSchema: Schema | null,
    foreignKeys: ForeignKey | ForeignKey[] | null,
    messenger: Messenger | null
  ){
    this.callAddress = callAddress ? callAddress : null 
    this.tableName = tableName;
    this.columnNames = []
    this.foreignKeys = foreignKeys ? foreignKeys : null
    this.hasTable = false;
    this.messenger = messenger ? messenger : null
    this.primaryKey = {key: null, value: null}
    this.tableDataObj = {}
    tableSchema && this.construct(tableSchema)
    this.tableSchema = tableSchema
  }

  construct = (tableSchema: Schema) => {
    (tableSchema).forEach((column) => {
      this.columnNames.push(column.column)
      const params = column.params
      params.forEach((arg) => {
        if (arg === "PRIMARY KEY"){
          if ( !this.primaryKeyData){
            this.primaryKeyData = column
            this.primaryKey.key = column.column
            
          } else {
            throw new Error("A Table May Only Have Up To 1 Primary Key")
          }
        }
        this.tableDataObj[column.column] = column.params
      })
      if (!this.primaryKeyData){
        throw new Error("Your Table Must Contain A PRIMARY KEY")
      }
    })
  }

  properties = () => {
    return this
  }

  call = async (query: any, method: string, address: string, callingFunction: string|null|undefined) => {
    const response = await FETCH
    (
      address,
      method,
      {query: query.query, type: query.type},
      callingFunction
    );
    if (response.ok){
      this.hasTable = method !== "DELETE" ? true : false
      if (this.messenger != null){
        response.message && this.messenger(`Table ${this.tableName} ${response.message}`)
      }
      return response
    }
  }

  query = async (query:string, method: string, callAddress:string, callingFunction:string = "SQL.query") => {
    const res = await this.call({query: query}, method, callAddress, callingFunction)
    return res
  }

  CREATE_TABLE = async() => {
    const queryText = CONVERT_CONSTRUCTOR_TO_CREATE_TABLE_IF_NOT_EXISTS(
      this.tableName, 
      this.tableDataObj, 
      this.foreignKeys
    ); 
    const response = await this.call({query: queryText}, "POST", this.callAddress, "SQL.CREATE_TABLE")
    return {...response, hasTable: this.hasTable}

    }

  HAS_TABLE = async () => {
    if (!this.hasTable){
      const tableData = await this.CREATE_TABLE()
      return tableData.hasTable
    } else {
      return this.hasTable
    }
  }

  DELETE_TABLE = async () => {
    const queryText = `DROP TABLE ${this.tableName}`;
    const response = await this.call({query: queryText}, "DELETE", this.callAddress, "SQL.DELETE_TABLE")
    const data = this.HANDLE_RESPONSE(response, true)
    if (data.ok){
      return data
    }
    return {...response, hasTable: this.hasTable}
  };

  

  GET_TABLE = async ()  => {
    const text = `SELECT * FROM ${this.tableName}`
    const response = await this.call({query: text, type: "GET"}, "POST", this.callAddress, "Debt.GET_TABLE")
    const rows = response.response.rows
    const data = this.HANDLE_RESPONSE(response)
    if (data.ok){
      
    }
    if (rows.length > 0){
      return rows
    } else {
      this.messenger(`Table ${this.tableName} Contains No Rows`)
    }
  }

  /**
   * @param columnVals required - The values for the entry | must match schema value structure in length and type
   * @param callAddress optional - the address for making api calls to defaults to the same as the Table Class
   * @param messager optional - a call back function with a single parameter for returning a message back, defaults to the same as the Table Class
   * @returns a new table column class with it's own various methods
   */

  FindRowById = async (id:Key) => {
    const rowId = typeof id === "string" ? `'${id}'` : typeof id === "number" ? id : null
    if (!rowId){
      throw new TypeError("That Id Is Not Of Type Number Nor String")
    }
    const query = `SELECT * FROM ${this.tableName} WHERE "${this.primaryKey.key}" = ${rowId}`
    const response = await this.call({query: query}, "POST", this.callAddress, "Row.FindRowById")
    const data = this.HANDLE_RESPONSE(response)
    if (data.ok){
      if (Array.isArray(data.rows) && data.rows.length > 0){
        return data.rows
      } else {
        return null
      }
    }
    // return data.error
  }

  checkArgs = (args: ColumnInput) => {
    const argArr = Object.keys(args)
    argArr.forEach((argument, index) => {
      if (!this.tableSchema[argument]){
        throw new Error(`You entered a column that does not exist within the current schema. at index ${index}`)
      }
    })
    return true;
  }

  Where = (columnName: ColumnName, value: Value) => {
    let val = value
    if (typeof val === "string"){
      val = `'${value}'`
    }
    return `"${columnName}" = ${val} `
  }

  Wheres = (args: ColumnInput) => {
    let query = "WHERE "
    const entries = Object.entries(args)
    entries.forEach((entry, index) => {
      const addend = index === entries.length - 1 ? "" : "AND "   
      query += this.Where(entry[0], entry[1]) + addend
    })
    return query
  }

  selectedColumns = (args: ColumnInput) => {
    let query = ""
    const entries = Object.entries(args)
    entries.forEach((entry, index) => {
      const [column, value] = entry
      if (!this.tableDataObj[column]){
        throw new Error(`Column ${column} does not exist on table ${this.tableName}. `)
      }
      const addend = index === entries.length - 1 ? "" : ", "
      query += `"${column}${addend}"`
    })
    return query
  }

  SelectAllByValues = async (object: ColumnInput) => {
    const WHERES = this.Wheres(object)
    const query = `SELECT * FROM ${this.tableName} ${WHERES}`
    const response = await this.call({query: query}, "POST", this.callAddress, "SQL.SelectAllByValues")
    const data = this.HANDLE_RESPONSE(response)
    if (data.ok) {
      return data.rows
    }
    return response
  }

  protected HANDLE_RESPONSE = (response: any, deleted:boolean=false):TABLE_RESPONSE =>  {
    // console.log("RESPONSE: \n", response)
    if(response.response && !response.message){
      if (!deleted){
        this.hasTable = true
        const rows = response.response.rows
        if (rows.length > 0){
          return {rows: rows, ok: response.ok, err: false, message: response.message, hasTable: this.hasTable}
        }
        return {ok: false, message: "No Results For The Selected Query", rows: null, err: null, hasTable: this.hasTable}
      } else {
        if (!response.message){
          this.hasTable = false
        }
        return {ok: false, err: response.message, rows: null, hasTable: this.hasTable, message: response.message}
      }
    } else if (response.message) {
      return {ok: false, err: response.message, message: response.message, rows: response.rows, hasTable: this.hasTable}
    } else {
      return {...response, message: "There was an error along the way. WHOOPS!", rows: null}
    }
  }

  SelectBySelectColumnsAndValues = async (object: ColumnInput) => {
    const WHERES = this.Wheres(object)
    const Selected = this.selectedColumns(object)
    const query = `SELECT ${Selected} FROM ${this.tableName} ${WHERES}`
    const response = await this.call({query: query}, "POST", this.callAddress, "SQL.SelectBySelectColumnsAndValues")
    const data = this.HANDLE_RESPONSE(response)
    if (data.ok){
      return data
    } else {
      return {ok: false, rows: null}
    }
  }

  getId = async (args: ColumnInput) => {
    const query = this.SelectAllByValues(args)
    const response = await this.call({query: query}, "POST", this.callAddress, "Row.getId")
    const data = this.HANDLE_RESPONSE(response)
    if (data.ok){
      if (Array.isArray(data.rows) && data.rows.length > 0){
        return data.rows[0][`${this.primaryKey.key}`]
      }
      return null
    } else {
      return data.message
    }
  }

  newRow = (values: Value[]|undefined = null, callAddress: string|undefined = null, messager: Messenger|undefined = null) => {
    return new Row(
      this.tableName,
      this.tableSchema,
      this.columnNames,
      values ? values : null,
      callAddress ? callAddress : this.callAddress,
      this.foreignKeys,
      this.hasTable,
      this.primaryKeyData,
      this.primaryKey,
      messager ? messager : this.messenger,
      )
  }

}

class Row extends SQL_TABLE {
  columnValues: any[] | undefined
  columnNames: string[] | null
  list: any[] | null
  tableName: string
  columnInfo: object | null
  callAddress: string | null
  hasTable: boolean
  foreignKeys: ForeignKey | ForeignKey[] | null
  primaryKey: PrimaryKey | null
  primaryKeyData: ColumnData | null
  address: string | null
  isPopulated: boolean
  
  messenger: Messenger | null
  
  constructor(
    tableName: string,
    tableSchema: Schema,
    columnNames: string[],
    columnValues: any[],
    callAddress: string,
    foreignKeys: ForeignKey | ForeignKey[] | null,
    hasTable: boolean,
    primaryKeyData: ColumnData | null,
    primaryKey: PrimaryKey,
    messenger: Messenger | null,
    ) {
    super(tableName, callAddress, tableSchema, foreignKeys, messenger);
    this.list = []
    this.columnNames = columnNames
    this.hasTable = hasTable
    this.primaryKeyData = primaryKeyData
    this.primaryKey = primaryKey
    this.columnValues = columnValues
    this.columnInfo = {}
    columnValues?.length > 0 && this.construct(this.tableSchema)
    this.isPopulated = columnValues.length > 0 ? true : false
  }
  
  
  construct = (tableSchema: Schema) => {
    this.tableSchema = tableSchema
    
    for (let i = 0; i < tableSchema.length; i++){
      this.columnInfo[this.columnNames[i]] = this.columnValues[i]
    }

    this.primaryKey.key = this.primaryKeyData.column
    
    // VERIFY INFO HAS BEEN PROVIDED PROPERLY
    if (!this.primaryKey.key){
      throw new Error("Debt Class Must Contain A Primary Key with both a column and a params[] attribute")
    }
    
    // Check if primary key is SERIAL or not
    // If it is then the values should contain one less item than the names: SERIAL provides the primary key upon entering the row into the DB
    // Otherwise they should match
    // If either condition is not met then an Error is thrown
    if (this.tableSchema){
      console.log("TABLE SCHEMA: ", this.tableSchema)
      console.log("Values: ", this.columnValues)
      if (this.primaryKeyData.params.indexOf(ARGS.serial) > -1){
        if (this.columnNames.length !== this.columnValues.length + 1){
          throw new Error("For SERIAL, The Lengths of Values Provided Do Not Match With The Provided Schema Added Into The Generic Table Class.")
        } else if (this.columnNames.length === this.columnValues.length){
          throw new Error("For SERIAL, You Mustn't Supply The Primary Key as A VALUE For the Row As It Will Be Generated Automatically.")
        }
      } else if (this.columnNames.length !== this.columnValues.length){
        throw new Error("The Lengths of Values Provided Do Not Match With The Provided Schema Added Into The Generic Table Class.")
      }
    }

    this.columnNames.shift()
    
    for (let index = 0; index < this.columnValues.length; index++){
      this.list.push([this.columnNames[index], this.columnValues[index]])
    }
  }

  addRow = async (tableName: string = this.tableName) => {
    const query = this.getAddQueryString(tableName)
    const response = await this.call({query: query}, "POST", this.callAddress, "Row.addRow" )
    if (response?.ok){
      this.hasTable = response.ok
    }
    return {...response, hasTable: this.hasTable};
    }

  getTableData(primaryKey:Key, value:Value|null = null){
    if (!this.columnValues){
      throw new Error("Class Debt Has Not Been Populated With Data Yet.")
    }
    
    if (this.primaryKeyData.params.indexOf(ARGS.serial) >= 0){
      const tableList = [...this.list]
      tableList.unshift([primaryKey, value])
      return tableList
    }
    return this.list
  }

  private getAddQueryString(tableName: string = this.tableName, primaryKey: Key = this.primaryKey.key){
    let id = primaryKey
    if (!id){
      throw new Error("Couldn't find the primary key for this table")
    }

    const tableList = this.getTableData(id)

    let tableColumns = ""
    let columnValues = ""
    let text = `INSERT INTO "${tableName}" ( `;
    
    tableList.forEach((item, index) => {
      const space = index === tableList.length - 1 ? " " : ", ";
      let column = item[0]
      let value = item[1]
      if (this.tableSchema[index].params.indexOf(ARGS.bool) >= 0){
        // if a boolean then leave the variables as is
        if (typeof value !== "boolean"){
          throw new Error("Boolean Type ColumnName Values Must Be Booleans")
        }
      } else {
        column = `"${column}"`;
        value = `'${value}'`;
      }
      
      tableColumns += column + space;
      if (index === 0){
        columnValues += `) VALUES (DEFAULT, `;
      } else {
        columnValues += value + space;
      }
    });

    columnValues += `);`;
    text += tableColumns
    text += columnValues
    return text;

  }

  private compareAllColumns = () => {
    const colNames = this.columnNames
    const colVals = this.columnValues
    let text = ""
    for (let i = 0; i < colNames.length; i++){
      const col = colNames[i]
      const value = colVals[i]
      const addend = i === colNames.length - 1 ? "" : "AND"
      text += `"${col}" = '${value}' ${addend} `
    }
    return text
  }

  getIdByAllValuesQuery = () => {
    const allCompared = this.compareAllColumns()
    const query = `SELECT ${this.primaryKey.key} FROM ${this.tableName} WHERE ${allCompared}`
    return query
  }

  getId = async () => {
    const query = this.getIdByAllValuesQuery()
    const response = await this.call({query: query}, "POST", this.callAddress, "Row.getId")
    if (!response.message){
      this.hasTable = true
      const rows = response.response.rows
      if (rows.length > 0){
        return rows[0][`${this.primaryKey.key}`]
      } else {
        return null
      }
    } else {
      return response.message
    }
  }

  compareAllColumnInputs = (arr: ColumnInput[]) => {
    let colNames = []
    let colVals = []
    for (let i = 0; i < arr.length; i++){
      const [key, value] = Object.entries(arr[i])
      colNames.push(key)
      colVals.push(value)
    }

    let text = ""
    for (let i = 0; i < colNames.length; i++){
      const col = colNames[i]
      const value = colVals[i]
      const addend = i === colNames.length - 1 ? "" : "AND"
      text += `"${col}" = '${value}' ${addend} `
    }
    return text
  }

  findRowByColumnsAndValues = async (arr: ColumnInput[]) => {
    const query = this.compareAllColumnInputs(arr)
    const response = await this.call({query: query, type: "GET"}, "POST", "/api/postgre_neon", null)
    return response
  }
}


  
