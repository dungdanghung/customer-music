import { Outlet } from "@solidjs/router";
import Header from "../components/header";
import { Switch, Match, Suspense } from "solid-js";
import { createQuery } from "@tanstack/solid-query"
import { getuser } from "../utils/user"
import style from "../style/index.module.css"
import profileStyle from "../style/profile.module.css"
import Loader from "../components/loader";

function layoutUser() {
    const query = createQuery(() => ({
        queryKey: ['user'],
        queryFn: () => getuser(),
        refetchOnWindowFocus: false
    }))

    return (
        <Switch>
            <Match when={query.isLoading}><div id='loader' class={style['loading']}></div></Match>
            <Match when={query.isError}>
                <WrapPage></WrapPage>
            </Match>
            <Match when={query.isSuccess}>
                <Suspense fallback={<Loader width_height={50} border={5} />}>
                    <WrapPage></WrapPage>
                </Suspense>

            </Match>
        </Switch>
    )
}

function WrapPage() {
    return (
        <div class={profileStyle['profilepage']}>
            <div class={profileStyle['wrapprofile']}>
                <Header type="full" />
                <Outlet />
            </div>
        </div >

    )
}

export default layoutUser