import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../assets/styles/main.css'
import Input from '../../components/Input';
import vehicle1 from '../../data/vehicle1.json';
import vehicle2 from '../../data/vehicle2.json';
import vehicle3 from '../../data/vehicle3.json';
import vehicle4 from '../../data/vehicle4.json';
import markerIconUrl from '../../assets/images/location.png';

const customMarkerIcon = new L.Icon({
    iconUrl: markerIconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const PlaybackHistory = () => {

    const [form, setForm] = useState({});
    const [selectedTimeFormat, setSelectedTimeFormat] = useState('Minute');
    const [vehicleNumber, setVehicleNumber] = useState('RJ14GP2524');
    const [selectedVehicle, setSelectedVehicle] = useState([]);
    const [startDateTime, setStartDate] = useState('2023-09-19 18:09:36');
    const [endDateTime, setEndDate] = useState('2023-09-20 07:30:08');
    const [filteredLocations, setFilter] = useState([]);
    const [center, setCenter] = useState();

    const mapRef = useRef(null);

    useEffect(() => {
        if (vehicleNumber === "RJ14GP2524") {
            setSelectedVehicle(vehicle1);
        } else if (vehicleNumber === "GJ06AX5104") {
            setSelectedVehicle(vehicle2);
        } else if (vehicleNumber === "RJ14GH0774") {
            setSelectedVehicle(vehicle3);
        } else if (vehicleNumber === "RJ25GA3539") {
            setSelectedVehicle(vehicle4);
        }
    }, [vehicleNumber]);

    useEffect(() => {
        const test = filteredLocations[0]
        const lat = parseFloat(test?.Lattitude ? test?.Lattitude : isNaN(test?.Lattitude) ? 0 : 0);
        const long = parseFloat(test?.Longitude ? test?.Longitude : isNaN(test?.Longitude) ? 0 : 0);
        setCenter([lat, long]);
    }, [filteredLocations]);

    useEffect(() => {
        filterLocationsByDateTimeRange();
    }, [selectedVehicle, startDateTime, endDateTime])

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo(center, 12);
        }
    }, [center]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSumbmit = (e) => {
        e.preventDefault();
        alert("Data")
    };

    const allvehicles = ['RJ14GP2524', 'GJ06AX5104', 'RJ14GH0774', 'RJ25GA3539'];

    const filterLocationsByDateTimeRange = () => {
        const test = selectedVehicle.filter((data) => data.Date >= startDateTime && data.Date <= endDateTime);
        setFilter(test)
    };

    return (

        <Row className='entrance-dashboard-main-container'>
            <Col sm={3} className='entrance-filter-sidebar'>
                <form onSubmit={handleSumbmit}>
                    <Input label="Select Group" type="text" name="group" onChange={handleChange} />
                    <div className='filter-input-section my-2 w-100 d-flex justify-content-between align-items-between'>
                        <label className='title'>Vehicle</label>
                        <select value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)}>
                            <option value="">Select Vehicle</option>
                            {
                                allvehicles.map((data, index) => (
                                    <option key={index}>{data}</option>
                                ))
                            }
                        </select>
                    </div>
                    <Input label="Start Date" type="datetime-local" name="startDate" onChange={(e) => setStartDate(e.target.value)} />
                    <Input label="End Date" type="datetime-local" name="endDate" onChange={(e) => setEndDate(e.target.value)} />
                    <div className='filter-input-section my-2 w-100 d-flex justify-content-between align-items-between'>
                        <label className='title '>Site Type</label>
                        <select name='siteType' onChange={handleChange}>
                            <option>Any</option>
                        </select>
                    </div>
                    <Input label="Site Name" type="text" name="siteName" onChange={handleChange} />
                    <div className='filter-input-section my-2 w-100 d-flex justify-content-between align-items-between'>
                        <label className='title '>Stoppage Limit</label>
                        <div className='d-flex justify-content-end align-items-center'>
                            <div className=''>
                                <input type='radio' name='stoppageType' id="stoppageLimit" value="minute" checked={selectedTimeFormat === 'Minute'} onChange={() => setSelectedTimeFormat('Minute')} />
                                <label className="title d-inline ms-1 me-3" onClick={() => setSelectedTimeFormat('Minute')}>Minute</label>
                                <input type='radio' name='stoppageType' id="stoppageLimit" value="hour" checked={selectedTimeFormat === 'Hour'} onChange={() => setSelectedTimeFormat('Hour')} />
                                <label className="title d-inline ms-1" onClick={() => setSelectedTimeFormat('Hour')}>Hour</label>
                            </div>
                            <input type='number' name='stopTime' className='ms-3' style={{ width: "15%" }} onChange={handleChange} />
                        </div>
                    </div>
                </form>
            </Col>
            <Col sm={9} className='entrance-dashboard-list-section m-0 px-3'>

                <MapContainer center={[27.266688, 77.809645]} zoom={13} ref={mapRef} style={{ height: '100vh', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {filteredLocations.map((location, index) => (
                        <Marker
                            key={index}
                            position={[parseFloat(location.Lattitude), parseFloat(location.Longitude)]}
                            icon={customMarkerIcon}
                        >
                            <Popup>{`Location ${index + 1} - Date-Time: ${location.Date}`}</Popup>
                        </Marker>
                    ))}
                    <Polyline
                        positions={filteredLocations.map((location) => [
                            location.Lattitude,
                            location.Longitude,
                        ])}
                        color="blue"
                    />
                </MapContainer>
            </Col>
        </Row>
    )
}

export default PlaybackHistory
