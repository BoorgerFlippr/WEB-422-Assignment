import Card from 'react-bootstrap/Card';

export default function PageHeader(props){
    return (
        <>
        <Card>
          <Card.Body>{props.text}</Card.Body>
        </Card>
        <br/>
        </>
    )
}