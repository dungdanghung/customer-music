import style from "../style/sidebar.module.css"
import { A } from "@solidjs/router";
import { baseICON } from "../utils/api_config"

function Sidebar() {

    function setActiveItemSidebar(event: any) {
        const active = document.querySelector(`.${style['sidebar__item-active']}`)
        if (active) {
            active.classList.remove(`${style['sidebar__item-active']}`)
        }
        event.target.classList.add(`${style['sidebar__item-active']}`)
    }

    return (
        <div class={style['sidebare']}>
            <div class={style['sidebar_logo']}>
                <A class={style['wrap-logo']} href="/">
                    <img class={style['logo']} src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg" />
                </A>
            </div>
            <div class={style['sidebar__persional']}>
                <ul class={style['sidebar__list']}>
                    <A class={[style['sidebar__item'], style['sidebar__item-active']].join(' ')} href="/" onclick={setActiveItemSidebar}>
                        <img src={`${baseICON}/icon/canhan.svg`} />
                        Cá Nhân
                    </A>
                    <A class={style['sidebar__item']} href="/khampha" onclick={setActiveItemSidebar}>
                        <img src={`${baseICON}/icon/khampha.svg`} />
                        Khám Phá
                    </A>
                    <A class={style['sidebar__item']} href="/zingchart" onclick={setActiveItemSidebar}>
                        <img src={`${baseICON}/icon/zingchart.svg`} />
                        #zingchart
                    </A>
                    <A class={style['sidebar__item']} href="/radio" onclick={setActiveItemSidebar}>
                        <img src={`${baseICON}/icon/radio.svg`} />
                        Radio
                        <span class={style['sidebar__item-radio-item']}>Live</span >
                    </ A>
                    <A class={style['sidebar__item']} href="/follow" onclick={setActiveItemSidebar}>
                        <img src={`${baseICON}/icon/follow.svg`} />
                        Theo Dõi
                    </ A>
                </ul >
            </div >
            <div class={style['distance']}>
            </div><div class={style['sidebar__library']}>
                <div class={style['wrap__sidebar__library']}>
                    <div class={style['sidebar__library-top']}>
                        <ul class={style['sidebar__list']}>
                            <A href="/newsong" class={style['sidebar__item']} onclick={setActiveItemSidebar}>
                                <img src={`${baseICON}/icon/nhacmoi.svg`} />
                                Nhạc Mới
                            </A>
                            <A href="/typesong" class={style['sidebar__item']} onclick={setActiveItemSidebar}>
                                <img src={`${baseICON}/icon/theloai.svg`} />
                                Thể Loại
                            </A>
                            <A href="/top100" class={style['sidebar__item']} onclick={setActiveItemSidebar}>
                                <img src={`${baseICON}/icon/top100.svg`} />
                                Top 100
                            </A>
                            <A href="/mv" class={style['sidebar__item']} onclick={setActiveItemSidebar}>
                                <img src={`${baseICON}/icon/MV.svg`} />
                                MV
                            </A>
                        </ul >
                    </div >
                    <div class={style['sidebar__library-center']}>
                        <span class={style['sidebar__library-center-vip-heading']}>Nghe nhạc không quảng cáo cùng kho nhạc VIP</span>
                        <A class={style['js__toast']} href="/vip">Nâng cấp VIP</A>
                    </div >
                    <div class={style['sidebar__library-bot']} >
                        <div class={style['sidebar__library-bot-heading']} > Thư viện</div >
                        <ul class={style['sidebar__list']}>
                            <A href="/song" class={style['sidebar__item']} onclick={setActiveItemSidebar}>
                                <img src={`${baseICON}/icon/baihat.svg`} />
                                Bài hát
                            </A>
                            <A href="/playlist" class={style['sidebar__item']} onclick={setActiveItemSidebar}>
                                <img src={`${baseICON}/icon/playlist.svg`} />
                                Playlist
                            </A>
                            <A href="/ganday" class={style['sidebar__item']} onclick={setActiveItemSidebar}>
                                <img src={`${baseICON}/icon/ganday.svg`} />
                                Gần đây
                            </A>
                        </ul >
                    </div >
                </div >
            </div >
        </div >
    )
}

export default Sidebar