import {auth} from "@lib/middleware/auth";
import {File, getFile, removeFile, upload} from "@lib/s3";
import type {NextApiRequest, NextApiResponse} from "next";
export default async function keys(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {key} = req.query;
        console.log(key);
        switch (req.method) {
            case "GET": {
                if (typeof key === "string") {
                    const readStream = getFile(key);
                    readStream.pipe(res);
                   
                }
                break;
            }
            case "DELETE": {
                await auth(req, res);
                if (typeof key === "string") {
                    await removeFile(key)
                        .then(() => {
                            res.status(200).json({msg: "fichier supprimer"});
                        })
                        .catch((err) => {
                            res.status(500).json({err});
                        });
                }
                break;
            }
            case "PUT": {
                await auth(req, res);
                if (typeof key === "string") {
                    console.log("key: ", key);
                    console.log("query: ", req.body);

                    await removeFile(key);

                    const file = await upload(req).then((data: any) => data);

                    res.status(200).json({...file});
                }
                break;
            }
            default:
                res.status(500).json({err: "request not defined"});
                break;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const config = {
    api: {
        bodyParser: false,
    },
};
