
import request from "./api_config";
import { useUserRedux } from "../redux/index"
import { user } from "../models/user"



export async function getuser() {
    const [, setuser] = useUserRedux()
    try {
        const rs = await request.get("/user/getuser")
        if (rs?.data.success && rs?.data.data as user) {
            setuser(rs.data.data)
            return true
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}
