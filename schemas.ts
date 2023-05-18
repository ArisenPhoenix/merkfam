import ARGS from "./Merkurial/SQL/OBJECT_CLASS/postgreArgs";
import { Schema } from "Merkurial/SQL/OBJECT_CLASS/SQL";

const { primaryKey, serial, smallInt, varchar50, notNull, varchar20, varchar1, bool, foreignKey, unique } = ARGS;

export const debtSchema: Schema = [
    {column: "debt_id", params: [primaryKey, serial]},
    {column: "type", params: [varchar20, notNull]},
    {column: "pay_period", params: [varchar20, notNull]},
    {column: "name", params: [varchar50, notNull]},
    {column: "amount", params:  [smallInt, notNull]},
    {column: "month_due", params:  [smallInt, notNull]},
    {column: "day_due", params:  [smallInt, notNull]}
]

export const userSchema: Schema = [
    {column: "user_id", params: [primaryKey, serial]},
    {column: "username", params: [varchar20, notNull, unique]},
    {column: "first_name", params: [varchar20, notNull]},
    {column: "last_name", params: [varchar50, notNull]},
    {column: "email", params: [varchar50, notNull, unique]},
    {column: "password", params: [varchar50, notNull]},
    {column: "sex", params:  [varchar1, notNull]},
    {column: "is_user", params: [bool, notNull]},
    {column: "is_admin", params:  [bool, notNull]},
    // {column: "userDataKey", params: [foreignKey, notNull]}
]