import React, { useState, useRef, useEffect } from 'react'
import { IoMdTrash, IoIosAdd, IoIosSearch } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

function Beans() {
    const [beans, setBeans] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [newBean, setNewBean] = useState({
        name: '',
        roaster: '',
        roastDate: '',
        type: 'Medium',
        notes: ''
    })
    const [searchTerm, setSearchTerm] = useState('')
    const sidebarRef = useRef()
    const navigate = useNavigate()

    const handleRecipes = () => {
        navigate('/Recipes')
    }

    const handleLog = () => {
        navigate('/Home')
    }
    const handleMachine = () => {
        navigate('/Machines')
    }

    useEffect(() => {
        fetch('https://pythonfastapi-pw29.onrender.com/beans')
            .then(res => res.json())
            .then(data => setBeans(data))
            .catch(err => console.error("Failed to fetch beans:", err))
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsSidebarOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isSidebarOpen])

    const handleAddBean = () => {
        if (newBean.name && newBean.roaster) {
            fetch('https://pythonfastapi-pw29.onrender.com/beans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBean)
            })
            .then(res => res.json())
            .then(addedBean => {
                setBeans(prev => [...prev, addedBean])
                setNewBean({
                    name: '',
                    roaster: '',
                    roastDate: '',
                    type: 'Medium',
                    notes: ''
                })
                setShowForm(false)
            })
            .catch(err => console.error("Failed to add bean:", err))
        }
    }

    const handleDeleteBean = (id) => {
        setBeans(beans.filter(bean => bean.id !== id))
        // Optionally implement DELETE on backend
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewBean({ ...newBean, [name]: value })
    }

    const filteredBeans = beans.filter(bean =>
        bean.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bean.roaster.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bean.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bean.notes.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen flex">
            <button
                className="fixed top-4 left-4 z-40 bg-amber-950 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-all duration-300"
                onClick={() => setIsSidebarOpen(true)}
            >
                <RxHamburgerMenu />
            </button>

            {isSidebarOpen && (
                <div className="fixed inset-0 z-30  bg-opacity-30"></div>
            )}

            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-screen z-40 bg-white transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <img src='/SideBar.svg' alt='sidebar' className='h-full' />
                <div className='absolute top-40 left-16 flex flex-col space-y-20'>
                    <button className='cursor-pointer transition-all duration-300 hover:scale-105'>
                        <img src='/BeansBtn.svg' alt='beans' />
                    </button>
                    <button className='cursor-pointer transition-all duration-300 hover:scale-105' onClick={handleMachine}>
                        <img src='/MachineButton.svg' alt='machine' />
                    </button>
                    <button className='cursor-pointer transition-all duration-300 hover:scale-105' onClick={handleRecipes}>
                        <img src='/RecipesBtn.svg' alt='recipes' />
                    </button>
                    <button className='cursor-pointer transition-all duration-300 hover:scale-105' onClick={handleLog}>
                        <img src='/CoffeeLogBtn.svg' alt='log' />
                    </button>
                </div>
            </div>

            <div className={`${isSidebarOpen ? 'ml-60' : 'ml-16'} w-full transition-all duration-300 p-8`}>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-orange-300">Coffee Beans</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <IoIosSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search beans..."
                                className="pl-10 pr-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring focus:border-orange-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            className="bg-amber-950 hover:bg-amber-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
                            onClick={() => setShowForm(true)}
                        >
                            <IoIosAdd className="text-xl" />
                            <span>Add Bean</span>
                        </button>
                    </div>
                </div>

                {filteredBeans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBeans.map(bean => (
                            <div key={bean.id} className="bg-white rounded-lg shadow-md border border-orange-200 hover:shadow-lg transition-all duration-300">
                                <div className="bg-amber-950 text-white p-4 flex justify-between items-center">
                                    <h3 className="font-bold text-lg">{bean.name}</h3>
                                    <button
                                        className="text-white hover:text-orange-300"
                                        onClick={() => handleDeleteBean(bean.id)}
                                    >
                                        <IoMdTrash className="text-xl" />
                                    </button>
                                </div>
                                <div className="p-4 text-black">
                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div>
                                            <p className="text-xs text-gray-500">Roaster</p>
                                            <p className="font-medium">{bean.roaster}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Roast Date</p>
                                            <p className="font-medium">{bean.roastDate || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-500">Roast Type</p>
                                        <p className="font-medium">{bean.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Flavor Notes</p>
                                        <p className="italic text-gray-700">{bean.notes || 'No notes added'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-orange-100 rounded-lg p-8 text-center">
                        <p className="text-lg text-gray-600">No beans found. Add your first coffee bean to get started!</p>
                    </div>
                )}

                {showForm && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="rounded-lg shadow-xl bg-orange-300 p-6 w-full max-w-md text-white">
                            <h2 className="text-2xl font-bold text-white mb-4">Add New Bean</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">Bean Name*</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newBean.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-orange-300 rounded-lg text-gray-800"
                                        placeholder="e.g. Ethiopian Yirgacheffe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">Roaster*</label>
                                    <input
                                        type="text"
                                        name="roaster"
                                        value={newBean.roaster}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-orange-300 rounded-lg text-gray-800"
                                        placeholder="e.g. Blue Bottle"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">Roast Date</label>
                                    <input
                                        type="date"
                                        name="roastDate"
                                        value={newBean.roastDate}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-orange-300 rounded-lg text-gray-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">Roast Type</label>
                                    <select
                                        name="type"
                                        value={newBean.type}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-orange-300 rounded-lg text-gray-800"
                                    >
                                        <option value="Light">Light</option>
                                        <option value="Medium-Light">Medium-Light</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Medium-Dark">Medium-Dark</option>
                                        <option value="Dark">Dark</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">Flavor Notes</label>
                                    <textarea
                                        name="notes"
                                        value={newBean.notes}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-orange-300 rounded-lg text-gray-800"
                                        placeholder="e.g. Floral, citrus, tea-like"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        className="px-4 py-2 border border-orange-300 rounded-lg hover:bg-orange-900 text-white"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-orange-400 hover:bg-orange-500 text-amber-950 font-medium rounded-lg"
                                        onClick={handleAddBean}
                                    >
                                        Save Bean
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Beans
