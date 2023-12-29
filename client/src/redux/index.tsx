import userRedux from "./userRedux/index"
import songRedux from "./songRedux/index";
import loaderRedux from "./loaderRedux/index";
import userStore from "./userRedux/store"
import songStore from "./songRedux/store";
import loaderStore from "./loaderRedux/store"
import userActions from "./userRedux/actions"
import songActions from "./songRedux/actions"


export function useUserRedux() {
    const [user, { setuser }] = userRedux(userStore, userActions);
    return [user, setuser]
}

export function useSongRedux() {
    const [song, setsong, addlistsong, remove] = songRedux(songStore, songActions);
    return [song, setsong, addlistsong, remove]
}

export function loadingRedux() {
    const [Loading, on, off] = loaderRedux(loaderStore)
    return [Loading, on, off]
}