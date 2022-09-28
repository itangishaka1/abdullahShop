import { BrowserRouter as Router, Route  } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' exact component={Home} />
          <Route path='/product/:id' component={ProductPage} />
          <Route path='/cart/:id?' component={Cart} /> 
          {/* the '?' in path='/cart/:id?' means the id is optional */}
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
