
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

export async function uploadAvartar(x: string, y: string, file: File) {
	try {
		const formdate = new FormData()
		formdate.append('x', x)
		formdate.append('y', y)
		formdate.append('avatar', file)
		const rs = await request.post("/user/upload-avatar", formdate)
		if (rs?.data.success) {
			return true
		}
	} catch (error: any) {
		console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
	}
}
export async function uploadBackgroundImg(x: string, y: string, file: File) {
	try {
		const formdate = new FormData()
		formdate.append('x', x)
		formdate.append('y', y)
		formdate.append('avatar', file)
		const rs = await request.post("/user/upload-background", formdate)
		if (rs?.data.success) {
			return true
		}
	} catch (error: any) {
		console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
	}
}
