import React from 'react'
import { useState } from 'react'
import SelectArrow from '../../share/SelectArrow'

import './navbar.scss'
export interface Projects {
    title: string,
    color: 'blue' | 'orange' 
}
interface NavbarItemProps {
    name: 'Projects' | 'Account' | 'Support' 
    data?: Array<Projects>
}
interface InnerTitileProps {
   title: string,
   color: 'blue' | 'orange' 
}

const InnerTitle = (props: InnerTitileProps) => {
    return (
        <div className='title'>
        <span className="title__dot"></span>
        <span className='title__text'>{props.title}</span>
        </div>
    )
}



export const NavbarItem = (props: NavbarItemProps) => {
    const [isOpen, setisOpen] = useState(false)

    const selectHandleClick = () => {
        setisOpen(!isOpen)
    }
    return (
        <div className={`navbar__item ${isOpen? 'navbar__item--open' : '' }`}>
           <SelectArrow isOpen={isOpen} clickHandler={selectHandleClick}/>
            <p className='navbar__item-title'>{props.name}</p>
             {/* here we will map the array of fetched user projects */}
            {isOpen && <div className="navbar__item-inner">
            {props.data 
           ? props.data.map(item => <InnerTitle title={item.title} color={item.color}/>) 
           : 'in progress'}
            </div>}
        </div>
    )
}

export default NavbarItem