import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center max-w-5xl">
        <Link to="/home" className="text-xl font-semibold">
          Connectify
        </Link>
        <div>
          <button className="btn btn-neutral">Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar