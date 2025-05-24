
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Machines() {
    const [activeTab, setActiveTab] = useState('machine'); // Default to machine tab
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [selectedGrinder, setSelectedGrinder] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();

    const handleRecipes = () => {
        navigate('/recipes');
    };

    const handleLog = () => {
        navigate('/home');
    };
    const handleBeans = () => {
        navigate('/beans');
    };

    const handleMachineTab = () => {
        setActiveTab('machine');
        setShowDropdown(false);
    };
    
    const handleGrinderTab = () => {
        setActiveTab('grinder');
        setShowDropdown(false);
    };
    
    const handleMachineSelect = (machine) => {
        setSelectedMachine(machine);
        setShowDropdown(false);
    };
    
    const handleGrinderSelect = (grinder) => {
        setSelectedGrinder(grinder);
        setShowDropdown(false);
    };
    
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    
    // Load saved selections on component mount
    useEffect(() => {
        const savedMachine = localStorage.getItem('selectedMachine');
        const savedGrinder = localStorage.getItem('selectedGrinder');
        
        if (savedMachine) {
            setSelectedMachine(JSON.parse(savedMachine));
        }
        if (savedGrinder) {
            setSelectedGrinder(JSON.parse(savedGrinder));
        }
    }, []);

    // Save machine selection to localStorage
    useEffect(() => {
        if (selectedMachine) {
            localStorage.setItem('selectedMachine', JSON.stringify(selectedMachine));
        }
    }, [selectedMachine]);

    // Save grinder selection to localStorage
    useEffect(() => {
        if (selectedGrinder) {
            localStorage.setItem('selectedGrinder', JSON.stringify(selectedGrinder));
        }
    }, [selectedGrinder]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setShowDropdown(false);
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    
    // Stop propagation for dropdown clicks
    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };
    
    const coffeeMachine = [{
        id: 1,
        name: 'La Marzocco',
        img: '/LaMarzoco.svg'
    }, {
        id: 2,
        name: 'Breville',
        img: '/Breville.svg'
    }, {
        id: 3, 
        name: 'Lelit',
        img: '/LelitAnn.svg'
    }, {
        id: 4,
        name: 'Ninja',
        img: '/Ninja.svg'
    }];

    const coffeeGrinder = [{
        id: 1,
        name: 'Varia',
        img: '/Varia.svg'
    }, {
        id: 2,
        name: 'Breville',
        img: '/BrevilleGrinder.svg'
    }, {
        id: 3,
        name: 'Fellow',
        img: '/Fellow.svg'
    }];

    
    const currentList = activeTab === 'machine' ? coffeeMachine : coffeeGrinder;
    const currentSelected = activeTab === 'machine' ? selectedMachine : selectedGrinder;
    const handleSelect = activeTab === 'machine' ? handleMachineSelect : handleGrinderSelect;
    const placeholderText = activeTab === 'machine' ? "Select Coffee Machine" : "Select Coffee Grinder";

    return (
        <div className="relative min-h-screen">
            <img
                src="/SideBar.svg"
                alt="sidebar"
                className="h-screen fixed top-0 left-0"
            />
            
            <div className="fixed top-40 left-16 flex flex-col space-y-20 z-10">
                <button className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={handleBeans}>
                    <img src="/BeansBtn.svg" alt="beans" />
                </button>
                <button className="cursor-pointer transition-all duration-300 hover:scale-105">
                    <img src="/MachineButton.svg" alt="machine" />
                </button>
                <button className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={handleRecipes}>
                    <img src="/RecipesBtn.svg" alt="recipes" />
                </button>
                <button className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={handleLog}>
                    <img src="/CoffeeLogBtn.svg" alt="log" />
                </button>
            </div>
            
            <div className="pl-80 flex flex-col items-center pt-12">
                <img 
                    src="/MachineHeader.svg"
                    alt="header"
                    className="h-auto mb-6 ml-20"
                />
                
                <div className="flex space-x-6 mb-8">
                    <button 
                        onClick={handleMachineTab}
                        className={`${activeTab === 'machine' ? "bg-orange-300 text-black" : "bg-amber-950 text-white"} rounded-full w-40 h-10 cursor-pointer transition-all duration-300 hover:scale-105`}
                    >
                        Coffee Machine
                    </button>
                    <button 
                        onClick={handleGrinderTab}
                        className={`${activeTab === 'grinder' ? "bg-orange-300 text-black" : "bg-amber-950 text-white"} rounded-full w-40 h-10 cursor-pointer transition-all duration-300 hover:scale-105`}
                    >
                        Grinder
                    </button>
                </div>
                
                {/* Dropdown for current selection */}
                <div className="relative mb-10" onClick={handleDropdownClick}>
                    <button 
                        onClick={toggleDropdown}
                        className="bg-orange-300 text-black px-6 py-2 rounded-full shadow flex items-center justify-between w-64"
                    >
                        <span className="font-medium">
                            {currentSelected ? currentSelected.name : placeholderText}
                        </span>
                        <svg 
                            className={`w-5 h-5 transition-transform ${showDropdown ? "rotate-180" : ""}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    
                    {showDropdown && (
                        <div className="absolute left-0 mt-2 w-full bg-orange-300 rounded-md shadow-lg z-20">
                            {currentList.map((item) => (
                                <div 
                                    key={item.id}
                                    onClick={() => handleSelect(item)}
                                    className="flex items-center px-4 py-3 hover:bg-amber-950 cursor-pointer"
                                >
                                    <img 
                                        src={item.img} 
                                        alt={item.name} 
                                        className="w-8 h-8 mr-3"
                                    />
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Display selected item image */}
                <div className="mt-6 flex flex-col items-center">
                    {activeTab === 'machine' && selectedMachine && (
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">Your Coffee Machine</h3>
                            <img 
                                src={selectedMachine.img} 
                                alt={selectedMachine.name}
                                className="w-100 h-100 object-contain" 
                            />
                            <p className="mt-4 text-lg">{selectedMachine.name}</p>
                        </div>
                    )}
                    
                    {activeTab === 'grinder' && selectedGrinder && (
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">Your Coffee Grinder</h3>
                            <img 
                                src={selectedGrinder.img} 
                                alt={selectedGrinder.name}
                                className="w-100 h-100 object-contain" 
                            />
                            <p className="mt-4 text-lg">{selectedGrinder.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Machines;