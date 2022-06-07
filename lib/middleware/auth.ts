import {verify} from "jsonwebtoken"
import {NextApiRequest, NextApiResponse} from "next"

const mySecretToken = process.env.TOKEN || "secret_token"

export const auth = async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject) => {
        if (!req.headers.authorization) {
            res.status(403).json({error: "No token."})
            reject("No token")
        } else {
            const token = req.headers.authorization.split(" ")[1]
            console.log(token)
            const payload = verify(token, mySecretToken)
            console.log(payload)
            resolve({payload})
        }
    })
}
