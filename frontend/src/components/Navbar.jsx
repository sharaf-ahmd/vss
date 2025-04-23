import React from 'react';
import { Home, Car, PenTool as Tool, Phone, User, Info, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';




const Navbar = () => {


  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="logo">
            <Car className="logo-icon" />
            <span className="logo-text">Car Connect</span>
          </div>
          
          <div className="nav-links">
            <NavLink to="/userdash" icon={<Home />} text="Home" />
            <NavLink to='/AboutUs' icon={<Info />} text="About US" />
            <NavLink to='/ContactUs' icon={<Phone />} text="Contact Us" />
            <NavLink to='' icon={<User />} text="Account" />
            <NavLink to='/MechDash ' icon={<Sun />} text="mc" />
            

          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ icon, text,to }) => (
  <Link to={to} className="nav-link">
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;