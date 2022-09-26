import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
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

const ProductPage = ({ match }) => {
  const [ product, setProduct ] = useState(null)
  // const product = products.find((product) => product._id === match.params.id)
  const productId = match.params.id

  useEffect(() => {
      axios.get(`http://localhost:5100/api/products/${productId}`)
         .then(response => {
          setProduct(response.data)
         })
         .catch(err => {
          console.log(err)
         })
  }, [productId])

  if(!product) {
    return <p>Loading....</p>
  }
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
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
    </>
  )
}

export default ProductPage
