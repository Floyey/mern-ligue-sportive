import Card from "react-bootstrap/Card";

function ProductCard(product) {
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
    </Card>
  );
}

export default ProductCard;
