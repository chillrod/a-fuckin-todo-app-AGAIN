import { createContext, Dispatch, useEffect, useState } from "react";

const baseUrl = "https://667db0b3297972455f660dff.mockapi.io/todos";

export interface Todos {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoContext = createContext<{
  value: Todos[];
  setValue: Dispatch<React.SetStateAction<Todos[]>>;
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  deleteTodo: (id: string) => void;
  setTodoCompleted: (id: string, completed: boolean) => void;
  createTodo: (text: string) => void;
}>({
  value: [],
  setValue: () => {},
  loading: false,
  setLoading: () => {},
  deleteTodo: () => {},
  setTodoCompleted: () => {},
  createTodo: () => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<Todos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(baseUrl);

      const data = await response.json();

      setValue(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setLoading(true);

      await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });

      fetchTodos();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setTodoCompleted = async (id: string, completed: boolean) => {
    try {
      setLoading(true);

      await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });

      fetchTodos();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (text: string) => {
    try {
      setLoading(true);

      await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, completed: false }),
      });

      fetchTodos();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        value,
        setValue,
        loading,
        setLoading,
        deleteTodo,
        setTodoCompleted,
        createTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
