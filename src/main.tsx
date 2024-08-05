import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { TodoProvider } from "./store/todoContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <TodoProvider>
        <Box bg="purple.500" h="100vh">
          <App />
        </Box>
      </TodoProvider>
    </ChakraProvider>
  </React.StrictMode>
);
