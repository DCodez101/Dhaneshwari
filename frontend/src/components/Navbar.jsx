import { NavLink } from "react-router-dom";

const navLinkBase =
  "relative font-semibold text-gray-700 transition-colors duration-200 hover:text-orange-500";

const navLinkActive = "text-orange-600";

function Navbar() {
  return (
    <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-semibold tracking-wide text-orange-500"
        >
          LOGO
        </NavLink>

        {/* Nav Links */}
        <ul className="flex items-center gap-8 text-sm">
          {[
            { name: "Home", path: "/" },
            { name: "Rooms & Amenities", path: "/rooms" },
            { name: "Gallery", path: "/gallery" },
            { name: "Blog", path: "/blog" },
            { name: "About", path: "/about" },
          ].map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : ""}`
                }
              >
                {item.name}

                {/* Hover underline animation */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Booking Button */}
        <button className="rounded-md bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md">
          Booking
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
