import './App.css'
import { Table } from './composants/body/Table'
import { Formulaire } from './composants/Header/formulaire'
import { useEffect, useState } from 'react'
import { Search } from './composants/Header/search'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { DetailsEtudiant } from './composants/detailsEtudiant'
function App() {
const [items,setItems] = useState([])
const [search,setSearch] = useState('')
const [modif,setModif] = useState(false)
const [currentItems,setCurrentItems] = useState(null)



const addItems = (item) => {
  if(modif && currentItems){
    // mode modification
    const updatedItems = items.map(i => i.id === currentItems.id ? item : i)
    setItems(updatedItems)
    localStorage.setItem('items',JSON.stringify(updatedItems))
    setModif(false)
    setCurrentItems(null)
  }else{
    // mode ajout
    setItems([...items,item])
    localStorage.setItem('items',JSON.stringify([...items,item]))
  }
}

const filtredItems = items.filter((item)=>{
  if(search && !item.nom.toLowerCase().includes(search.toLowerCase())) return false
  return true
 
})


// recuperations des donnes dans le localStorage
useEffect(() => {
  const itemsDate = JSON.parse(localStorage.getItem('items'))
  if(itemsDate) setItems(itemsDate)
},[])

// suppressionn d'un items
const deleteItem = (id) => {
  const newItems = items.filter(item => item.id !== id)
  localStorage.setItem('items',JSON.stringify(newItems))
  setItems(newItems)
}

// bloquer un items
const blockItem = (id) => {
  console.log('i bloque');
  
  const itemsDate = JSON.parse(localStorage.getItem('items'))
  const bloqItem = itemsDate.find(item => item.id === id)
  if(!bloqItem) return
  const result = bloqItem.bloquer ? true : false
  bloqItem.bloquer = !result
  localStorage.setItem('items',JSON.stringify(itemsDate))
  setItems(itemsDate)
  
}

const modifItems = (editId) => {
  const itemsDate = JSON.parse(localStorage.getItem('items'))
  const modifItem = itemsDate.find(item => item.id === editId)
  if(!modifItem) return
  console.log("donnes a modifier",modifItem);
  // item a modifier
  setCurrentItems(modifItem)
  setModif(true)
  
}
  return (
      <>
    <Router>

      <div className='container' id='app-container'>
        <h1>CRUD REACT</h1>
        <hr />
      <Routes>
        <Route path='/' element={
          <>
          <div className='row justify-content-center'>
                <div className="col">
                   <Search search={search}
                   onSearch={setSearch}
                   />
                 </div>
                 <div className="col">
                   <Formulaire addItems={addItems}
                   currentItems={currentItems}
                   modif={modif}
                   setModif={setModif}
                   />
                 </div>
            </div>

        <div className="row">

          <Table items={filtredItems}
          deleteItem={deleteItem}
          blockItem={blockItem}
          modifItems={modifItems}
          />
        </div>
        </>
        }></Route>

        <Route path='/details/:id' element={<DetailsEtudiant/>}></Route>

      </Routes>
        {/* <Body/> */}
      </div>
    
    </Router>
    </>
  )
}

export default App
