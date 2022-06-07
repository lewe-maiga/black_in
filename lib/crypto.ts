import {randomBytes, scryptSync, timingSafeEqual} from "crypto"
import type {Admin} from "@database/models/admin"

export const encrypt = (password: string) => {
    const salt = randomBytes(16).toString("hex")
    const hash = scryptSync(password, salt, 64).toString("hex")

    return `${salt}:${hash}`
}
export const decrypt = ({password: pass}: Admin, password: string) => {
    const [salt, key] = pass.split(":")
    const hashBuffer = scryptSync(password, salt, 64)
    const keyBuffer = Buffer.from(key, "hex")
    const match = timingSafeEqual(hashBuffer, keyBuffer)
    if (match) {
        return true
    } else {
        return false
    }
}
