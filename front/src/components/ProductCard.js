import Card from "react-bootstrap/Card";

function ProductCard(product) {
  return (
    <Card style={{ width: "20vw", height: "27vw", margin: "1vw" }}>
      <Card.Img
        variant="top"
        src={product.product.imgPrésentation}
        alt={product.product.name}
        style={{ height: "20vw", objectFit: "cover", width: "20" }}
      />
      <Card.Body>
        <Card.Title>{product.product.name}</Card.Title>
        <Card.Text>Prix: {product.product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
