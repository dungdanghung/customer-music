import request from "./api_config";

export async function reqLogin(username: string, password: string) {
    try {
        const rs = await request.post("/auth/login", {
            username: username,
            password: password
        })
        if (rs.status == 200) {
            return rs.data.token as string;
        }
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function reqregister(data: any) {
    try {
        const rs = await request.post("/auth/register", {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            emailorphone: data.emailorphone,
            gender: data.gender,
            birth: data.birth,
            password: data.password
        })
        if (rs.status == 200) return true
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}