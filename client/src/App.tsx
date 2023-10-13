import { Router, Route, Routes } from "@solidjs/router"
import Login from './page/auth/Login'
import Register from './page/auth/Register'
import './App.css'

function App() {

  return (
    <div class="App">
      <Router>
        <Routes>
          <Route path={'login'} component={Login} />
          <Route path={'register'} component={Register} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
