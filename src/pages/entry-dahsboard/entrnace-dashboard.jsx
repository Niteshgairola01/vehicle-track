import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import '../../assets/styles/main.css'
import Button from '../../components/Button';
import Input from '../../components/Input';

const EntranceDashboard = () => {

    const [form, setForm] = useState({});
    const [selectedTimeFormat, setSelectedTimeFormat] = useState('Minute')

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSumbmit = (e) => {
        e.preventDefault();
        alert("Data")
    };

    const table1 = [
        {
            site: 'Chakan',
            totalExits: '5',
            avgTime: '8:20',
            totalInside: '1'
        },
        {
            site: 'Chakan Parking',
            totalExits: '0',
            avgTime: '',
            totalInside: '1'
        }
    ];

    const table2 = [
        {
            site: 'Chakan',
            vehicle: 'GJ17XX0242',
            entryTime: '2023-09-17:22:30:22',
            exitTime: '2023-09-17:48:10:00',
            duration: '09:17'
        },
        {
            site: 'Chakan',
            vehicle: 'RJ141238',
            entryTime: '2023-09-17:22:30:22',
            exitTime: '2023-09-17:48:10:00',
            duration: '09:17'
        },
        {
            site: 'Chakan',
            vehicle: 'MH01SS8956',
            entryTime: '2023-09-15:22:30:22',
            exitTime: '2023-09-17:48:10:00',
            duration: '09:17'
        },
        {
            site: 'Chakan',
            vehicle: 'UP12SK4629',
            entryTime: '2023-09-16:22:30:22',
            exitTime: '2023-09-18:48:10:00',
            duration: '09:17'
        },
        {
            site: 'Chakan',
            vehicle: 'GJ20LF8390',
            entryTime: '2023-09-19:22:30:22',
            exitTime: '2023-09-20:48:10:00',
            duration: '09:17'
        },
        {
            site: 'Chakan',
            vehicle: 'RJ17HK8745',
            entryTime: '2023-09-19:18:26:01',
            exitTime: '2023-09-20:48:10:00',
            duration: '09:17'
        },
        {
            site: 'Chakan',
            vehicle: 'MH05EB3725',
            entryTime: '2023-09-17:22:30:22',
            exitTime: '2023-09-17:48:10:00',
            duration: '09:17'
        }
    ];

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

    const detials = [
        {
            title: "Report",
            desc: 'Total Entry'
        },
        {
            title: "Date",
            desc: `${form.startDate === undefined ? '' : formatDate(form.startDate)} TO ${form.endDate === undefined ? '' : formatDate(form.endDate)}`
        },
        {
            title: "Stop Time",
            desc: `${form.stopTime === undefined ? '' : form.stopTime} ${selectedTimeFormat}`
        },
        {
            title: "Site Name",
            desc: form.siteName === undefined ? '' : form.siteName
        }
    ];

    return (
        <Row className='entrance-dashboard-main-container'>
            <Col sm={3} className='entrance-filter-sidebar'>
                <form onSubmit={handleSumbmit}>
                    <Input label="Select Group" type="text" name="group" onChange={handleChange} />
                    <Input label="Vehicle" type="text" name="vehicle" onChange={handleChange} />
                    <Input label="Start Date" type="date" name="startDate" onChange={handleChange} />
                    <Input label="End Date" type="date" name="endDate" onChange={handleChange} />
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
                    <div className='d-flex justify-content-center align-items-center'>
                        <Button type="submit">view</Button>
                    </div>
                </form>
            </Col>
            <Col sm={9} className='entrance-dashboard-list-section m-0 px-3'>
                <div className='d-flex justify-content-center align-items-center w-100 py-2'>
                    {
                        detials.map((data, index) => (
                            <div className='mx-5' key={index}>
                                <span className='title'>{data.title}:</span>
                                <span className='text text-blue ms-1'>{data.desc}</span>
                            </div>
                        ))
                    }
                </div>
                <div className='table-responsive'>
                    <table className='w-100 table'>
                        <thead className='table-head'>
                            <th className='title table-header-title table-header-first-title text-center'>#</th>
                            <th className='title text-center'>Site</th>
                            <th className='title ps-3 text-start'>Total Exits</th>
                            <th className='title ps-3 text-start'>Avg Time(Hh:Mm)</th>
                            <th className='title text-center px-2'>Total Inside</th>
                        </thead>
                        <tbody>
                            {
                                table1.map((data, index) => (
                                    <tr className='rounded-table-row' key={index}>
                                        <td className='text text-center'>{index + 1}</td>
                                        <td className='text text-center'>{data.site}</td>
                                        <td className='text ps-3 text-start'>{data.totalExits}</td>
                                        <td className='text ps-3 test-start'>{data.avgTime}</td>
                                        <td className='text ps-3 test-start'>{data.totalInside}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className='table-responsive' style={{ marginTop: "25%" }}>
                    <table className='w-100 table'>
                        <thead className='table-head'>
                            <th className='title table-header-title table-header-first-title text-center'>#</th>
                            <th className='title text-center'>Site</th>
                            <th className='title ps-3 text-start'>Vehicle</th>
                            <th className='title ps-3 text-start'>Entry Time</th>
                            <th className='title text-center'>Exit Time</th>
                            <th className='title text-center'>Duration</th>
                        </thead>
                        <tbody>
                            {
                                table2.map((data, index) => (
                                    <tr className='rounded-table-row' key={index}>
                                        <td className='text text-center'>{index + 1}</td>
                                        <td className='text text-center'>{data.site}</td>
                                        <td className='text ps-3 text-start'>{data.entryTime}</td>
                                        <td className='text ps-3 test-start'>{data.exitTime}</td>
                                        <td className='text ps-3 test-start'>{data.duration}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>
    );
}

export default EntranceDashboard
