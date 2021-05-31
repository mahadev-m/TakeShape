import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

export default function Final() {
  const router = useRouter();
  const createOrders = gql`
    mutation {
      createOrders(input: { orderNumber: 10 }) {
        clientMutationId
      }
    }
  `;
  const [createOrder] = useMutation(createOrders);

  async function handleUpdateData() {
    const data = await createOrder();
    router.push("/");
  }
  return (
    <div className="pt-20">
      <h1>Click To Confirm Your Order</h1>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => handleUpdateData()}
      >
        Confirm order
      </button>
    </div>
  );
}
