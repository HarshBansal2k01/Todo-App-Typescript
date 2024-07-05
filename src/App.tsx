import AddToDo from "./components/AddToDo";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import "./App.css"
// import "./components/style.css"
export const App = () => {
  return (
    <main>
    
      <Navbar />
      <AddToDo />
      <Todos />
    </main>
  );
};
