'use client'

import Link from "next/link"

const page = () => {

  return (
    <>
      <div className='container-1'>
        <div className='card'>
          <Link href={'/login'}>< button className="btn my-3">Login</button></Link>
          <Link href={'/signup'}>< button className="btn my-3">Sign up</button></Link>
        </div>
      </div>

    </>
  )
}

export default page