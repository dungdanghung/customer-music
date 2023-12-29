import { createSignal } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { reqregister } from "../../utils/auth"
import style from "../../style/register.module.css"


export default function Register() {
    const [firstname, setfirstname] = createSignal('')
    const [lastname, setlastname] = createSignal('')
    const [username, setusername] = createSignal('')
    const [emailorphone, setemailorphone] = createSignal('')
    const [password, setpassword] = createSignal('')
    const [gender, setgender] = createSignal('male')
    const [birth, setbirth] = createSignal('')

    const navigate = useNavigate();

    function HandleRegister() {
        let check = true
        const clearElements = document.querySelectorAll(`.${style['wrap_label']}`)
        clearElements.forEach((element: any) => {
            element.children[1].textContent = ''
        });
        const Elements = document.querySelectorAll(`.${style['data']}`)
        Elements.forEach((element: any) => {
            if (!element.children[1].value || element.children[1].value.trim() == '') {
                element.children[0].children[1].textContent = 'field không được để trống'
                check = false
            } else if (element.children[0].children[0].textContent === "Email or Phone") {
                let value = element.children[1].value
                let checkEmailOrPhone = Array.from(value).every((item: any) => {
                    if (parseInt(item) || parseInt(item) === 0) return true
                    else return false
                })

                if (!checkEmailOrPhone && !value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    element.children[0].children[1].textContent = 'dữ liệu không hợp lệ'
                    check = false
                }
                if (checkEmailOrPhone && (value.length < 10 || value.length > 11)) {
                    element.children[0].children[1].textContent = 'dữ liệu không hợp lệ'
                    check = false

                }
            } else if (element.children[0].children[0].textContent === "Password") {
                let value = element.children[1].value
                const checkPassword = Array.from(value).every((item: any) => {
                    if (!isNaN(parseInt(item))) return true
                    return false
                })
                if (!checkPassword || value.length < 6) {
                    element.children[0].children[1].textContent = 'Mật khẩu phải từ 6 ký tự'
                    check = false
                }
            }
        });

        if (check) {
            const data = {
                firstName: firstname(),
                lastName: lastname(),
                userName: username(),
                emailorphone: emailorphone(),
                gender: gender(),
                birth: birth(),
                password: password()
            } as any;
            reqregister(data)
                .then((rs) => {
                    if (rs) navigate('/auth/login')
                })

        }
    }



    return (
        <div class={style["signup"]}>
            <div class={style["container"]}>
                <div class={style["text"]}>
                    Signup Form
                </div>
                <div class={style["wrap-container"]}>
                    <div class={style["data"]}>
                        <div class={style['wrap_label']}>
                            <label class={style['label_item']}>First Name</label>
                            <label class={style['label_item']}></label>
                        </div>
                        <input class={style['input']} type="text" value={firstname()} required onChange={(e) => { setfirstname(e.target.value) }} />
                    </div>
                    <div class={style["data"]}>
                        <div class={style['wrap_label']}>
                            <label class={style['label_item']}>Last Name</label>
                            <label class={style['label_item']}></label>
                        </div>
                        <input class={style['input']} type="text" value={lastname()} required onChange={(e) => { setlastname(e.target.value) }} />
                    </div>
                    <div class={style["data"]}>
                        <div class={style['wrap_label']}>
                            <label class={style['label_item']}>UserName</label>
                            <label class={style['label_item']}></label>
                        </div>
                        <input class={style['input']} type="text" value={username()} required onChange={(e) => { setusername(e.target.value) }} />
                    </div>
                    <div class={style["data"]}>
                        <div class={style['wrap_label']}>
                            <label class={style['label_item']}>Birth</label>
                            <label class={style['label_item']}></label>
                        </div>
                        <input class={style['input']} type="date" required onChange={(e) => { setbirth(e.target.value) }} />
                    </div>
                    <div class={[style['gender']].join(' ')}>
                        <label class={style['name_gender']}>Gender</label>
                        <div class={style["wrap-gender"]}>
                            <div class={style["gender-item"]}>
                                <span class={style['name_gender']}>Male</span>
                                <input class={style['input']} name="gender" type="radio" checked={true} onClick={(e) => { setgender("male") }} />
                            </div>
                            <div class={style["gender-item"]}>
                                <span class={style['name_gender']}>Female</span>
                                <input class={style['input']} name="gender" type="radio" onClick={(e) => { setgender("female") }} />
                            </div>
                        </div>
                    </div>
                    <div class={style["data"]}>
                        <div class={style['wrap_label']}>
                            <label class={style['label_item']}>Email or Phone</label>
                            <label class={style['label_item']}></label>
                        </div>
                        <input class={style['input']} type="text" value={emailorphone()} required onChange={(e) => { setemailorphone(e.target.value) }} />
                    </div>
                    <div class={style["data"]}>
                        <div class={style['wrap_label']}>
                            <label class={style['label_item']}>Password</label>
                            <label class={style['label_item']}></label>
                        </div>
                        <input class={style['input']} type="password" value={password()} required onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <div class={style["forgot-pass"]}>
                        <a class={style["forgot_pass"]} href="#">Forgot Password?</a>
                    </div>
                    <div class={style["btn"]}>
                        <div class={style["inner"]}></div>
                        <button class={style['btn_register']} onClick={HandleRegister} >register</button>
                    </div>
                    <div class={style["signup-link"]}>
                        Not a member? <a class={style['signup_link']} href="/auth/login">Login now</a>
                    </div>
                </div>
            </div>
        </div >
    )
}
