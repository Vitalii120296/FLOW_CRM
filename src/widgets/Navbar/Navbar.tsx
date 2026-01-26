import { NavLink, useLocation } from 'react-router-dom'
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
import { useEffect, useState } from 'react';
import cn from 'classnames';

export const Navbar = () => {
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(`.${s.navbar}`) && (window.innerWidth <= 1280)) {
        setBurgerIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [location.pathname]);

  return (
    <nav
      className={cn(s.navbar, { [s.navbar_open]: burgerIsOpen })}

    >
      <ul className={s.nav_items}>
        <button
          className={s.burger_btn}
          onClick={() => setBurgerIsOpen(!burgerIsOpen)}
        >
          <BsIndent className={`${s.icon} ${s.burger_icon}`} />
        </button>
        <li className={s.nav_item}>
          <NavLink to="/">
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
