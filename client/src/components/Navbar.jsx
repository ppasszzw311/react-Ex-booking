import React from 'react';
import {Link} from "react-router-dom"
import "./navBar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCar, faPlane, faTaxi, faToriiGate } from "@fortawesome/free-solid-svg-icons"

const Navbar = ({type}) => {
  return (
    <div className={`navbar ${type}`}>
      <div className='navbarContainer'>
        <div className='lineOne'>
          <div className='left'>
            <Link to="/" className='logo'>
              SAM.Booking
            </Link>
          </div>
          <div className='right'>
            <button className='navButtonFlag'/>
            <button className='navButtonNotif'>使用webpack測試</button>
            { type === "auth" ? <></> : <>
            <button className='navButton'>註冊</button>
            <button className='navButton'>登入</button>
            </>
            }
          </div>
        </div>
        { type === "auth" ? <></> : <>
        <div className='lineTwo'>
          <div className='item active'>
            <FontAwesomeIcon icon={faBed} />
            <span>住宿</span>
          </div>
          <div className='item'>
            <FontAwesomeIcon icon={faPlane} />
            <span>航班</span>
          </div>
          <div className='item'>
            <FontAwesomeIcon icon={faCar} />
            <span>租車</span>
          </div>
          <div className='item'>
            <FontAwesomeIcon icon={faToriiGate} />
            <span>景點/活動</span>
          </div>
          <div className='item'>
            <FontAwesomeIcon icon={faTaxi} />
            <span>機場計程車</span>
          </div>
        </div>
        </>}
      </div>
    </div>
  )
}

export default Navbar