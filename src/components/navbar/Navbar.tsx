import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <div className="flex gap-2">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};
