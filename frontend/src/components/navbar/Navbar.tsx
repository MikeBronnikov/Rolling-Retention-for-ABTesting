import React, { useState } from 'react'
import Select from 'react-select';
import NavbarItem, { Projects } from './NavbarItem';


export const Navbar = () => {
    const [selectedOption, setselectedOption] = useState(null)

    const fetchedUserProjects: Array<Projects> = [{title: 'Steampunk defense', color: 'blue'}, {title: 'Worldwar Clicker', color: 'blue'}] 
 
     const handleChange = (selectedOption: any) => { //!any
        console.log(`Option selected:`, selectedOption);
      }
    return (
        <div className='navbar'>
       <NavbarItem name='Projects' data={fetchedUserProjects}/>
       <NavbarItem name='Account'/>
       <NavbarItem name='Support'/>
        </div>
    )
}

export default Navbar