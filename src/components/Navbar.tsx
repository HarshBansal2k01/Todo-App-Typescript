import { Link, useSearchParams } from "react-router-dom";
import "./Navbar.css"
const Navbar = () => {
  const [searchParams] = useSearchParams();

  const todosData = searchParams.get("todos");
  return (
    <nav>
      <Link to="/">All</Link>
      <Link to="/?todos=active" className={todosData === "active" ? "active":""}>Active</Link>
      <Link to="/?todos=completed" className={todosData === "completed" ? "completed":""}>Completed</Link>
    </nav>
  );
};

export default Navbar;
