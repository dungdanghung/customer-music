import { createSignal } from "solid-js";
import { reqLogin } from "../../utils/auth"
import { getuser } from "../../utils/user"
import { useUserRedux } from "../../redux/index"
import { useNavigate } from "@solidjs/router"
import "./Login.scss"

export default function Login() {
    const [username, setusername] = createSignal('')
    const [password, setpassword] = createSignal('')
    const navigate = useNavigate();
    const [, setuser] = useUserRedux()

    function HandleLogin() {
        reqLogin(username(), password())
            .then((rs) => {
                if (rs) {
                    window.localStorage.setItem('token', JSON.stringify(rs))
                    getuser()
                        .then((rs) => {
                            if (rs) {
                                setuser(rs)
                                navigate("/home");
                            }
                        })
                }
            })
    }

    return (
        <div class="login">
            <div class="container">
                <div class="text">
                    Login Form
                </div>
                <div class="wrap-container">
                    <div class="data">
                        <label>UserName</label>
                        <input type="text" value={username()} required onChange={(e) => { setusername(e.target.value) }} />
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
                        <button onClick={HandleLogin} >Login</button>
                    </div>
                    <div class="signup-link">
                        Not a member? <a href="/register">sign up now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}