import {Schema, model, models} from "mongoose";
import Upload, {Upload as Files} from "./upload";
const key = "beats";

export type Beats = {
    _id: string;
    title: string;
    tempo: number;
    genre: string;
    price: number;
    format: string;
    image: Files;
    music: Files;
    created_at: Date;
    view: number;
    published: boolean;
};

export type Beat = {
    title: string;
    tempo: number;
    genre: string;
    price: number;
    format: string;
    view: number;
    published: boolean;
    music: Files;
    created_at: Date;
};
export const beat = {
    title: {type: String, required: true},
    tempo: {type: Number, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true},
    format: {type: String, required: true},
    music: Upload,
    created_at: {type: Date, default: Date.now},
};

const beats = new Schema<Beats>({
    title: {type: String, required: true},
    tempo: {type: Number, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true},
    format: {type: String, required: true},
    music: Upload,
    created_at: {type: Date, default: Date.now},
    image: Upload,
    view: {type: Number, required: true, default: 0},
    published: {type: Boolean, required: true, default: false},
});

beats.index({title: "text", review: "text"});

export default models.beats || model(key, beats);
