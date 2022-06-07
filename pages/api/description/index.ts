import type {NextApiRequest, NextApiResponse} from "next"
import Description, {Description as Desc} from "@database/models/description"
import {auth} from "@lib/middleware/auth"
import {dbConnect} from "@database/mongodb"
export default async function description(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect()
        switch (req.method) {
            case "PUT": {
                await auth(req, res)

                const count = await Description.countDocuments({}).then(
                    (response) => response
                )
                console.log(count)

                if (count === 0) {
                    const createDescription = new Description({
                        ...req.body,
                    })
                    createDescription.save().then((response: Desc) => {
                        res.status(200).json({response})
                    })
                } else {
                    Description.updateMany({}, {...req.body}).then(
                        (response) => {
                            res.status(200).json({response})
                        }
                    )
                }

                break
            }
            case "GET": {
                Description.find().then((response) =>
                    res.status(200).json({...response[0]._doc})
                )
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
