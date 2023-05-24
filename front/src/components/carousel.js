import Carousel from "react-bootstrap/Carousel";

function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://media.sudouest.fr/15122979/1000x500/dambin.jpg?v=1683821871"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Le retour de l'ASM</h3>
          <p>Ne rater pas le tournois de rugby à venir</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://www.hautsdefrance.fr/app/uploads/2021/10/footballfeminin-750x375-1634894538.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Soutenons les !</h3>
          <p>Les filles en championnat de France</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://www.escalade-montagne.fr/wp-content/uploads/2017/01/escalade-falaise-sae-e1585851948780-1024x544.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Le nouvel espace est arrivé</h3>
          <p>Venez découvrir ou redécouvrir les nouvelles voies d'escalade</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
