import React from 'react'
import Sidebar from '../components/sidebar'
import Router from '../routes/router'
import '../assets/styles/main.css'

const Main = () => {
    return (
        <>
            <Sidebar />
            <div className='dashboard-main-container'>
                <Router />
            </div>
        </>
    )
}

export default Main
