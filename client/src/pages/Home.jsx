import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' //! (1)
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product/Product'
import { listProducts } from '../actions/productActions' //! (2)

const Home = () => {
  const dispatch = useDispatch()  //! (3)

  //! (6)
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  //! (5)
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  if (!products) {
    return <p>Loading...</p>
  }
  return (
    <>
      <h1>Latest Products</h1>
      {/* //! (7) */}
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
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
