import { NavLink } from 'react-router-dom'
import {
  BsFillHouseFill,
  BsPeopleFill,
  BsPencilSquare,
  BsGearFill,
  BsBuilding,
  BsIndent
}
  from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import s from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <nav className={s.navbar}>
      <ul className={s.nav_items}>
        <button className={s.burger_btn}>
          <BsIndent className={s.icon} />
        </button>
        <li className={s.nav_item}>
          <NavLink to="/kanban">
            <BsFillHouseFill className={s.icon} />
            <span>Kanban</span>
          </NavLink></li>
        <li className={s.nav_item}>
          <NavLink to="/clients">
            <BsPeopleFill className={s.icon} />
            <span>Clients</span>
          </NavLink></li>
        <li className={s.nav_item}>
          <NavLink to="/clients-details">
            <BsPencilSquare className={s.icon} />
            <span>Clients details</span>
          </NavLink></li>
        <li className={s.nav_item}>
          <NavLink to="/profile">
            <CgProfile className={s.icon} />
            <span>Profile</span>
          </NavLink></li>
        <li className={s.nav_item}>
          <NavLink to="/user-management">
            <BsGearFill className={s.icon} />
            <span>User Management</span>
          </NavLink></li>
        <li className={s.nav_item}>
          <NavLink to="/properties">
            <BsBuilding className={s.icon} />
            <span>Properties</span>
          </NavLink></li>
      </ul>
    </nav>
  )
}
