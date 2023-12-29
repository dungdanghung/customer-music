import request from "./api_config";


export async function reqLogin(username: string, password: string) {

    try {
        const formdata = new FormData()
        formdata.append('username', username)
        formdata.append('password', password)
        const rs = await request.post("/auth/login", formdata)
        if (rs?.data.success && rs?.data.data.token) {
            window.localStorage.setItem('token', JSON.stringify(rs.data.data.token))
            return true
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}


export async function reqregister(data: any) {
    try {
        const formdate = new FormData()
        formdate.append('firstName', data.firstName)
        formdate.append('lastName', data.lastName)
        formdate.append('userName', data.userName)
        formdate.append('emailorphone', data.emailorphone)
        formdate.append('gender', data.gender)
        formdate.append('birth', data.birth)
        formdate.append('password', data.password)
        const rs = await request.post("/auth/register", formdate)
        if (rs.data.success) {
            return true
        }
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function logout() {
    try {
        const rs = await request.post("/auth/logout")
        if (rs.data.success) {
            return true
        }
    } catch (error) {

    }
}