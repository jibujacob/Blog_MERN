import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Sidebar.css"

function Sidebar() {
    const [categories,setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get("/api/categories");
            setCategories(res.data)
        }
        fetchCategories()
    },[])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" 
                    alt="" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Suscipit dignissimos ullam ratione quisquam eligendi 
                    tempore quia cupiditate fuga quae itaque et deserunt 
                    nam.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {categories.map(category => {
                        return (
                            <Link to={`/?category=${category.name}`} className="link">
                                <li key={category.id} className="sidebarListItem ">{category.name}</li>
                            </Link>
                            )
                    })}

                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>   
            </div>
        </div>
    )
}

export default Sidebar
