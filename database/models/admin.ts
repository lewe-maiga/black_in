import {Schema, model, models} from "mongoose"
const key = "admin"
export type Admin = {
    _id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    type: string
    created_at: Date
}
const admin = new Schema<Admin>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
})

export default models.admin || model(key, admin)
