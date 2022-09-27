import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product/Product'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import { listProducts } from '../actions/productActions' 


const Home = () => {
  const dispatch = useDispatch()  

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  if (!products) {
    return <p>Loading...</p>
  }
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} ld={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Home
