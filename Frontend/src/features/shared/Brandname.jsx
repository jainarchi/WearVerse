import React from 'react'
import { Link } from 'react-router-dom'

const Brandname = () => {
  return (
    <>
        <Link
            to="/"
            className="flex-shrink-0 group"
          >
            <span className="font-[family-name:var(--font-serif)] text-xl sm:text-2xl font-bold tracking-[0.12em] text-[#C9A96E] group-hover:text-[#d5c8a7] transition-colors duration-300">
              WearVerse
            </span>
          </Link>
      
    </>
  )
}

export default Brandname
