import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VehicleLocation from '../pages/vehicleList/vehicle-location';
import VeicleList from '../pages/vehicleList/playback-history-table';
import PlaybackHistory from '../pages/playback-history/playback-history';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<VeicleList />} />
            <Route path="/playback-history" element={<PlaybackHistory />} />
            <Route path='/vehicle-location/:number' element={<VehicleLocation />} />
        </Routes>
    )
}

export default Router
