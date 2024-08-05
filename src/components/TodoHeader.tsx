import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { TodoContext } from "../store/todoContext";

import { useToast } from "@chakra-ui/react";

export const TodoHeader = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<string>("");
  const { createTodo } = useContext(TodoContext);

  const toast = useToast();

  const handleTodoValidation = () => {
    if (!value) {
      return toast({
        title: "Empty Todo",
        description: "Please type a todo",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } else {
      createTodo(value);

      toast({
        title: "Todo added",
        description: "Your todo has been added",
        status: "success",
        duration: 1000,
        isClosable: true,
      });

      setValue("");
    }
  };
  return (
    <Card p={6}>
      <CardHeader>
        <Heading size="md">My awesome Todo List</Heading>
      </CardHeader>
      <CardBody>
        <HStack mb={6}>
          <Input
            required
            placeholder="Type your todo"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          ></Input>
          <Button colorScheme="purple" onClick={() => handleTodoValidation()}>
            Add
          </Button>
        </HStack>
        {children}
      </CardBody>
    </Card>
  );
};
