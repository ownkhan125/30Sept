'use client'

import Link from "next/link"
import { useEffect, useState } from "react"


const page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/post', {
          method: 'GET'
        })
        const response = await res.json();
        setData(response)
      } catch (error) {
        console.log('home page :', error.message);
      }
    }
    fetchPost();
  }, [])



  return (
    <>
      <div className='container-1'>
        <div className="flex items-baseline">
          <div className="w-[80%] px-5">
            <div className=" w-full bg-[#e7e7e7] border-x border-slate-300 rounded-md shadow-md p-10 ">
              <div className="w-fit mx-auto"><h2>POST</h2></div>
              {
                data.map((items, index) => (
                  <div key={index} className="bg-white border-zinc-100 rounded-md p-3 m-2 shadow-md">
                    <div>
                      <h3>Product: <span className="text-blue-800">{items.content}</span></h3>
                      <h3>Creater Name: <span className="text-slate-700">{items.author.name}</span></h3>
                      <p>Post Date: {items.createdAt}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>


          <div className="w-[20%] h-[100vh]">
            <div className='sticky top-0 w-full bg-[#e7e7e7] rounded-lg p-10 shadow-md animate-pulse'>
              <Link href={'/login'}>< button className="btn my-3">Login</button></Link>
              <Link href={'/signup'}>< button className="btn my-3">Sign up</button></Link>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default page