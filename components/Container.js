import React from "react";
import { Flex, flex } from "@chakra-ui/core";

export default function Container({ children }) {
  return (
    <div>
      <Flex as="main" justifyContent="center" flexDirection="column" px={8}>
        {children}
      </Flex>
    </div>
  );
}
