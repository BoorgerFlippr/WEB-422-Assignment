import { Container, Row, Col } from "react-bootstrap"

export default function MovieDetails(props){
    return(
        <Col>
            <Row>
                <Col md><img src={`${props.movie?.poster}`} alt="poster" className="w-100"/></Col>
                <strong>Directed By:</strong>{props.movie?.directors}<br/><br/>
                {props.movie?.plot}
                <p>MovieDetails</p>
            </Row>
        </Col>
    )
}