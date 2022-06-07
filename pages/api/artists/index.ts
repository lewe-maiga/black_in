import {dbConnect} from "@database/mongodb"
import type {NextApiRequest, NextApiResponse} from "next"
import Artists, {Artist} from "@database/models/artists"
import {auth} from "@lib/middleware/auth"
export default async function artistsRoute(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try{
        await dbConnect()
        switch (req.method) {
            case "POST": {
                await auth(req, res)
                const createArtist = new Artists({
                    ...req.body,
                })
                createArtist
                    .save()
                    .then((artist: Artist) => res.status(200).json({artist}))
                    .catch((error: any) => res.status(500).json({error}))
                break
            }
            case "DELETE": {
                await auth(req, res);
                const {_ids: _id} = req.body;
    
                await Artists.deleteMany({
                    _id: {
                        $in: [..._id],
                    },
                });
                await Artists.find().then((artists: Artist[]) =>
                    res.status(200).json({artists})
                );
                break;
            }
            case "GET": {
                Artists.find()
                    .then((artists: Artist[]) => res.status(200).json({artists}))
                    .catch((error) => res.status(500).json({error}))
                break
            }
            default:
                res.status(500).json({msg: "request not defined"})
                break
        }
    }catch(err){
        console.error(err)
        throw err;
    }
}
