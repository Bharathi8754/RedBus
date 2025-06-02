import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../admin/NavBar';

export default function AdminNavLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
