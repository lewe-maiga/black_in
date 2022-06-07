import type {NextApiRequest, NextApiResponse} from "next";
import {listObjetct, upload as save} from "@lib/s3";
import {auth} from "@lib/middleware/auth";

async function upload(req: NextApiRequest, res: NextApiResponse) {
    try {
        await auth(req, res);
        switch (req.method) {
            case "POST":
                await save(req).then((response: any) => {
                    res.status(200).json({...response});
                });
                break;
            case "GET":
                await listObjetct().then((response) => {
                    res.status(200).json({response});
                });
                break;
            default:
                break;
        }
    } catch (error) {
        res.status(500).json({error});
    }
}
export const config = {
    api: {
        bodyParser: false,
    },
};

export default upload;
