import {dbConnect} from "@database/mongodb"
import type {NextApiRequest, NextApiResponse} from "next"
import Artists from "@database/models/artists"
import {auth} from "@lib/middleware/auth"
export default async function artistRoute(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect()
        const {id} = req.query
        const artist = await Artists.findOne({_id: id}).then(
            (data: any) => data
        )
        if (artist) {
            switch (req.method) {
                case "GET": {
                    res.status(200).json({artist})
                    break
                }
                case "PUT": {
                    await auth(req, res)
                    Artists.updateOne({_id: id}, {...req.body}).then(() =>
                        res
                            .status(200)
                            .json({artist: {...artist._doc, ...req.body}})
                    )

                    break
                }
                case "DELETE": {
                    await auth(req, res)
                    Artists.deleteOne({_id: id}).then(() =>
                        res.status(200).json({artist})
                    )
                    break
                }
                default:
                    res.status(500).json({msg: "request not defined"})
                    break
            }
        } else {
            res.status(404).json({artist})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
