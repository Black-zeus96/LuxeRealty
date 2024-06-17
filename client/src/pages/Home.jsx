import React from "react";

export default function Home() {
  return (
    <div>
      <div id="body">
        {/* Hero Section */}
        <section className="section-hero">
          <div className="container-hero">
            <div className="hero-textbox">
              <h1 className="heading-level-one primary-black">
                Discover a place you'll love to live in
              </h1>
              <p className="subheading-level-one">
                Find the perfect luxury property tailored to your exquisite
                taste and lifestyle needs. Our curated collection features only
                the finest homes to ensure you experience the epitome of
                sophistication.
              </p>
              <button className="cta-black">Explore Listings</button>
            </div>
            <div className="hero-imagebox">
              <img
                src="./src/assets/images/hero1.jpg"
                alt="An image of red house in the hero section of home page."
              />
            </div>
          </div>
        </section>

        {/* Featured companies section */}
        <section className="section-featuredin">
          <h2 className="heading-level-two">As Featured In:</h2>
          <div className="container-featuredin">
            <img
              src="./src/assets/images/skynewslogo-black.svg"
              alt="Logo of Sky News"
            />
            <img
              src="./src/assets/images/bbclogo-black.svg"
              alt="Logo of BBC"
            />
            <img
              src="./src/assets/images/thenytlogo-black.svg"
              alt="Logo of The New York Times"
            />
            <img
              src="./src/assets/images/theguardianlogo-black.svg"
              alt="Logo of The Guardian"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
