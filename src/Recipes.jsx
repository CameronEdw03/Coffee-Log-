import React, { useState, useRef, useEffect } from 'react'
import { IoMdTrash, IoIosAdd, IoIosSearch } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

function Recipes() {
    const [recipes, setRecipes] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [newRecipe, setNewRecipe] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        category: 'General',
        notes: ''
    })

    const sidebarRef = useRef()
    const navigate = useNavigate()

    const handleBeans = () => navigate('/Beans')
    const handleLog = () => navigate('/Home')
    const handleMachine = () => navigate('/Machines')

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsSidebarOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isSidebarOpen])

    const handleAddRecipe = () => {
        if (newRecipe.title && newRecipe.ingredients) {
            const newEntry = { ...newRecipe, id: Date.now() }
            setRecipes(prev => [...prev, newEntry])
            setNewRecipe({
                title: '',
                ingredients: '',
                instructions: '',
                category: 'General',
                notes: ''
            })
            setShowForm(false)
        }
    }

    const handleDeleteRecipe = (id) => {
        setRecipes(recipes.filter(r => r.id !== id))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewRecipe({ ...newRecipe, [name]: value })
    }

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.notes.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen flex">
            <button
                className="fixed top-4 left-4 z-40 bg-amber-950 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-all duration-300"
                onClick={() => setIsSidebarOpen(true)}
            >
                <RxHamburgerMenu />
            </button>

            {isSidebarOpen && <div className="fixed inset-0 z-30 bg-opacity-30"></div>}

            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-screen z-40 bg-white transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <img src='/SideBar.svg' alt='sidebar' className='h-full' />
                <div className='absolute top-40 left-16 flex flex-col space-y-20'>
                    <button onClick={handleBeans}><img src='/BeansBtn.svg' alt='beans' className='hover:scale-105 transition-all duration-300 cursor-pointer'/></button>
                    <button onClick={handleMachine}><img src='/MachineButton.svg' alt='machine' className='hover:scale-105 transition-all duration-300 cursor-pointer'/></button>
                    <button><img src='/RecipesBtn.svg' alt='recipes' /></button>
                    <button onClick={handleLog}><img src='/CoffeeLogBtn.svg' alt='log' className='hover:scale-105 transition-all duration-300 cursor-pointer'/></button>
                </div>
            </div>

            <div className={`${isSidebarOpen ? 'ml-60' : 'ml-16'} w-full transition-all duration-300 p-8`}>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-orange-300">My Recipes</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <IoIosSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search recipes..."
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
                            <span>Add Recipe</span>
                        </button>
                    </div>
                </div>

                {filteredRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRecipes.map(recipe => (
                            <div key={recipe.id} className="bg-white rounded-lg shadow-md border border-orange-200 hover:shadow-lg transition-all duration-300">
                                <div className="bg-amber-950 text-white p-4 flex justify-between items-center">
                                    <h3 className="font-bold text-lg">{recipe.title}</h3>
                                    <button
                                        className="text-white hover:text-orange-300"
                                        onClick={() => handleDeleteRecipe(recipe.id)}
                                    >
                                        <IoMdTrash className="text-xl" />
                                    </button>
                                </div>
                                <div className="p-4 text-black">
                                    <p className="text-sm mb-2"><span className="font-semibold">Category:</span> {recipe.category}</p>
                                    <p className="text-sm mb-2"><span className="font-semibold">Ingredients:</span><br /> {recipe.ingredients}</p>
                                    <p className="text-sm mb-2"><span className="font-semibold">Instructions:</span><br /> {recipe.instructions || 'N/A'}</p>
                                    <p className="text-sm italic text-gray-600">{recipe.notes}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-orange-100 rounded-lg p-8 text-center">
                        <p className="text-lg text-gray-600">No recipes found. Add your first recipe to get started!</p>
                    </div>
                )}

                {showForm && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="rounded-lg shadow-xl bg-orange-300 p-6 w-full max-w-md text-white">
                            <h2 className="text-2xl font-bold text-white mb-4">Add New Recipe</h2>
                            <div className="space-y-4">
                                <input name="title" value={newRecipe.title} onChange={handleChange} className="w-full px-3 py-2 border border-orange-300 rounded-lg text-gray-800" placeholder="Recipe Title*" />
                                <textarea name="ingredients" value={newRecipe.ingredients} onChange={handleChange} className="w-full px-3 py-2 border border-orange-300 rounded-lg text-gray-800" placeholder="Ingredients*" rows="3" />
                                <textarea name="instructions" value={newRecipe.instructions} onChange={handleChange} className="w-full px-3 py-2 border border-orange-300 rounded-lg text-gray-800" placeholder="Instructions" rows="3" />
                                <select name="category" value={newRecipe.category} onChange={handleChange} className="w-full px-3 py-2 border border-orange-300 rounded-lg text-gray-800">
                                    <option>General</option>
                                    <option>Espresso</option>
                                    <option>Filter</option>
                                    <option>Cold Brew</option>
                                    <option>Signature</option>
                                </select>
                                <textarea name="notes" value={newRecipe.notes} onChange={handleChange} className="w-full px-3 py-2 border border-orange-300 rounded-lg text-gray-800" placeholder="Notes" rows="2" />
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button className="px-4 py-2 border border-orange-300 rounded-lg hover:bg-orange-900 text-white" onClick={() => setShowForm(false)}>Cancel</button>
                                    <button className="px-4 py-2 bg-orange-400 hover:bg-orange-500 text-amber-950 font-medium rounded-lg" onClick={handleAddRecipe}>Save Recipe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Recipes
