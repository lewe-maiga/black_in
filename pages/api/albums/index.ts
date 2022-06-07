import Albums, {Album} from "@database/models/albums"
import {dbConnect} from "@database/mongodb"
import {auth} from "@lib/middleware/auth"
import {NextApiRequest, NextApiResponse} from "next"

export default async function albumsRoutes(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect()
        switch (req.method) {
            case "GET": {
                Albums.find().then((artists: Album[]) =>
                    res.status(200).json({artists})
                )
                break
            }

            case "POST": {
                await auth(req, res)
                const createAlbum = new Albums({
                    ...req.body,
                })
                createAlbum
                    .save()
                    .then((artist: Album) => res.status(200).json({artist}))

                break
            }
            default:
                res.status(500).json({msg: "request not defined"})
                break
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
