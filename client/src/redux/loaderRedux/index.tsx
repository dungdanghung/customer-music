import { onCleanup } from "solid-js";
import { createStore } from "solid-js/store";


export default function loaderRedux(store: any) {
    const [state, setState] = createStore(store.getState());
    const unsubscribe = store.subscribe(
        () => setState(store.getState())
    );
    onCleanup(() => unsubscribe());

    const on = () => store.dispatch('on')
    const off = () => store.dispatch('off')

    return [state, on, off];
};