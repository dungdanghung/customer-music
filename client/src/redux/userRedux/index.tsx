import { onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { user } from "../../models/user"


export default function userRedux(store: any, actions: any) {
    const [state, setState] = createStore(store.getState());
    const unsubscribe = store.subscribe(
        () => setState(store.getState())
    );
    onCleanup(() => unsubscribe());
    return [
        state,
        mapActions(store, actions)
    ];
};

function mapActions(store: any, actions: any) {
    type setTypeActionMethord = { setuser: object }
    const mapped = {} as setTypeActionMethord
    mapped.setuser = ({ ...args }: user) => store.dispatch(actions['setuser']({ ...args }));
    return mapped;
}
