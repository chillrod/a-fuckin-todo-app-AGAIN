import { Container } from "@chakra-ui/react";
import { TodoHeader } from "./components/TodoHeader";
import { TodoBody } from "./components/TodoBody";
import { useContext } from "react";
import { TodoContext } from "./store/todoContext";

function App() {
  const { value, loading } = useContext(TodoContext);

  return (
    <Container maxW="container.lg" p={12}>
      <TodoHeader>
        <TodoBody loading={loading} todos={value} />
      </TodoHeader>
    </Container>
  );
}

export default App;
