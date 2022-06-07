import {Schema, model, models} from "mongoose";
import Upload, {Upload as Files} from "./upload";
const key = "artists";
export type Artist = {
    pseudo: string;
    image: Files;
    created_at: Date;
    published: boolean;
    content: string;
};
export type Artists = {
    _id: string;
    pseudo: string;
    image: Files;
    created_at: Date;
    published: boolean;
    content: string;
};
const artists = new Schema<Artist>({
    pseudo: {type: String, required: true},
    image: Upload,
    created_at: {type: Date, default: Date.now},
    published: {type: Boolean, required: true, default: false},
    content: {type: String, required: true, default: "lorem"},
});

export default models.artists || model(key, artists);
