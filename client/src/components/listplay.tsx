import style from '../style/listplay.module.css'
import Listplay_item from './listplay_item'
import { useSongRedux } from "../redux/index"
import { Show, Suspense, createResource, createSignal, createEffect, Switch, Match } from "solid-js"
import Loader from './loader'
import { createInfiniteQuery } from "@tanstack/solid-query"



function Listplay() {
    const [song] = useSongRedux()


    return (
        <div class={style['listmusic']}>
            <div class={style['nextsong__option']}>
                <div class={style['nextsong__option-wrapper']}>
                    <div
                        class={[style['nextsong__option-wrapper-listplay'], style['nextsong__option-wrapper--active']].join(' ')}>
                        Danh sách phát</div>
                    <div
                        class={style['nextsong__option-wrapper-listplay']}>
                        Nghe gần đây</div>
                </div>
                <div class={style['nextsong__option-alarm']}>
                    <img class={style['icon']} src='./icon/heart.svg' />
                </div>
                <div class={style['nextsong__option-more']}>
                    <img class={style['icon']} src='./icon/more.svg' />
                </div>
            </div>

            <div class={style['wrap__nextsong__box']}>
                {/* <Switch>
                    <Match when={query.isPending}><Loader width_height={50} border={5} /></Match>
                    <Match when={query.isError}>Error</Match>
                    <Match when={query.isFetchingNextPage}><Loader width_height={50} border={5} /></Match>
                    <Match when={query.isSuccess}>
                        <div class={style['nextsong__box']}>
                            {
                                song?.id ?
                                    <>
                                        <ul class={style['wrapnextsong__box']} onload={() => console.log(123)}>
                                            <li class={style["nextsong__fist"]}>
                                                <Listplay_item active={true} data={song} />
                                            </li>
                                        </ul>
                                        <h3 class={style["nextsong__last-heading"]}>Tiếp theo</h3>
                                    </> :
                                    <></>
                            }
                            {
                                song?.list_song ?
                                    song.list_song.map((item: any) => {
                                        return (
                                            <ul class={style['wrapnextsong__box']} >
                                                <li class={style["nextsong__fist"]}>
                                                    <Listplay_item active={false} data={item} />
                                                </li>
                                            </ul>
                                        )
                                    }) :
                                    <></>
                            }
                        </div>
                    </Match>
                </Switch> */}
            </div>

        </div >
    )
}

export default Listplay