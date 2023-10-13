import request from "./api_config";


export async function getuser() {
    try {
        let token = window.localStorage.getItem('token')
        token = JSON.parse(token!)
        const rs = await request.get("/user/getuser", {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        if (rs) return rs.data
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}