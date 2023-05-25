import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function ProductCard(product) {
  console.log(product.product);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={product.product.imgPrésentation}
        alt={product.product.name}
      />
      <Card.Body>
        <Card.Title>{product.product.name}</Card.Title>
        <Card.Text>Prix: {product.product.price}</Card.Text>
      </Card.Body>
      {/* <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body> */}
    </Card>
  );
}

export default ProductCard;
