import { onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { song } from "../../models/song"


export default function songRedux(store: any, actions: any) {
    const [state, setState] = createStore(store.getState());
    const unsubscribe = store.subscribe(
        () => setState(store.getState())
    );
    onCleanup(() => unsubscribe());
    const { setsong, addlistsong, remove } = mapActions(store, actions)
    return [
        state,
        setsong,
        addlistsong,
        remove
    ];
};

function mapActions(store: any, actions: any) {
    type setTypeActionMethord = { setsong: object, addlistsong: object, remove: object }
    const mapped = {} as setTypeActionMethord
    mapped.setsong = ({ ...args }: song) => store.dispatch(actions['setsong']({ ...args }));
    mapped.addlistsong = ([...args]: any) => store.dispatch(actions['addListSong']([...args]));
    mapped.remove = () => store.dispatch(actions['delete']);
    return mapped;
}
