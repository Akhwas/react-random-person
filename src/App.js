import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {

  const[user,setUser] = useState({})
  const [title,setTitle]=useState([])
  const [value,setValue]=useState([])
  const [loading,setLoading]=useState(false)

  const fetchData = async()=>{
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()

    const {results} = data
    console.log(results)
    

    if (results){
      
        const randomUser = results.map((result)=>{
          const {cell,dob:{age},email,location:{postcode,street:{number,name}},login:{password},name:{first,last},picture:{large}}
        = result
        return {'my phone is':cell,'my age is':age,'my email is':email,'my street is':[number,name].join(' '),'my password is':password,'my name is':[first,last].join(' '),picture:large}
      })
      setUser(randomUser[0])
      console.log(randomUser)
      setTitle(Object.keys(randomUser[0])[5])
      setValue(Object.values(randomUser[0])[5])
      console.log(Object.keys(randomUser[0]))
    }
    setLoading(false)
  } 
  const showProp = (index)=>{
    setTitle(Object.keys(user)[index])
    setValue(Object.values(user)[index])
  }
  useEffect(()=>{
    fetchData()
    console.log(user)
    
    
  },[setUser])
  return <main>
    <div className='block bcg-black'>
    </div>
    <div className='block'>
      <div className='container'>
        <img src={user.picture} className='user-img'/>
        {

        }
        <p className='user-title' >
          {title}
        </p>
        <p className='user-value'>
          {value}
        </p>
        <div className='values-list'>
          <button className='icon' data-label='name' onMouseOver={()=>showProp(5)}>
            <FaUser />
          </button>
          <button className='icon' data-label='email' onMouseOver={()=>showProp(2)}>
            <FaEnvelopeOpen />
          </button>
          <button className='icon' data-label='age' onMouseOver={()=>showProp(1)}>
            <FaCalendarTimes />
          </button>
          <button className='icon' data-label='address' onMouseOver={()=>showProp(3)}>
            <FaMap />
          </button>
          <button className='icon' data-label='phone' onMouseOver={()=>showProp(0)}>
            <FaPhone />
          </button>
          <button className='icon' data-label='password' onMouseOver={()=>showProp(4)}>
            <FaLock />
          </button>
        </div>
        <button className='btn' type='button' onClick={fetchData}>{loading?'Loading...':'random user'}</button>
      </div>
    </div>
  </main>
}

export default App
