import React, { Fragment } from 'react'
// import Header from './components/Header'
// import Footer from './components/Footer'
import Logo from './logo'
import FrontPage from './pages/FrontPage'

const Header = () => (
  <div style={{ height: 90, padding: 12 }}>
    <Logo />
  </div>
)

const Footer = () => <div></div>

const App = () => (
  <Fragment>
    <Header />
    <FrontPage />
    <Footer />
  </Fragment>
)

export default App
