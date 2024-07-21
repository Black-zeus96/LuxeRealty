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

        {/* About Us Section */}

        <section className="section-about">
          <div className="container-about">
            <div>
              <h3 className="heading-level-three">
                Enjoy Quality Life With Luxe Realty
              </h3>
            </div>
            <div className="about-data">
              <p>
                Welcome to the Luxe Realty Marketplace. Luxe Realty is right
                choice for those who are looking for comfortable, safe and
                luxurious housing. You can enjoy privacy and comfot of living in
                clean and beautiful environment. Sign up today and list your
                listing, explore other listings and contact landlord of the
                properties you are interested in.
              </p>
              <div className="stats-about flex mt-6 gap-28">
                <div>
                  <p className="abtstats-head font-bold">100+</p>
                  <p className="abtstats-subhead">Units Ready</p>
                </div>
                <div>
                  <p className="abtstats-head">60K+</p>
                  <p className="abtstats-subhead">Customers</p>
                </div>
                <div>
                  <p className="abtstats-head">70K+</p>
                  <p className="abtstats-subhead">Review</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
