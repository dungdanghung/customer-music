import style from "../style/listplay_item.module.css"


function Listplay_item({ active = false, data }: any) {

    return (
        <>
            <div class={[style["nextsong__item"], style[`${active ? 'nextsong__active' : ''}`]].join(' ')}>
                <div class={style["nextsong__item-img"]}>
                    <div class={style["nextsong__item-playbtn"]}>
                        <img class={style["nextsong__item-playbtn_img"]} src={data.thumbnail} />
                    </div>
                    <div class={style["songs-item-left-img-playing-box"]} style={{ display: "none" }}>
                        {/* <img class="songs-item-left-img-playing" src={iconplaying_gif} alt="playing" /> */}
                    </div>
                    <div class={style["songs-item-left-play-icon"]} style={{ display: "flex" }}>
                        {/* <FontAwesomeIcon icon={faPlay} /> */}
                    </div>
                </div>
                <div class={style["nextsong__item-body"]}>
                    <span class={style["nextsong__item-body-heading"]}>{data.song_name}</span>
                    <span class={style["nextsong__item-body-depsc"]}>{data.singer}</span>
                </div>
                <div class={style["nextsong__item-action"]}>
                    <span class={style["nextsong__item-action-heart"]} >
                        <img class={style['icon']} src='./icon/heart.svg' />
                    </span>
                    <span class={style["nextsong__item-action-dot"]}>
                        <img class={style['icon']} src='./icon/more.svg' />
                    </span>
                </div>
            </div>
        </>
    )
}

export default Listplay_item