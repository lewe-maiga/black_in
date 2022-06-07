import {NextApiRequest, NextApiResponse} from "next"
import Albums from "@database/models/albums"
import {dbConnect} from "@database/mongodb"
import {auth} from "@lib/middleware/auth"
export default async function albumRoute(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect()
        const {id} = req.query
        const album = await Albums.findOne({_id: id}).then((data) => data)
        console.log(album)

        if (album) {
            switch (req.method) {
                case "GET": {
                    res.status(200).json({album})
                    break
                }
                case "PUT": {
                    await auth(req, res)
                    Albums.updateOne({_id: id}, {...req.body}).then(() =>
                        res
                            .status(200)
                            .json({album: {...album._doc, ...req.body}})
                    )
                    break
                }
                case "DELETE": {
                    await auth(req, res)

                    Albums.deleteOne({_id: id}).then(() =>
                        res.status(200).json({album})
                    )

                    break
                }
                default:
                    res.status(500).json({msg: "request not defined"})
                    break
            }
        } else res.status(404).json({album})
    } catch (error) {
        console.log("error", error)
        res.status(500).json({error})
    }
}
