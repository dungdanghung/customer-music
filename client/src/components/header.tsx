import style from "../style/header.module.css"
import { A } from "@solidjs/router";
import { useUserRedux } from "../redux/index"
import { baseIMG, baseICON } from "../utils/api_config"
import { logout } from "../utils/auth"


function Header({ type = "base" }) {

    const [user] = useUserRedux()

    function handleLogout() {
        logout()
            .then((rs) => {
                rs ? location.reload() : null
            })
    }

    return (
        <div class={style["header"]}>
            <div class={style["wrap-header"]}>
                {
                    type === "full" ?
                        <div class={style["header-item1"]}>
                            <A href={"/"} class={style["logo"]}>
                                <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg" />
                            </A>
                        </div> :
                        <></>
                }
                <div class={style["header-item2"]}>
                    <div class={style["wrap-search"]}>
                        <div class={style["icon-search"]}>
                            <img src={`${baseICON}/icon/search.svg`} />
                        </div>
                        <input class={style["input_search"]} type="text" />
                    </div>
                </div>
                <div class={style["header-item3"]}>
                    <div class={style["header-item3-item"]}>
                        <div class={style["setting"]}>
                            <img src={`${baseICON}/icon/setting.svg`} />
                        </div>
                    </div>
                    {
                        user?.id ? <div class={style["header-item3-item"]}>
                            <div class={style["user"]}>
                                <img src={`${baseIMG}img/avatar/${user.avartar}`} />
                                <div class={style["popupuser"]}>
                                    <div class={style["popupuser-itemuser"]}>
                                        <div class={style["wrapicon"]}>
                                            <img src={`${baseIMG}img/avatar/${user.avartar}`} />
                                        </div>
                                        <div class={style["popupcontentuser"]}>
                                            <div class={style["wrappopupcontentuser"]}>
                                                <div class={style["username"]}>{user.firstName + user.lastName}</div>
                                                <div class={style["typeuser"]}>{user.roleName}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class={style["popupuser-itemuser"]}>
                                        <div class={style["vipbtn"]}>
                                            Nâng cấp tài khoản
                                        </div>
                                    </div>
                                    <div class={style["popupuser-itemuser"]}>
                                        <label class={style["title"]}>Cá nhân</label>
                                    </div>
                                    {
                                        user?.roleName !== "user" ?
                                            <div class={style["popupuser-itemuser"]}>
                                                <A href={"/user/profile"} class={style["profile"]}>
                                                    <img class={style['icon']} src={`${baseICON}/icon/user.svg`} />
                                                    <span>Hồ sơ</span>
                                                </A>
                                            </div> :
                                            <></>
                                    }
                                    <div class={style["popupuser-itemuser"]}>
                                        <A href={"/"} class={style["upload"]}>
                                            <img class={style['icon']} src={`${baseICON}/icon/upload.svg`} />
                                            <span>Tải lên</span>
                                        </A>
                                    </div>
                                    <div class={style["popupuser-itemuser"]}>
                                        <div onclick={handleLogout} class={style["logout"]}>
                                            Đăng xuất
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            :
                            <>
                                <A class={style["header-item3-item-signup"]} href="/auth/login">
                                    login
                                </A>
                                <A class={style["header-item3-item-signup"]} href="/auth/register">
                                    register
                                </A>
                            </>
                    }

                </div>
            </div>
        </div>
    )
}

export default Header