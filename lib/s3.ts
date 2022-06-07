import {createReadStream} from "fs";
import {randomBytes} from "crypto";
import {S3, config} from "aws-sdk";
import {IncomingForm} from "formidable";
import {NextApiRequest} from "next";
export type Upload = {
    mimetype: string;
    originalFilename: string;
    filepath: string;
    size: number;
};
export type FileInput = {
    name: string;
    path: string;
    type: string;
    size: number;
    url?: string;
};

const ID = process.env.S3_ACCESS_KEY;
const SECRET = process.env.S3_SECRET_KEY;
const BUCKET_NAME = process.env.S3_BUCKET_NAME ?? "black-industry";

config.update({
    credentials: {
        accessKeyId: ID ?? "",
        secretAccessKey: SECRET ?? "",
    },
    region: "eu-west-3",
});

const s3 = new S3();
export const convertFile = (file: Upload) => {
    const type = file.mimetype;
    const name = file.originalFilename;
    const path = file.filepath;
    const size = file.size;
    return {
        name,
        path,
        type,
        size,
    };
};

export const listObjetct = () => {
    const params = {
        Bucket: BUCKET_NAME,
    };
    return s3.listObjects(params).promise();
};

export const getFile = (key: string) => {
    const params = {
        Key: key,
        Bucket: BUCKET_NAME,
    };
    
    return s3.getObject(params).createReadStream()
};
export const replace = (file: FileInput) => {
    const regexExt = /\.(mp3|wav|jpg|png|jpeg)/;
    const regexName = /[&\/\\#, +()$~%.'":*?<>{}\-]/g;
    const split = file?.name.split(regexExt);
    const name = split[0].replace(regexName, "_").toLowerCase();
    const hash = randomBytes(10).toString("hex");
    const ext = split[1];
    const url = `upload_${name}_${hash}.${ext}`;
    return {
        ...file,
        name,
        url,
    };
};

export type File = {
    name: string;
    key: string;
    type: string;
    size: number;
};

const save = async (file: FileInput): Promise<File> => {
    const data = replace(file);

    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: data.url,
            Body: createReadStream(file.path),
        };
        const {Key: key} = await s3.upload(params).promise();

        return {
            name: data.name,
            key,
            type: data.type,
            size: data.size,
        };
    } catch (error) {
        throw error;
    }
};

export const upload = async (req: NextApiRequest) => {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm({
            multiples: true,
            keepExtensions: false,
            uploadDir: "",
        });
        form.parse(req, async (err, _, files) => {
            switch (Object.keys(files).length) {
                case 0:
                    reject("file required");
                    break;
                case 1: {
                    if (!files["image"] && !files["music"]) {
                        reject("just only image or music file");
                    }
                    let file = files["image"]
                        ? convertFile(files["image"] as Upload)
                        : convertFile(files["music"] as Upload);

                    const data = await save(file);
                    resolve({file: data});
                    break;
                }
                // case 2: {
                //     let file = convertFile(files["image"] as Upload);
                //     const image = await save(file);
                //     if (!Array.isArray(files["music"])) {
                //         file = convertFile(files["music"] as Upload);
                //         const music = await save(file);
                //         resolve({image, music});
                //     } else {
                //         const tracks = files["music"];
                //         const music = [];
                //         for (const track of tracks) {
                //             file = convertFile(track as Upload);
                //             music.push(await save(file));
                //         }
                //         resolve({image, music});
                //     }
                //     break;
                // }
                default:
                    reject("only image and music");
                    break;
            }
        });
    });
};

export const removeFile = async (key: string) => {
    return s3
        .deleteObject({
            Bucket: BUCKET_NAME,
            Key: key,
        })
        .promise();
};
