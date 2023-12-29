export interface song {
    'id': number,
    'song_name': string,
    'song_file': string,
    'date': Date,
    'thumbnail': string,
    'type_id': number,
    'image': string,
    'user_id': number,
    'heart': number,
    'singer': string,
    'description': string,
    'list_song': []
}

export interface dataType {
    filesong: File | null | undefined,
    fileimage: File | null | undefined,
    filethumbnail: File | null | undefined,
    songname: string,
    imagename: string,
    thumbnailname: string,
    singer: string
}