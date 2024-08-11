import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(saleListings);

  // Making sure that each dynamic section loads one after the other

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
        fetchSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      <div id="body">
        {/* Hero Section */}
        <section className="section-hero">
          <div className="container-hero lg:p-10">
            <div className="hero-textbox">
              <h1 className="heading-level-one primary-black">
                Discover a place you'll love to live in
              </h1>
              <p className="subheading-level-one lg:w-90">
                Find the perfect luxury property tailored to your exquisite
                taste and lifestyle needs. Our curated collection features only
                the finest homes to ensure you experience the epitome of
                sophistication.
              </p>
              <div className="p-3 bg-black flex flex-row justify-center rounded w-64">
                <Link className="text-white text-bold" to={"/search"}>
                  Explore Listings
                </Link>
              </div>
            </div>
            {/* <div className="hero-imagebox">
              <img
                src="./src/images/hero1.jpg"
                alt="An image of red house in the hero section of home page."
              />
            </div> */}
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

        {/* Show Listings */}

        <div className="max-w-7xl mx-auto p-3 flex flex-col gap-6 my-10">
          {offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h3 className="text-2xl font-semibold text-black">
                  Recent Offers
                </h3>
                <Link
                  className="text-sm text-blue-700 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
                <div className="flex flex-wrap gap-4 my-3">
                  {offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Second */}

          {rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h3 className="text-2xl font-semibold text-black">
                  Recent Places for Rent
                </h3>
                <Link
                  className="text-sm text-blue-700 hover:underline"
                  to={"/search?type=rent"}
                >
                  Show more offers
                </Link>
                <div className="flex flex-wrap gap-4 my-3">
                  {rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Third */}

          {saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h3 className="text-2xl font-semibold text-black">
                  Recent Places for Sale
                </h3>
                <Link
                  className="text-sm text-blue-700 hover:underline"
                  to={"/search?type=sale"}
                >
                  Show more offers
                </Link>
                <div className="flex flex-wrap gap-4 my-3">
                  {saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
