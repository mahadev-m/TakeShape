import Head from "next/head";
import "tailwindcss/tailwind.css";
import { ShopContext } from "../context/shop";
import React, { useContext } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

export default function Home() {
  const contextData = useContext(ShopContext);
  //const get = useQuery(getProductList);
  const query = gql`
    query {
      getProductList {
        items {
          name
          image {
            sourceUrl
          }
          price
          description
        }
      }
    }
  `;
  const { data } = useQuery(query);
  console.log(data);

  return (
    <div className="flex flex-wrap">
      {data &&
        data.getProductList &&
        data.getProductList.items.map((product) => (
          <div
            className="lg:w-1/4 md:w-1/2 w-5/6 lg:h-1/4 m-auto mb-6 border-2
          lg:m-10 sm:w-3/4 text-center border-gray-100 overflow-hidden shadow-xl
          hover:shadow-md p-8 "
          >
            <h1>{product.name}</h1>
            <img src={product.image.sourceUrl} alt="image" />
            <h3>${product.price}</h3>
            {!contextData.store.find((item) => item.name === product.name)
              ?.quantity ?? 0 ? (
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => {
                  contextData.addProductToCart(product);
                }}
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex justify-between pb-6">
                <button
                  className="bg-gray-800 px-4 text-center py-2 text-white text-2xl md:py-4 md:px-6 lg:px-5 lg:py-2 m-auto rounded-lg"
                  onClick={() => {
                    contextData.Decrement(product);
                  }}
                >
                  -
                </button>
                <span className="m-auto px-6 bg-gray-50">
                  {contextData.store.map((item) =>
                    item.name === product.name ? item.quantity : null
                  )}
                </span>
                <button
                  className="bg-gray-800 px-3 text-center py-2 text-white text-2xl md:py-4 md:px-6 lg:px-4 lg:py-2 m-auto rounded-lg"
                  onClick={() => {
                    contextData.addProductToCart(product);
                  }}
                >
                  +
                </button>
              </div>
            )}
            {/* <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                contextData.addProductToCart(item);
              }}
            >
              Add To Cart
            </button> */}
          </div>
        ))}
    </div>
  );
}

// export async function getStaticProps() {
//   const client = new ApolloClient({
//     uri: "https://api.takeshape.io/project/cc40a247-12d8-4e71-8640-7f19acb873ae/v3/graphql",
//     cache: new InMemoryCache(),

//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer 6a4f7886abf7415aadd375640f5f34f3",
//     },
//   });

//   console.log("data", data);
//   return {
//     props: {
//       getProductList: data.getProductList,
//     },
//   };
// }
