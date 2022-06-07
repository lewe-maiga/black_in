import type {NextApiRequest, NextApiResponse} from "next"
import Admin, {Admin as AdminType} from "@database/models/admin"
import {encrypt} from "@lib/crypto"
import {auth} from "@lib/middleware/auth"
import {dbConnect} from "@database/mongodb"

export default async function adminRoute(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect()

        const {id} = req.query
        const admin = await Admin.findOne({_id: id}).then((data: any) => data)
        if (admin) {
            const adminWithoutPassword = {
                _id: admin._id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                type: admin.type,
                created_at: admin.created_at,
            }
            switch (req.method) {
                case "GET": {
                    res.status(200).json({admin: adminWithoutPassword})
                    break
                }
                case "PUT": {
                    await auth(req, res)
                    const {password} = req.body
                    let result: AdminType

                    if (password) {
                        const hash = encrypt(password)
                        result = {...admin._doc, ...req.body, password: hash}
                    } else {
                        result = {...admin._doc, ...req.body}
                    }
                    Admin.updateOne({_id: id}, {...result}).then(() =>
                        res
                            .status(200)
                            .json({admin: {...admin._doc, ...result}})
                    )

                    break
                }
                case "DELETE": {
                    await auth(req, res)
                    Admin.deleteOne({_id: id}).then(() =>
                        res.status(200).json({admin})
                    )
                    break
                }
                default:
                    throw new Error("request not defined")
            }
        } else {
            res.status(404).json({admin})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
