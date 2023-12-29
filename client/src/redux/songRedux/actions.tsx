// @ts-nocheck
export default {
    setsong: song => ({ type: "SET_SONG", song }),
    addListSong: list => ({ type: "ADD_LIST_SONG", list }),
    delete: { type: "DELETE" }
};
