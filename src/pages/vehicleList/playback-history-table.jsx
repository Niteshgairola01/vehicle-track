import React, { useEffect, useState } from 'react'
import { getAllvehiclesData } from '../../Hooks/customHooks';
import { useNavigate } from 'react-router-dom';
import vehicleReport from '../../assets/files/vehicleReport.xlsx'
import axios from 'axios';
import * as XLSX from 'xlsx';
import { FaLocationDot } from 'react-icons/fa6';
const VeicleList = () => {
    const [vehicleList, setvehicleList] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [singleVehicleDetails, setSingleVehicleDetails] = useState([])
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    const mouseOvervehicle = (originalString) => {
        setVehicleNo(originalString);
        const numbers = originalString.slice(-4);
        const letters = originalString.slice(0, -4);

        setSelectedVehicle(numbers + letters);
        setShowDetails(true)
    }

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(vehicleReport, { responseType: 'arraybuffer' })
            .then((response) => {
                const data = response.data;
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                setExcelData(jsonData);
            })
            .catch((error) => {
                console.error('Error reading Excel file:', error);
            });
    }, []);

    useEffect(() => {
        excelData.shift();
    }, [excelData]);

    useEffect(() => {
        let test = [];
        excelData.map((data) => {
            if (data[0] === selectedVehicle) {
                test = data
            }
        })
        setSingleVehicleDetails(test)
    }, [selectedVehicle]);

    const getAllVehiclesList = () => {
        getAllvehiclesData().then((response) => {
            setvehicleList(response.Vehicle);
        }).catch(() => {
            setvehicleList([]);
        })
    };

    useEffect(() => {
        getAllVehiclesList();
    }, []);

    const handleSelectAll = () => {
        const allvehicles = vehicleList.map((option, index) => index);
        if (selectAll) {
            setSelectedValues([]);
        } else {
            setSelectedValues(allvehicles);
        }
        setSelectAll(!selectAll);
    };

    const handleCheckChange = (value) => {
        const currentIndex = selectedValues.indexOf(value);
        const newValues = [...selectedValues];
        if (currentIndex === -1) {
            newValues.push(value);
        } else {
            newValues.splice(currentIndex, 1);
        }
        handleCheckboxChange(newValues);
    };

    const handleCheckboxChange = (newValues) => {
        setSelectedValues(newValues);
    };

    const formatDate = (dateString) => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const date = new Date(dateString);

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className='table-responsive' onClick={() => showDetails && setShowDetails(false)}>
            {
                showDetails ? (
                    <div className='bg-white rounded p-3 my-3' style={{ position: "absolute", zIndex: "999", width: "40%", boxShadow: "0px 0px 10px 0px #c8c9ca" }}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <span className='fs-6 fw-bold '>Vehicle No.</span>
                                <span className='fs-6 fw-lighter ms-3'>{vehicleNo}</span>
                            </div>
                            <span className='me-5 pe-5'>
                                <FaLocationDot className='fs-3 text-danger' onClick={() => navigate(`/vehicle-location/${vehicleNo}`)} style={{ cursor: "pointer" }} />
                            </span>
                        </div>
                        <div>
                            <span className='fs-6 fw-bold '>Driver name.</span>
                            <span className='fs-6 fw-lighter ms-3'>{singleVehicleDetails[2]}</span>
                        </div>
                        <div>
                            <span className='fs-6 fw-bold '>Phone No.</span>
                            <span className='fs-6 fw-lighter ms-3'>{singleVehicleDetails[3]}</span>
                        </div>
                    </div>
                ) : null
            }
            <table className='w-100 table table-bordered'>
                <thead className='table-head'>
                    <th className='w-5 title table-header-title table-header-first-title text-center'>#</th>
                    <th className='title text-center'>
                        <input type='checkbox' checked={vehicleList.length === selectedValues.length} onChange={handleSelectAll} />
                    </th>
                    <th className='title text-center'>Group Name</th>
                    <th className='title ps-3 text-start'>Vehicle</th>
                    <th className='title ps-3 text-start'>Last Seen</th>
                    <th className='title text-center px-2'>Ignition</th>
                    <th className='title text-center'>Battery</th>
                    <th className='title text-center'>info</th>
                    <th className='title ps-3 text-start`'>Nearest Site</th>
                    <th className='title ps-3 text-start`'>Nearset Location</th>
                    <th className='title text-center'>Speed (Km/H)</th>
                    <th className='title ps-3 text-start'>Idle Time(Hh:Mm:Ss)</th>
                    <th className='title text-center table-header-last-title'>Specification</th>
                </thead>
                <tbody>
                    {
                        vehicleList.map((data, index) => (

                            <tr key={index}
                                style={{ position: "relative" }}>
                                <td className='text text-center'>{index + 1}</td>
                                <td className='text text-center'>
                                    <input type='checkbox' checked={selectedValues.includes(index)} onChange={() => handleCheckChange(index)} />
                                </td>
                                <td className='text text-center'></td>
                                <td className='text bg-light-yellow text-center' onMouseOver={() => mouseOvervehicle(data.VehicleNo)}>{data.VehicleNo === undefined ? '' : data.VehicleNo}</td>
                                <td className='text ps-3 text-start text-blue' style={{ width: "10rem" }}>{data.Date === undefined ? '' : formatDate(data.Date)}</td>
                                <td className={`text text-center ${data.Ignition === '0' ? 'text-danger' : 'text-success'}`}>{data.Ignition === undefined ? '' : data.Ignition === '0' ? 'OFF' : 'ON '}</td>
                                <td className='text text-center text-success'>Connected</td>
                                <td className='text ps-3 text-start text-blue'>i</td>
                                <td className='text ps-3 test-start text-blue'>Sanand(230.90km)</td>
                                <td className='text ps-3 test-start text-blue table-location-row' style={{ width: "20rem" }}>{data.Location === undefined ? '' : data.Location}</td>
                                <td className='text ps-3 test-start text-blue'>{data.Speed === undefined ? '' : data.Speed}</td>
                                <td className='text ps-3 test-start text-blue bg-skyblue'>{data.Date === undefined ? '' : data.Date}</td>
                                <td className='text text-center'>Specification</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default VeicleList;
