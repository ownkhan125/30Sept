'use client'

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const page = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleStates, setToggleStates] = useState([])
  const router = useRouter();


  const toggle = (id) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const favItem = async (id) => {
    toggle(id)
    try {
      const res = await fetch(`/api/items/${id}/favourites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      })
      if (res.ok) {
        const response = await res.json();
        console.log('response check', response._id);
      }
      else {
        router.push('/login')
      }

    } catch (error) {
      console.log('home page :', error.message);
    }
  }

  useEffect(() => {

    const fetchPost = async () => {

      try {
        const res = await fetch('/api/post', {
          method: 'GET'
        })
        const response = await res.json();
        setData(response)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false)
      } catch (error) {
        console.log('home page :', error.message);
      }
    }

    fetchPost();
  }, [])



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      // timeZoneName: 'short'
    });
  };


  return (
    <>
      <div className='container-1'>
        <div className="flex items-baseline">
          <div className="w-[80%] px-5">
            <div className=" w-full bg-[#e7e7e7] border-x border-slate-300 rounded-md shadow-md p-10 ">
              <div className="w-full sticky top-0 bg-[#e7e7e7]"><h2 className="text-center">POST</h2></div>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {Array(data.length || 10).fill(0).map((_, index) => (
                    <div key={index} className="flex justify-between items-end bg-white border-zinc-100 rounded-md p-3 shadow-md">
                      <div className="flex-1">
                        <Skeleton width="20%" height={20} />
                        <Skeleton width="40%" height={20} />
                        <Skeleton width="60%" height={20} />
                      </div>
                      <div>
                        <Skeleton circle={true} width={40} height={40} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                data?.map((items, index) => (
                  <div key={index} className="flex justify-between items-end bg-white border-zinc-100 rounded-md p-3 m-2 shadow-md">
                    <div>
                      <h3>Product: <span className="text-blue-800">{items.content}</span></h3>
                      <h3>Creater Name: <span className="text-slate-700">{items.author.name}</span></h3>
                      <h3>Post Date: <span className="text-slate-700">{formatDate(items.createdAt)}</span></h3>
                    </div>
                    <div>
                      <button onClick={() => favItem(items._id)}>
                        <MdFavoriteBorder className={`text-red-600 ${toggleStates[items._id] ? 'hidden' : 'block'}`} />
                        <MdOutlineFavorite className={`text-red-600 ${toggleStates[items._id] ? 'block' : 'hidden'}`} />
                      </button>
                    </div>
                  </div>
                ))
              )}

            </div>
          </div >


          <div className="w-[20%] sticky top-0">
            <div className=' w-full bg-[#e7e7e7] rounded-lg p-10 shadow-md animate-pulse hover:animate-none'>
              <Link href={'/login'}>< button className="btn my-3">Login</button></Link>
              <Link href={'/signup'}>< button className="btn my-3">Sign up</button></Link>
            </div>
          </div>
        </div >
      </div >

    </>
  )
}

export default page