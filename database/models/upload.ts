export type Upload = {
    name: string
    key: string
    type: string
    size: number
}
const upload = {
    name: {type: String, required: true},
    key: {type: String, required: true},
    type: {type: String, required: true},
    size: {type: Number, required: true},
}
export default upload
