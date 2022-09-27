import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap'
import Rating from '../components/Rating/Rating'
import { productDetails } from '../actions/productActions'
import Loader from '../components/Loader/Loader'
import Message from '../components/Message/Message'

const ProductPage = ({ match }) => {
  const dispatch = useDispatch()

  const product_details = useSelector(state => state.productDetails) // this productDetails is from store.js

  const { loading, error, product }  = product_details


  useEffect(() => {
    dispatch(productDetails(match.params.id))
  }, [dispatch, match])

  if(!product) {
    return <p>Loading....</p>
  }
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
          {/* fluid will keep the image inside the container if the image was going out of its container */}
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <div className='d-grid gap-2'>
                  <Button type='button' disabled={product.countInStock === 0}>
                    Add To Cart
                  </Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )}
    </>
  )
}

export default ProductPage
