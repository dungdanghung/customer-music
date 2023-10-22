import request from "./api_config";
import { user } from "../models/user"


export async function getuser() {
    try {
        const rs = await request.get("/user/getuser")
        if (rs.status == 200) return rs.data as user
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}