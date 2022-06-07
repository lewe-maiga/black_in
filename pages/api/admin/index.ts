import type {NextApiRequest, NextApiResponse} from "next"
import {encrypt} from "@lib/crypto"
import Admin, {Admin as AdminType} from "@database/models/admin"
import {auth} from "@lib/middleware/auth"
import {dbConnect} from "@database/mongodb"

export default async function adminRoute(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect()
        const count = await Admin.countDocuments({}).then(
            (response: any) => response
        )
        console.log(count)

        switch (req.method) {
            case "POST": {
                if (count >= 1) {
                    await auth(req, res)
                }
                const {password} = req.body

                const hashedPassword = encrypt(password)
                const createAdmin = new Admin({
                    ...req.body,
                    password: hashedPassword,
                })
                const admin = await createAdmin
                    .save()
                    .then((response: AdminType) => response)
                res.status(200).json({admin})
                break
            }
            case "GET": {
                const admins = await Admin.find().then(
                    (response: AdminType[]) => response
                )

                const admin = admins.map(
                    ({
                        _id,
                        firstName,
                        lastName,
                        email,
                        type,
                        created_at,
                    }: AdminType) => ({
                        _id,
                        firstName,
                        lastName,
                        email,

                        type,
                        created_at,
                    })
                )

                res.status(200).json({admin})

                break
            }
            default:
                res.status(500).json({msg: "request not defined"})
                break
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
