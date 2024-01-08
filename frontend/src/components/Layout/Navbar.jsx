import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'

const Navbar = ({active}) => {
  const [className, setClassName] = useState("");
  useEffect(() => {
    navItems.map((i) => {
      if(i.position === active) {
        setClassName(i.class);
      }
    })
  }, []);
  return (
    // <div className={`header-nav`}>
    //       {
    //         navItems && navItems.map((i,index) => (
    //             <div className="flex">
    //                 <Link to={i.url}
    //                 className={`${active === index + 1 ? `header-start_${i.class}` : ""} header-animation `}
    //                 >
    //                 {i.title}
    //                 </Link>
    //             </div>
    //         ))
    //       }
    // </div>

    <div className="header-nav">
    {
      navItems && navItems.map((i) => (
        <Link to={i.url}>
          {i.title}
        </Link>
      ))
      
    }
      <div className={`header-animation header-start_${className}`}></div>
    </div>
  )
}

export default Navbar