import React from 'react'
import Header from '../../components/Header/Header'
import Posts from '../../components/Posts/Posts'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./Homepage.css"

function Homepage() {
    return (
        <>
            <Header/>
            <div className="homepage">
                <Posts/>
                <Sidebar/>
            </div>
        </>
    )
}

export default Homepage
