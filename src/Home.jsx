import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

function Home() {
    const [type, setType] = useState(false)
    const [date, setDate] = useState(false)
    const [bean, setBean] = useState(false)
    const [grindDropdown, setGrindDropdown] = useState(false)

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [shotData, setShotData] = useState([])
    const [brewTime, setBrewTime] = useState('')
    const [timeOfShot, setTimeOfShot] = useState('')
    const [selectedBean, setSelectedBean] = useState('N/A')
    const [beansList, setBeansList] = useState([])
    const [selectedType, setSelectedType] = useState('Espresso')
    const [grindSize, setGrindSize] = useState(5)

    const navigate = useNavigate()

    const handleRecipes = () => {
        navigate('/recipes')
    }

    const handleMachine = () => {
        navigate('/machines')
    }

    useEffect(() => {
        const fetchBeans = async () => {
            try {
                const response = await axios.get('http://localhost:8000/beans/')
                setBeansList(response.data)
            } catch (error) {
                console.error('Error fetching beans:', error)
            }
        }

        fetchBeans()
    }, [])

    const handleBeans = () => {
        navigate('/beans')
    }

    const handleType = () => {
        setType((prev) => !prev)
        if (!type) {
            setDate(false)
            setBean(false)
            setGrindDropdown(false)
        }
    }

    const handleDate = () => {
        setDate((prev) => !prev)
        if (!date) {
            setType(false)
            setBean(false)
            setGrindDropdown(false)
        }
    }

    const handleBean = () => {
        setBean((prev) => !prev)
        if (!bean) {
            setType(false)
            setDate(false)
            setGrindDropdown(false)
        }
    }

    const handleGrind = () => {
        setGrindDropdown((prev) => !prev)
        if (!grindDropdown) {
            setType(false)
            setDate(false)
            setBean(false)
        }
    }

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleLogShot = () => {
        if (timeOfShot && brewTime) {
            const newShot = {
                id: shotData.length + 1,
                date: selectedDate.toISOString().split('T')[0],
                brewTime,
                timeOfShot,
                bean: selectedBean,
                type: selectedType,
                grindSize
            }
            setShotData([...shotData, newShot])
            setBrewTime('')
            setTimeOfShot('')
        }
    }

    return (
        <div>
            <div className='flex justify-center align-center pt-15 ml-100'>
                <img src='/HomeHeader.svg' alt='Header' />
            </div>

            <div className='flex justify-center mt-4 ml-100 relative'>
                {/* Type */}
                <div className='relative'>
                    <button className='z-50 flex items-center space-x-1 px-10 py-2 text-[20px] cursor-pointer' onClick={handleType}>
                        <span>{selectedType}</span>
                        {type ? <IoIosArrowUp className='text-orange-300' /> : <IoIosArrowDown className='text-orange-300' />}
                    </button>
                    {type && (
                        <div className='absolute left-0 top-full mt-2 w-48 bg-orange-300 rounded shadow-lg p-4 z-50'>
                            <ul className='space-y-2'>
                                {['Espresso', 'Pour Over', 'French Press', 'Cold Brew'].map((brew) => (
                                    <li
                                        key={brew}
                                        className={`cursor-pointer hover:text-amber-950 transition-all duration-300 ${selectedType === brew ? 'font-bold' : ''}`}
                                        onClick={() => {
                                            setSelectedType(brew);
                                            setType(false);
                                        }}
                                    >
                                        {brew}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Date */}
                <div className='relative ml-8'>
                    <button className='z-50 flex items-center space-x-1 px-10 py-2 text-[20px] cursor-pointer' onClick={handleDate}>
                        <span>Date</span>
                        {date ? <IoIosArrowUp className='text-orange-300' /> : <IoIosArrowDown className='text-orange-300' />}
                    </button>
                    {date && (
                        <div className='absolute left-0 top-full mt-2 bg-orange-300 rounded shadow-lg p-4 z-50'>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                inline
                                className="bg-white rounded"
                            />
                        </div>
                    )}
                </div>

                {/* Bean */}
                <div className='relative ml-8'>
                    <button className='z-50 flex items-center space-x-1 px-10 py-2 text-[20px] cursor-pointer' onClick={handleBean}>
                        <span>Bean</span>
                        {bean ? <IoIosArrowUp className='text-orange-300' /> : <IoIosArrowDown className='text-orange-300' />}
                    </button>
                    {bean && (
                        <div className='absolute left-0 top-full mt-2 w-60 bg-orange-300 rounded shadow-lg p-4 z-50'>
                            {beansList.map((beanItem) => (
                                <div
                                    key={beanItem.id}
                                    className={`cursor-pointer hover:text-amber-950 transition-all duration-300 ${selectedBean === beanItem.name ? 'font-bold' : ''}`}
                                    onClick={() => setSelectedBean(beanItem.name)}
                                >
                                    {beanItem.name}
                                </div>
                            ))}
                            <button className='flex items-center justify-between w-full mt-2 hover:text-amber-950 cursor-pointer transition-all duration-300' onClick={handleBeans}>
                                <span>Add new Bean</span>
                                <IoIosAdd className="text-xl" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Grind Size */}
                <div className='relative ml-8'>
                    <button className='z-50 flex items-center space-x-1 px-10 py-2 text-[20px] cursor-pointer' onClick={handleGrind}>
                        <span>Grind: {grindSize}</span>
                        {grindDropdown ? <IoIosArrowUp className='text-orange-300' /> : <IoIosArrowDown className='text-orange-300' />}
                    </button>
                    {grindDropdown && (
                        <div className='absolute left-0 top-full mt-2 w-48 bg-orange-300 rounded shadow-lg p-4 z-50'>
                            <ul className='space-y-2'>
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((size) => (
                                    <li
                                        key={size}
                                        className={`cursor-pointer hover:text-amber-950 transition-all duration-300 ${grindSize === size ? 'font-bold' : ''}`}
                                        onClick={() => {
                                            setGrindSize(size)
                                            setGrindDropdown(false)
                                        }}
                                    >
                                        {size} {size === 1 ? '(Super Fine)' : size === 10 ? '(Coarse)' : ''}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Inputs and Log Button */}
            <div className='flex justify-center items-center mt-8 space-x-4 ml-100 mt-20'>
                <input
                    type='time'
                    className='px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring focus:border-orange-400'
                    value={timeOfShot}
                    onChange={(e) => setTimeOfShot(e.target.value)}
                />
                <input
                    type='number'
                    placeholder='Seconds'
                    className='px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring focus:border-orange-400 w-32'
                    value={brewTime}
                    onChange={(e) => setBrewTime(e.target.value)}
                />
                <button
                    className='bg-amber-950 hover:bg-amber-900 transition-all duration-300 text-white px-6 py-2 rounded font-medium cursor-pointer'
                    onClick={handleLogShot}
                >
                    Log shot
                </button>
            </div>

            {/* Shot History Table */}
            <div className='flex justify-center mt-50 ml-100'>
                <div className='w-3/4 max-w-4xl border border-orange-300 rounded-lg overflow-hidden'>
                    <div className='bg-amber-950 text-white p-3'>
                        <h2 className='text-xl font-medium'>Shot History</h2>
                    </div>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-orange-300'>
                                <tr>
                                    <th className='py-3 px-4 text-left border-b border-orange-200 text-amber-950'>Date</th>
                                    <th className='py-3 px-4 text-left border-b border-orange-200 text-amber-950'>Time of Shot</th>
                                    <th className='py-3 px-4 text-left border-b border-orange-200 text-amber-950'>Brew Time (sec)</th>
                                    <th className='py-3 px-4 text-left border-b border-orange-200 text-amber-950'>Bean</th>
                                    <th className='py-3 px-4 text-left border-b border-orange-200 text-amber-950'>Type</th>
                                    <th className='py-3 px-4 text-left border-b border-orange-200 text-amber-950'>Grind Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shotData.map((shot) => (
                                    <tr key={shot.id} className='hover:bg-amber-950 transition-all duration-300'>
                                        <td className='py-3 px-4 border-b border-orange-100'>{shot.date}</td>
                                        <td className='py-3 px-4 border-b border-orange-100'>{shot.timeOfShot}</td>
                                        <td className='py-3 px-4 border-b border-orange-100'>{shot.brewTime}s</td>
                                        <td className='py-3 px-4 border-b border-orange-100'>{shot.bean}</td>
                                        <td className='py-3 px-4 border-b border-orange-100'>{shot.type}</td>
                                        <td className='py-3 px-4 border-b border-orange-100'>{shot.grindSize}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Sidebar and Buttons */}
            <img src='/SideBar.svg' alt='sidebar' className='h-screen absolute top-0 left-0' />
            <div className='absolute top-40 left-16 flex flex-col space-y-20'>
                <button className='cursor-pointer transition-all duration-300 hover:scale-105' onClick={handleBeans}>
                    <img src='/BeansBtn.svg' alt='beans' />
                </button>
                <button className='cursor-pointer transition-all duration-300 hover:scale-105' onClick={handleMachine}>
                    <img src='/MachineButton.svg' alt='machine' />
                </button>
                <button className='cursor-pointer transition-all duration-300 hover:scale-105' onClick={handleRecipes}>
                    <img src='/RecipesBtn.svg' alt='recipes' />
                </button>
            </div>
        </div>
    )
}

export default Home;
