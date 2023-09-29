import React, { useEffect, useRef, useState } from 'react'
import { useAsyncError, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getAllvehiclesData } from '../../Hooks/customHooks';
import markerIconUrl from '../../assets/images/location.png';


const VehicleLocation = () => {

    const { number } = useParams();
    const [selectedVehicle, setSelectedVehicle] = useState({});
    const [map, setMap] = useState();
    const mapRef = useRef(null);

    const [center, setCenter] = useState([26.858111, 75.669172])
    const getAllVehiclesList = () => {
        getAllvehiclesData().then((response) => {
            const allvehicles = response.Vehicle;
            const selected = allvehicles.filter((data) => data.VehicleNo === number);
            setSelectedVehicle(selected[0]);
        }).catch((error) => {
            console.log("error", error);
        })
    }

    useEffect(() => {
        getAllVehiclesList();
    }, []);

    useEffect(() => {
        if (selectedVehicle.Lat !== undefined && selectedVehicle.Long !== undefined) {
            ((selectedVehicle.Lat === undefined) || (selectedVehicle.Long === undefined)) ? setCenter([26.858111, 75.669172]) : setCenter([parseFloat(selectedVehicle.Lat), parseFloat(selectedVehicle.Long)])
            if (map) {
                map.flyTo([parseFloat(selectedVehicle.Lat), parseFloat(selectedVehicle.Long)], 2);
            }
        }
    }, [selectedVehicle, map]);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo(center, 12);
        }
    }, [center]);


    const handleMapLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    const customMarkerIcon = new L.Icon({
        iconUrl: markerIconUrl,
        iconSize: [50, 50],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    return (
        <MapContainer center={center} zoom={12} style={{ height: '100vh', width: '100%' }} ref={mapRef} whenCreated={handleMapLoad}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center} icon={customMarkerIcon}>
                <Popup>Default Location</Popup>
            </Marker>
        </MapContainer>
    )
}

export default VehicleLocation
