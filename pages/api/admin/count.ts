import type {NextApiRequest, NextApiResponse} from "next"
import Admin from "@database/models/admin"
import {dbConnect} from "@database/mongodb"

export default async function count(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect()
        await Admin.countDocuments({}).then((response: any) =>
            res.status(200).json({count: response})
        )
    } catch (error) {
        res.status(500).json({error})
    }
}
