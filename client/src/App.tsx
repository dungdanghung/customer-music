import { lazy } from "solid-js";
import { Route, Routes } from "@solidjs/router";
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
const LayoutHome = lazy(() => import('./layout/LayoutHome'))
const LayoutUser = lazy(() => import('./layout/layoutUser'))
const Home = lazy(() => import('./page/home/home'))
import style from "./style/index.module.css"
import profile from "./page/user/profile";

function App() {


  return (
    <div class={style['App']}>
      <Routes>
        <Route path="/" element={<LayoutHome />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/auth">
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Route>
        <Route path="/user" element={<LayoutUser />}>
          <Route path="/profile" component={profile} />
        </Route>
      </Routes>
    </div >
  )
}


export default App