import "tailwindcss/tailwind.css";
import ShopContextProvider from "../context/shop";
import Nav from "../components/nav";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.takeshape.io/project/cc40a247-12d8-4e71-8640-7f19acb873ae/v3/graphql",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 6a4f7886abf7415aadd375640f5f34f3",
    },
  });

  return (
    <ApolloProvider client={client}>
      <ShopContextProvider>
        <Nav />
        <div className="lg:max-w-screen-2xl flex lg:w-full lg:m-auto md:m-auto lg:shadow-xl lg:px-6 lg:py-6">
          <Component {...pageProps} />
        </div>
      </ShopContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
