import React from "react";
import Navbar from '../Components/Navbar';
import GuestSidebar from '../Components/GuestSidebar';
const GuestDashboard=()=>{
    return(
        <div>
             <div className="Dashboard">
            <Navbar />
            <GuestSidebar />
        </div>
        </div>
    )
}

export default GuestDashboard