import React from 'react'
import NavbarItem, { Projects } from './NavbarItem';


export const Navbar = () => {

    const fetchedUserProjects: Array<Projects> = [{title: 'Steampunk defense', color: 'blue'}, {title: 'Worldwar Clicker', color: 'blue'}] 
 
    return (
        <div className='navbar'>
       <NavbarItem name='Projects' data={fetchedUserProjects}/>
       <NavbarItem name='Account'/>
       <NavbarItem name='Support'/>
        </div>
    )
}

export default Navbar