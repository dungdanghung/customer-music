import style from "../style/loader.module.css"

function Loader({ width_height = 75, border = 15 }: any) {
    document.documentElement.style.setProperty("--width_height_loader", `${width_height}px`);
    document.documentElement.style.setProperty("--border_loader", `${border}px`);
    return (
        <div class={style["loader"]}></div >
    )
}

export default Loader