import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function FormProduct() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nom du Produit</Form.Label>
        <Form.Control type="text" placeholder="Nom du produit" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Url de l'image principale</Form.Label>
        <Form.Control type="text" placeholder="Image" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Url des autre images</Form.Label>
        <Form.Control type="text" placeholder="Images" />
      </Form.Group>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Année du Produit</Form.Label>
          <Form.Control type="text" placeholder="Année d'achat" />
          <Form.Text className="text-muted">
            Depuis quand nous avons le produit
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Prix</Form.Label>
          <Form.Control type="text" placeholder="Année d'achat" />
          <Form.Text className="text-muted">Sous forme "**€"</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Quantité</Form.Label>
          <Form.Control type="Number" placeholder="Qantité" />
        </Form.Group>
      </div>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormProduct;
