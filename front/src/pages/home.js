import HomeCarousel from "../components/carousel";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <h1>La ligue sportive d'Auvergne</h1>
      <HomeCarousel />
      <p>Home page content</p>
      <Footer />
    </div>
  );
}
