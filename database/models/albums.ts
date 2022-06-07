import {Schema, model, models, ObjectId} from "mongoose"
import Files, {Upload} from "./upload"
const key = "albums"

export type Album = {
    title: string
    created_at: Date
    image: Upload
    musics: ObjectId[]
}

const albums = new Schema<Album>({
    title: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    image: Files,
    musics: [Schema.Types.ObjectId],
})

export default models.albums || model(key, albums)
