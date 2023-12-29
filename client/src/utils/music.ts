import request from "./api_config";
import { dataType } from "../models/song";

export async function getSongHot() {
    try {
        const rs = await request.get('/music/getsonghot')
        if (rs.status == 200) return rs.data
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function getSongHistory() {
    try {
        const rs = await request.get('/music/getsonghistory')
        if (rs.status == 200) return rs.data
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function getSongInteract() {
    try {
        const rs = await request.get('/music/getsonginteract')
        if (rs.status == 200) return rs.data
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

export async function upload(data: dataType) {
    const formData = new FormData();
    Object.keys(data).every((key: string) => {
        formData.append(key, data[key as keyof dataType] as keyof dataType);
        return true
    })
    try {
        const rs = await request.post('/music/upload', formData)
    } catch (error: any) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}