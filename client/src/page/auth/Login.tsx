import { createSignal } from "solid-js";
import { reqLogin } from "../../utils/auth"
import { useNavigate } from "@solidjs/router"
import style from "../../style/login.module.css"
import { createMutation } from "@tanstack/solid-query"

export default function Login() {
    const [username, setusername] = createSignal('')
    const [password, setpassword] = createSignal('')
    const navigate = useNavigate();

    const { mutate } = createMutation(() => ({
        mutationFn: () => reqLogin(username(), password()).then((rs) => {
            rs ? navigate('/') : null
        }),
    }));

    function HandleLogin() {
        mutate()
    }

    return (
        <div class={style["login"]}>
            <div class={style["container"]}>
                <div class={style["text"]}>
                    Login Form
                </div>
                <div class={style["wrap-container"]}>
                    <div class={style["data"]}>
                        <label>UserName</label>
                        <input class={style["input"]} type="text" value={username()} required onChange={(e) => { setusername(e.target.value) }} />
                    </div>
                    <div class={style["data"]}>
                        <label>Password</label>
                        <input class={style["input"]} type="password" value={password()} required onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <div class={style["forgot-pass"]} >
                        <a class={style["forgrot_pass"]} href="#">Forgot Password?</a>
                    </div >
                    <div class={style["btn"]} >
                        <div class={style["inner"]} ></div >
                        <button class={style['btn_login']} onClick={HandleLogin} >Login</button>
                    </div >
                    <div class={style["signup-link"]} >
                        Not a member ? <a class={style['signup_text']} href="/auth/register">sign up now</a>
                    </div >
                </div >
            </div >
        </div >
    )
}