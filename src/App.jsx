// import AppRouter from './routers/AppRouter'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './pages/PageAbout'

import './scss/styles.scss'

function App() {

  return (
    <>
      <div className="wrapper">
        <Header />
        <About />
        <Footer />
      </div>
    </>
  )
}

export default App