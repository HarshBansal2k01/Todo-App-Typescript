import { ReactNode, createContext, useContext, useState } from "react";

// we are creating atype here for the children as any type of ata can be their
export type TodosProviderProps = {
  children: ReactNode; // this meansit can be anything
};

// this is defining what my todos array will consist of
export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};
// now since createContext will have arr, function , tick boxes we have to define them
//for the it
export type TodosContext = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  toggleTodoAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const newTodos = localStorage.getItem("todos") || "[]";
      return JSON.parse(newTodos) as Todo[];
    } catch (error) {
      return [];
    }
  });
  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // mark completed

  const toggleTodoAsCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));

      return newTodos;
    });
  };

  // delete

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((filterTodo) => filterTodo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));

      return newTodos;
    });
  };
  return (
    <todosContext.Provider
      value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo }}
    >
      {children} {/* <- this here is the complete application  <App/> */}
    </todosContext.Provider>
  );
};

export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error("useTodos used outside of provider");
  }

  return todosConsumer;
};
