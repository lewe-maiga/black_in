import {connect, connection} from "mongoose"
const uri = process.env.MONGODB_URI as string

export const dbConnect = async () => {
    return new Promise(async (resolve, reject) => {
        if (connection.readyState !== 1) {
            await connect(uri)
                .then(() => {
                    resolve("connexion reussie")
                })
                .catch((err) => {
                    reject(err)
                })
        }
        resolve("connexion reussie")
    })
}
