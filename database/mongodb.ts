import {connect, connection} from "mongoose"
const uri = process.env.MONGODB_URI as string

export const dbConnect = async () => {
    return new Promise(async (resolve, reject) => {
        console.log("cache: ", connection.readyState)
        if (connection.readyState !== 1) {
            await connect(uri)
                .then(() => {
                    console.log("connexion reussie")
                    console.log("cache: ", connection.readyState)
                    resolve("connexion reussie")
                })
                .catch((err) => {
                    console.log("echec")
                    reject(err)
                })
        }
        resolve("connexion reussie")
    })
}
