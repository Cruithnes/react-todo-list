import { useState } from 'react'
import './App.css'

import { clsx } from 'clsx'
import { v4 as uuidv4 } from 'uuid';

function App() {

  //state
  const [list, setList] = useState([{ name: "Scratch your balls while coding this app", isChecked: true, id: uuidv4() }])

  //create list element
  const listElement = list.map((item, index) => {
    const className = clsx("max-w-[350px] break-words", { "line-through decoration-3 decoration-zinc-700": item.isChecked })
    return (
      <li key={index} className='mb-3'>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" name="item" className="form-checkbox h-5 w-5 accent-emerald-400 ms-3"
            checked={item.isChecked}
            onChange={() => handleCheck(item.id)}
          />
          <span className={className}>{item.name}</span>
          <div className='ml-auto mr-3'>
            <button className='bg-amber-400 rounded-md py-1 px-2 cursor-pointer text-black'
            onClick={() => handleDelete(item.id)}
            >X</button>
          </div>
        </label>
      </li>
    )
  })


  //functions
  function addListItem(formData) {
    const formDatas = formData.get("item")
    const newItem = { name: formDatas, isChecked: false, id: uuidv4() }
    setList(prevItem => [...prevItem, newItem])

  }

  function handleCheck(id) {
    setList(prevList =>
      prevList.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item))
  }

  function handleDelete(id) {
    setList(prevList =>
      prevList.filter(item =>
        item.id !== id  
      )
    )
  }

  return (
    <main className='text-zinc-100'>

      <header className='flex flex-row justify-center'>
        <h1 className='text-3xl font-bold my-7 tracking-wide  text-indigo-400'>To-Do List</h1>
      </header>

      <section className='flex flex-col text-zinc-400'>
        <p className='text-xl flex justify-center mb-6'>Create your own todo list!</p>

        <form action={addListItem} className='mx-5 flex justify-center items-center'>
          <label htmlFor="item" className='text-lg me-3'>Add to list</label>
          <input type="text" id='item' name='item' placeholder='Get groceries' className='me-5 w-1/2 bg-zinc-800 border border-zinc-700 text-zinc-100 px-3 py-2 rounded max-w-[500px]' />

          <button type="submit" className='rounded-lg px-9 py-2 bg-indigo-400 text-zinc-900 cursor-pointer
           transition delay-0 duration-100 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500
          '>Add</button>
        </form>
      </section>

      <section className='flex flex-col mt-7 mx-auto border-2 border-solid rounded-lg border-zinc-700 max-w-[500px] text-zinc-100'>
        <h2 className='text-5xl mb-2 ms-3 flex justify-center'>Your List</h2>
        {list.length = 0 && <p className='text-center text-zinc-400 tracking-tighter font-medium mb-5'>List is empty...</p>}
        <ul className='space-y-5'>
          {listElement}
        </ul>
      </section>

    </main>
  )
}

export default App
