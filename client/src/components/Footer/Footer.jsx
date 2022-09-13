import { Container, Row, Col } from 'react-bootstrap'
import './Footer.scss'


const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Copyright &copy; AbdullahShop
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer