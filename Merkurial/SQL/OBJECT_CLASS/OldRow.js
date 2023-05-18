  // newRow = (columnVals: any[]|undefined, callAddress:string|null = null, messager: Messenger|null=null) => {
  //   const hasTable = this.hasTable
  //   const columns = this.tableSchema
  //   const columnValues = columnVals
  //   const tablename = this.tablename
  //   const columnNames = this.columnNames
  //   const primaryKey = this.primaryKey
  //   const foreignKeys = this.foreignKeys
  //   const serverAddress = callAddress ? callAddress : this.callAddress
  //   const thisQuery = this.query
  //   const call = this.call
  //   const messenger = messager ? messager : this.messenger
  //   console.log("COLUMN VALUES: ", columnVals)

  //   class Row {
  //     columnValues: any[] | undefined
  //     columnNames: string[] | null
  //     list: any[] | null
  //     tableName: string
  //     columnInfo: object | null
  //     callAddress: string | null
  //     id: string|null
  //     hasTable: boolean
  //     foreignKeys: ForeignKey[] | null
  //     primaryKey: PrimaryKey | null
  //     primaryKeyData: Column | null
  //     address: string | null
  //     messenger: Messenger | null
  
  //     constructor(
  //       values: any[] | undefined,
  //     ){
  //       this.primaryKey = primaryKey
  //       this.hasTable = hasTable
  //       this.foreignKeys = foreignKeys
  //       this.tableName = tablename
  //       this.columnInfo = columns
  //       this.list = []
  //       this.columnValues = values;
  //       this.columnNames = columnNames
  //       this.callAddress = serverAddress
  //       this.messenger = messenger

  //       if (this.columnValues?.length > 0){
  //           this.construct(this.columnValues)
  //       }
  //     }

  //     construct = (columnValues: any[]) => {
  //       this.columnValues = columnValues
  //       if (!this.primaryKey){
  //         Object.keys(this.columnInfo).forEach((col: string) => {
  //           const colData = this.columnInfo[col]
  //           colData.forEach((arg: string) => {
  //             if (arg === "PRIMARY KEY"){
  //               if (this.primaryKeyData){
  //                 throw new Error("Only One Primary Key May Be Present Per Row")
  //               }
  //               this.primaryKeyData = {column: col, params: this.columnInfo[col]}
  //             }
  //           })
  //         })
  //       }
  //       this.id = this.primaryKeyData.column
        
  //       // VERIFY INFO HAS BEEN PROVIDED PROPERLY
  //       if (!this.id){
  //         throw new Error("Debt Class Must Contain A Primary Key with both a column and a params[] attribute")
  //       }
        
  //       // Check if primary key is SERIAL or not
  //       // If it is then the values should contain one less item than the names: SERIAL provides the primary key upon entering the row into the DB
  //       // Otherwise they should match
  //       // If either condition is not met then an Error is thrown

  //       if (this.primaryKeyData.params.indexOf(ARGS.serial) > -1){
  //         if (this.columnNames.length !== this.columnValues.length + 1){
  //           throw new Error("For SERIAL, The Lengths of Values Provided Do Not Match With The Provided Schema Added Into The Generic Table Class.")
  //         } else if (this.columnNames.length === this.columnValues.length){
  //           throw new Error("For SERIAL, You Mustn't Supply The Primary Key as A VALUE For the Row As It Will Be Generated Automatically.")
  //         }
  //       } else if (this.columnNames.length !== this.columnValues.length){
  //         throw new Error("The Lengths of Values Provided Do Not Match With The Provided Schema Added Into The Generic Table Class.")
  //       }
        
  //       this.columnNames.shift()
        
  //       for (let index = 0; index < this.columnValues.length; index++){
  //         this.list.push([this.columnNames[index], this.columnValues[index]])
  //       }
  //   }
  
  //     properties() {
  //       return this;
  //     }

  //     query = thisQuery
  
  //     getTableData(debt_id:string|null, value = null){
  //       if (!this.columnValues){
  //         throw new Error("Class Debt Has Not Been Populated With Data Yet.")
  //       }
  //       const tableList = [...this.list]
  //       if (this.primaryKeyData.params.indexOf(ARGS.serial) >= 0){
  //         tableList.unshift([debt_id, value])
  //       }
        
  //       return tableList
  //     }

      
  
  //     private getAddQueryString(tableName: string = this.tableName, debt_id: string|null = null){
  //       let id = debt_id
  //       if (!id){
  //         id = this.id
  //       }

  //       const tableList = this.getTableData(id)

  //       let tableColumns = ""
  //       let columnValues = ""
  //       let text = `INSERT INTO "${tableName}" ( `;
        
  //       tableList.forEach((item, index) => {
  //         const space = index === tableList.length - 1 ? " " : ", ";
  //         let column = item[0]
  //         let value = item[1]
          
  //         if (this.columnInfo[column].indexOf(ARGS.bool) >= 0){
  //           // value = this.validateBool(value)
  //           if (typeof value !== "boolean"){
  //             throw new Error("Boolean Type Column Values Must Be Booleans")
  //           }
  //         } else {
  //           column = `"${column}"`;
  //           value = `'${value}'`;
  //         }
          
  //         tableColumns += column + space;
  //         if (index === 0){
  //           columnValues += `) VALUES (DEFAULT, `;
  //         } else {
  //           columnValues += value + space;
  //         }
  //       });
  
  //       columnValues += `);`;
  //       text += tableColumns
  //       text += columnValues
  //       return text;
  
  //     }
  
  //     addRow = async (tableName: string = this.tableName) => {
  //       const query = this.getAddQueryString(tableName)
  //       const response = await call({query: query}, "POST", this.callAddress, "Row.addRow" )
  //       if (response?.ok){
  //         this.hasTable = response.ok
  //       }
  //       console.log("ADD ROW RESPONSE: ", response)
  //       return {...response, hasTable: this.hasTable};
  //       }
  
  //     private getColumnNames = (): string[] => {
  //       return Object.keys(columns)
  //     }

  //     private compareAllColumns = () => {
  //       const colNames = this.columnNames
  //       const colVals = this.columnValues
  //       let text = ""
  //       for (let i = 0; i < colNames.length; i++){
  //         const col = colNames[i]
  //         const value = colVals[i]
  //         const addend = i === colNames.length - 1 ? "" : "AND"
  //         text += `"${col}" = '${value}' ${addend} `
  //       }
  //       return text
  //     }

  //     private getIdByAllValuesQuery = () => {
  //       const allCompared = this.compareAllColumns()
  //       const query = `SELECT ${this.primaryKey.column} FROM ${this.tableName} WHERE ${allCompared}`
  //       return query
      
  //     }

  //     getId = async () => {
  //       const query = this.getIdByAllValuesQuery()
  //       const response = await call({query: query}, "POST", this.callAddress, "Row.getId")
  //       console.log("RESPONSE: ", response)
  //       return response.response.rows[0][this.id]
  //     }

  //     findRowById = async (id:string|number) => {
  //       const rowId = typeof id === "string" ? `'${id}'` : typeof id === "number" ? id : null
  //       if (!rowId){
  //         throw new Error("That Id Is Not Of Type Number Nor String")
  //       }
  //       const query = `SELECT * FROM ${this.tableName} WHERE "${this.id}" = ${rowId}`
  //       const response = await call({query: query}, "POST", this.callAddress, "Row.findRowById")
  //       return response.response.rows[0]
  //     }


  //   }
  //   const newDebt = new Row(columnValues)
  //   return newDebt
  // }