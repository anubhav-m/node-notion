import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

export default function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col">
				<Header />
				<Routes >
					<Route path='/' element={<Home />}></Route>
					<Route path='/about' element={<About />}></Route>
					<Route path='/sign-up' element={<SignUp />}></Route>
					<Route path='/sign-in' element={<SignIn />}></Route>
					<Route element={<PrivateRoute />}>
						<Route path='/dashboard' element={<Dashboard />}></Route>
					</Route>
					<Route path='/projects' element={<Projects />}></Route>
				</Routes>
			</div>
			<Footer />

		</BrowserRouter>
	)
}