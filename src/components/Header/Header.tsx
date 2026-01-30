import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';

export function Header() {
  return (
    <header className={classes.header}>
      <nav>
        <Link to="/">Профиль</Link>
        <Link to="/Announcements">Объявления</Link>
      </nav>
    </header>
  );
}
