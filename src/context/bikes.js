import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { listBikes } from "../api/queries";
import { processOrder } from "../api/mutation";
import { generateClient } from 'aws-amplify/api';


const BikeContext = React.createContext();

const client = generateClient();

const BikeProvider = ({ children }) => {
  const [bikes, setBikes] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBikes();
  }, []);

  const checkout = async (orderDetails) => {
    console.log("Order details:", orderDetails);
    const payload = {
      id: uuidv4(),
      ...orderDetails
    };
    console.log("Sending payload:", payload);
    try {
      await client.graphql({query: processOrder,variables: { input: payload }});
      console.log("Order is successful");
    } catch (err) {
      console.log("error during chreckout:",err);
    }
  };

  const fetchBikes = async () => {
    try {
      setLoading(true);
      const { data } = await client.graphql({
        query: listBikes,
        authMode: "apiKey"
      });
      const bikes = data.listBikes.items;
      const featured = bikes.filter((bike) => {
        return !!bike.featured;
      });
      setBikes(bikes);
      setFeatured(featured);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BikeContext.Provider value={{ bikes, featured, loading, checkout }}>
      {children}
    </BikeContext.Provider>
  );
};

export { BikeContext, BikeProvider };
