import React from 'react'
import { Outlet } from 'react-router-dom';
import HomeNavBar from '../home/HomeNavBar';

export default function HomeNabLayout() {
  return (
    <>
      <HomeNavBar />
      <Outlet />
    </>
  )
}
