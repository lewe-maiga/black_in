import {Schema, model, models} from "mongoose"
const key = "description"
export type Description = {
    heading_main: string
    content_main: string
    heading_secondary: string
    content_secondary: string
    [key: string]: string
}
const description = new Schema<Description>({
    heading_main: {
        type: String,
        required: true,
        default: "Cupiditate in quia repudiandae",
    },
    content_main: {
        type: String,
        required: true,
        default:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate in quia repudiandae voluptates esse, perferendis doloremque, nostrum libero fugit alias nam quae. Id, voluptas. In accusantium explicabo modi veniam dolorem.",
    },
    heading_secondary: {
        type: String,
        required: true,
        default: "In accusantium explicabo modi",
    },
    content_secondary: {
        type: String,
        required: true,
        default:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate in quia repudiandae voluptates esse, perferendis doloremque, nostrum libero fugit alias nam quae. Id, voluptas. In accusantium explicabo modi veniam dolorem.",
    },
})

export default models.description || model(key, description)
