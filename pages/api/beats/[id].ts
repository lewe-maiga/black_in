import {NextApiRequest, NextApiResponse} from "next"
import Beats, {Beats as Beat} from "@database/models/beats"
import {dbConnect} from "@database/mongodb"
import {auth} from "@lib/middleware/auth"

const beatRoutes = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await dbConnect()
        const {id} = req.query
        const beat = await Beats.findOne({_id: id}).then((data: any) => data)
        if (beat) {
            switch (req.method) {
                case "GET": {
                    res.status(200).json({beat})
                    break
                }
                case "PUT": {
                    await auth(req, res)
                    Beats.updateOne({_id: id}, {...req.body}).then(() => {
                        res.status(200).json({
                            beat: {...beat._doc, ...req.body},
                        })
                    })

                    break
                }
                case "DELETE": {
                    await auth(req, res)
                    Beats.deleteOne({_id: id}).then(() =>
                        res.status(200).json({beat})
                    )

                    break
                }
                default:
                    res.status(500).json({msg: "request not defined"})
                    break
            }
        } else {
            res.status(404).json({beat})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

export default beatRoutes
