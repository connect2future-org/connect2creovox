import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Logo = ({ className = "", variant = "default" }) => {
  return (
    <Link to="/" className={`inline-flex items-center select-none group ${className}`}>
      <img
        src={logo}
        alt="Connect2Creovox"
        className={`
  object-contain
  transition-all
  duration-300
  group-hover:scale-105
  ${
    variant === "footer"
      ? "h-8 brightness-0 invert"
      : "h-24 md:h-28 lg:h-32 w-auto"
  }
`}
      />
    </Link>
  );
};

export default Logo;