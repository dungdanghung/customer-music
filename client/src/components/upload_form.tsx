import { baseIMG, baseICON } from "../utils/api_config"
import { useUserRedux } from "../redux/index"
import { createSignal, createEffect } from "solid-js"
import style from "../style/upload_form.module.css"
import toast from "../helper/toast"
import { dataType } from "../models/song"
import { upload } from "../utils/music"



function Form_uploadsong({ closepopup }: any) {
    const [user] = useUserRedux()
    const [backgrounduploadtype, setbackgrounduploadtype] = createSignal("normal")
    // const [text, settext] = useState('')
    const [statusoffileinput, setstatusoffileinput] = createSignal("off")
    const [songname, setsongname] = createSignal("")
    const [authername, setauthername] = createSignal("")
    const [imagesong, setimagesong] = createSignal("")
    const [thumbnailsong, setthumbnailsong] = createSignal("")
    // const heightofinputcomment = useRef()


    function closepopupuploadfile(e: MouseEvent) {
        const element = (e.target as HTMLElement)
        if (element.className === style["popupthemmoi"] || element.className === style['close']) {
            closepopup()
        }
    }
    function uploadfile() {
        const file = document.querySelector("#filesong") as HTMLInputElement
        const image = document.querySelector("#imagesong") as HTMLInputElement
        const thumbnail = document.querySelector("#thumbnailsong") as HTMLInputElement
        const data: dataType = {
            filesong: file.files?.item(0),
            fileimage: image.files?.item(0),
            filethumbnail: thumbnail.files?.item(0),
            songname: songname(),
            imagename: imagesong(),
            thumbnailname: thumbnailsong(),
            singer: authername()
        };
        const checkData: boolean = Object.keys(data).every((key: string) => {
            if (!data[key as keyof dataType] || key == '') return false
            else return true
        });
        if (!checkData) {
            toast.error('Điền đầy đủ thông tin')
        } else {
            upload(data)
        }
    }
    function changetypeupload(e: any) {
        if (e.target.className === style["normalsong"]) setbackgrounduploadtype("normal")
        if (e.target.className === style["specialsong"]) setbackgrounduploadtype("special")
    }
    function clickchosefile(e: any) {
        e.target.children[0]?.click()
        setstatusoffileinput("off")
    }
    function handlefileinput(type: any) {
        return (e: any) => {
            if (type === "imagesong") {
                setimagesong(e.target.files[0].name)
                const a = document.querySelector(`#${style['wrapdiskuploadthumbnail']}`) as HTMLImageElement
                const b = document.getElementById(style["diskuploadthumbnail"]) as HTMLImageElement
                var fr = new FileReader();
                fr.onload = function () {
                    a.src = fr.result as typeof a.src;
                    b.src = fr.result as typeof b.src;
                }
                fr.onloadend = () => {
                    setstatusoffileinput("on")
                    b.style.display = "block"
                }
                if (e.target.files.length !== 0) {
                    fr.readAsDataURL(e.target.files[0]);
                }
            } else if (type === "namesong") {
                setsongname(e.target.files[0].name)
                setstatusoffileinput("on")
            } else if (type === "thumbnailsong") {
                setthumbnailsong(e.target.files[0].name)
                const a = document.querySelector(`.${style["thumbnailsong"]}`) as HTMLImageElement
                var fr = new FileReader();
                fr.onload = function () {
                    a.src = fr.result as typeof a.src;
                }
                fr.onloadend = () => {
                    a.style.display = "block"
                    setstatusoffileinput("on")
                }
                if (e.target.files.length !== 0) {
                    fr.readAsDataURL(e.target.files[0]);
                }
            }
        }
    }

    createEffect(() => {
        const a = document.querySelector(`.${style['wrapdisk']}`) as HTMLElement
        const b = document.querySelector(`.${style['disk']}`) as HTMLElement
        if (a && b) {
            if (statusoffileinput() === "off") {
                a.style.left = "0%"
                b.style.left = "0%"
            } else {
                a.style.left = "-30%"
                b.style.left = "25%"
            }
        }
    }, [statusoffileinput()])

    return (
        <form class={style["popupthemmoi"]} onClick={closepopupuploadfile}>
            <div class={style["popupcontentuploadfile"]}>
                <div class={style["contentitem"]}>
                    <div class={style["headeritemcontent"]}>
                        <div class={style["wrapavatar_nameandtime"]}>
                            <div class={style["avatar"]}>
                                <img class={style['img']} src={`${baseIMG}img/avatar/${user.avartar}`} />
                            </div>
                            <div class={style["nameandtime"]}>
                                <div class={style["name"]}>{user.userName}</div>
                            </div>
                        </div>
                        <button type="reset" class={style["close"]} id={style["closepopupuploadfile"]}>
                            <img class={style['img']} src={`${baseICON}/icon/close.svg`} />
                        </button>
                    </div>
                    <div class={style["optionupload"]}>
                        <div onClick={changetypeupload} class={style["normalsong"]} style={{ "background-color": backgrounduploadtype() === "normal" ? "#afafaf63" : "transparent" }}>
                            Quyền người dùng
                        </div>
                        <div onClick={changetypeupload} class={style["specialsong"]} style={{ "background-color": backgrounduploadtype() === "special" ? "#afafaf63" : "transparent" }}>
                            Quyền tác giả
                        </div>
                    </div>
                    <div class={style["maincontent"]}>
                        <div class={style["content"]}>
                            <div class={style["wrapdisk"]}>
                                <img id={style["wrapdiskuploadthumbnail"]} src={`${baseIMG}img/orther/music_128x128.png`} />
                            </div>
                            <div class={style["disk"]} style={{ "left": "0%", "animation-play-state": 'paused' }}>
                                <img id={style["diskuploadthumbnail"]} src="" style={{ display: "none" }} />
                            </div>
                        </div>
                        <img class={style["thumbnailsong"]} src="" style={{ display: "none" }} />
                    </div>

                    <div class={style["detailinfor"]}>
                        <div class={style["wrapinfor"]}>
                            <textarea
                                class={style['inputvalue']}
                                name="inputnamesong"
                                onInput={(e) => { setsongname(e.target.value) }}
                                placeholder="name song"
                                value={songname()}
                            />
                            <div class={style["btnsetfile"]} onClick={clickchosefile}>
                                chose file
                                <input class={style['input']} id="filesong" type="file" onInput={handlefileinput("namesong")} />
                            </div>
                        </div>
                    </div>
                    <div class={style["detailinfor"]}>
                        <div class={style["wrapinfor"]}>
                            <textarea
                                class={style['inputvalue']}
                                name="inputimagesong"
                                onInput={(e) => { setimagesong(e.target.value) }}
                                placeholder="image song"
                                value={imagesong()}
                            />
                            <div class={style["btnsetfile"]} onClick={clickchosefile}>
                                chose file
                                <input class={style['input']} id="imagesong" type="file" onInput={handlefileinput("imagesong")} />
                            </div>
                        </div>
                    </div>
                    <div class={style["detailinfor"]}>
                        <div class={style["wrapinfor"]}>
                            <textarea
                                class={style['inputvalue']}
                                name="inputthumbnailsong"
                                onInput={(e) => { setthumbnailsong(e.target.value) }}
                                placeholder="thumbnail song"
                                value={thumbnailsong()}
                            />
                            <div class={style["btnsetfile"]} onClick={clickchosefile}>
                                chose file
                                <input class={style['input']} id="thumbnailsong" type="file" onInput={handlefileinput("thumbnailsong")} />
                            </div>
                        </div>
                    </div>
                    <div class={style["detailinfor"]}>
                        <div class={style["wrapinfor"]}>
                            <textarea
                                class={style['inputvalue']}
                                name="inputauther"
                                onInput={(e) => { setauthername(e.target.value) }}
                                placeholder="tac gia"
                                value={authername()}
                            />
                        </div>
                    </div>
                    <div class={style["btmpuload"]}>
                        <span class={style['text']} onClick={uploadfile}> Thêm mới </span>
                    </div>
                </div>
            </div>
        </form>
    )
}


export default Form_uploadsong