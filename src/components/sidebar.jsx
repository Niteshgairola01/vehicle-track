import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCross2 } from 'react-icons/rx'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const menuItems = [
    {
      title: "Vehicle List",
      path: "/",
    },
    {
      title: "Playback History",
      path: "/playback-history",
    }
  ]

  return (
    <>
      <div className="container-fluid mt-3">
        <nav className="nav bg-white w-100 nav-main shadow-md">
          <div className="d-flex justify-content-between align-items-center form-inline ml-auto">
            <div className="toggle-btn" onClick={ToggleSidebar} >
              <GiHamburgerMenu />
            </div>
            <span className="navbar-brand text-dark ms-3">Vehicle Tracking System</span>
          </div>
        </nav>
        <div className={`sidebar ${isOpen === true ? 'active' : ''}`} style={{zIndex: 999}}>
          <div className="sd-header">
            <h4 className="mb-0">Menu</h4>
            <div className="close-menu-btn" onClick={ToggleSidebar}>
              <RxCross2 />
            </div>
          </div>
          <div className="sd-body">
            <ul>
              {
                menuItems.map((data, index) => (
                  <Link to={`${data.path}`} key={index}>
                    <li className="sd-link">{data.title}</li>
                  </Link>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export default Sidebar
