import React from 'react'
import Header from '../components/Layout/Header';
import Footer from "../components/Layout/Footer";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from '../components/Route/BestDeals/BestDeals';
import Sponsored from '../components/Route/Sponsored';
import Events from '../components/EventCard/Events';
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct';

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  )
}

export default HomePage