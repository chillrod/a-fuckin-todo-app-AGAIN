import {
  AlertDialog,
  Badge,
  Box,
  Button,
  HStack,
  Skeleton,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Todos, TodoContext } from "../store/todoContext";
import { AlertDialogDelete } from "./AlertDialog";
import { useContext } from "react";

interface Props {
  loading: boolean;
  todos: Todos[];
}
export const TodoBody = (props: Props) => {
  const { setTodoCompleted } = useContext(TodoContext);
  return (
    <Box>
      {props.loading ? (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <Stack divider={<StackDivider />} maxH="300px" overflow="auto">
          {props.todos.map((todo) => (
            <HStack justify="space-between" key={todo.id}>
              <HStack>
                <Text noOfLines={1}>{todo.text}</Text>
                <Badge colorScheme={todo.completed ? "green" : "red"}>
                  Completed: {todo.completed ? "Yes" : "No"}
                </Badge>
              </HStack>
              <HStack>
                <Button
                  size="xs"
                  onClick={() => setTodoCompleted(todo.id, !todo.completed)}
                >
                  {todo.completed ? "Undo" : "Complete"}
                </Button>
                <AlertDialogDelete id={todo.id}></AlertDialogDelete>
              </HStack>
            </HStack>
          ))}
        </Stack>
      )}
    </Box>
  );
};
