import { createSignal } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { reqregister } from "../../utils/auth"
import "./Register.scss"

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
        const data = {
            firstname: firstname(),
            lastname: lastname(),
            username: username(),
            emailorphone: emailorphone(),
            gender: gender(),
            birth: birth(),
            password: password()
        } as any;
        let check = true
        Object.keys(data).forEach((item) => {
            if (!data[item] || data[item].trim() === "") {
                check = false
            }
            if (item === "emailorphone") {
                const a = Array.from(data[item]).every((item: any) => {
                    if (parseInt(item) || parseInt(item) === 0) return true
                    else return false
                })
                if (!a && !data[item].includes("@gmail.com")) {
                    check = false
                    console.log(0)
                }
                if (a && (data[item].length < 10 || data[item].length > 11)) {
                    check = false
                }
            }
            if (item === "password") {
                const a = Array.from(data[item]).every((item: any) => {
                    if (!isNaN(parseInt(item))) return true
                    return false
                })
                if (!a || data[item].length < 6) {
                    check = false
                    console.log(123)
                }
            }
        })
        if (check) {
            reqregister(data)
                .then((rs) => {
                    if (rs) {
                        navigate("/login");
                    }
                })
        } else {
            console.log('err')
        }
    }

    return (
        <div class="signup">
            <div class="container">
                <div class="text">
                    Signup Form
                </div>
                <div class="wrap-container">
                    <div class="data">
                        <label>First Name</label>
                        <input type="text" value={firstname()} required onChange={(e) => { setfirstname(e.target.value) }} />
                    </div>
                    <div class="data">
                        <label>Last Name</label>
                        <input type="text" value={lastname()} required onChange={(e) => { setlastname(e.target.value) }} />
                    </div>
                    <div class="data">
                        <label>UserName</label>
                        <input type="text" value={username()} required onChange={(e) => { setusername(e.target.value) }} />
                    </div>
                    <div class="data">
                        <label>Birth</label>
                        <input type="date" required onChange={(e) => { setbirth(e.target.value) }} />
                    </div>
                    <div class="data gender">
                        <label>Gender</label>
                        <div class="wrap-gender">
                            <div class="gender-item">
                                <span>Male</span>
                                <input name="gender" type="radio" checked={true} onClick={(e) => { setgender("male") }} />
                            </div>
                            <div class="gender-item">
                                <span>Female</span>
                                <input name="gender" type="radio" onClick={(e) => { setgender("female") }} />
                            </div>
                        </div>
                    </div>
                    <div class="data">
                        <label>Email or Phone</label>
                        <input type="text" value={emailorphone()} required onChange={(e) => { setemailorphone(e.target.value) }} />
                    </div>
                    <div class="data">
                        <label>Password</label>
                        <input type="password" value={password()} required onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <div class="forgot-pass">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <div class="btn">
                        <div class="inner"></div>
                        <button onClick={HandleRegister} >sign up</button>
                    </div>
                    <div class="signup-link">
                        Not a member? <a href="#">Login now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
