import { Container } from 'react-bootstrap'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to abdullahShop</h1>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
