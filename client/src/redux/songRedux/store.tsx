// @ts-nocheck
import { createStore } from 'redux';
import { song as modelSong } from "../../models/song"

const songHandle = (state = {} as modelSong, action) => {
    switch (action.type) {
        case "SET_SONG":
            return {
                ...action.song
            };
        case "ADD_LIST_SONG":
            action.list.forEach((element, index) => {
                if (state.id && element.id == state.id) {
                    action.list.splice(index, 1)
                }
            });
            return {
                ...state,
                "list_song": action.list
            }
        case "DELETE":
            return {
                'id': null,
                'song_name': "",
                'song_file': "",
                'date': null,
                'thumbnail': "",
                'type_id': "",
                'image': "",
                'user_id': null,
                'heart': null,
                'singer': "",
                'description': "",
                'list_song': []
            }
        default:
            return state;
    }
};

export default createStore(songHandle);