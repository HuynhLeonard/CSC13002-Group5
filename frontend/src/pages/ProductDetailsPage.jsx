import React, {useEffect, useState} from 'react';
import ProductDetails from '../components/Product/ProductDetails';
import { useParams, useSearchParams } from 'react-router-dom';
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
// import {productData} from "../static/data";
import SuggestedProduct from "../components/Product/SuggestedProduct";
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
  const {allProducts} = useSelector((state) => state.products);
  const {allEvents} = useSelector((state) => state.events);
  const {id} = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    // check whether a product is in on sale or not
    if(eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);

  return (
    <div>
        <Header />
        <ProductDetails data={data} />
          {
            !eventData && (
              <>
                {data && <SuggestedProduct data={data}/>}
              </>
            )
          }
        <Footer />
    </div>
  )
}

export default ProductDetailsPage