import type {NextApiRequest, NextApiResponse} from "next"
import {decrypt} from "@lib/crypto"
import {sign} from "jsonwebtoken"
import Admin, {Admin as AdminType} from "@database/models/admin"
import {dbConnect} from "@database/mongodb"

const mySecretToken = process.env.TOKEN as string

export default async function register(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect()

        if (req.method === "POST") {
            console.log("token", mySecretToken)
            const {email, password} = req.body
            const wrongUserPassMsg = "Incorrect username and/or password."
            if (!email) {
                return res.status(422).json({error: "Email required"})
            }
            if (!password)
                return res.status(422).json({error: "Password required."})

            const user = await Admin.findOne({email}).then(
                (response: AdminType) => response
            )

            if (!user) return res.status(401).json({error: wrongUserPassMsg})
            const result = decrypt(user, password)
            if (result) {
                const paylod = {sub: user._id}
                const token = sign(paylod, mySecretToken, {expiresIn: "5h"})
                return res.status(200).json({token, _id: user._id})
            } else {
                res.status(401).json({error: wrongUserPassMsg})
            }
        } else {
            res.status(500).json({msg: "request not defined"})
        }
    } catch (err) {
        res.status(500).json({err: err})
        throw err
    }
}
