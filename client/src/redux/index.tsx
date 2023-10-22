import userRedux from "./userRedux/index"
import reduxStore from "./userRedux/store"
import actions from "./userRedux/actions"

export function useUserRedux() {
    const [user, { setuser }] = userRedux(reduxStore, actions);
    return [user, setuser]
}
