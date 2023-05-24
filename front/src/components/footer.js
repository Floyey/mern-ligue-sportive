import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <img className="logo" src="logo.png" alt="logo" />
        <div>
          <img
            className="network"
            src="https://cdn-icons-png.flaticon.com/512/1400/1400829.png"
            alt=""
          />
          <img
            className="network"
            src="https://www.svgrepo.com/show/90412/youtube-symbol.svg"
            alt=""
          />
          <img
            className="network"
            src="https://www.pngitem.com/pimgs/m/165-1657001_black-and-white-twitter-logo-png-transparent-png.png"
            alt=""
          />
        </div>
        <address>
          <p>130 avenue des gobelins, 63013 Clermont-Ferrand</p>
          <p>+33 9 88 51 22 74</p>
          <p>LigueSportiveAuvergne@support.com</p>
        </address>
      </div>
      <p>LigueSportiveAuvergne© 2023 Tous droits réservés ®</p>
    </div>
  );
}
