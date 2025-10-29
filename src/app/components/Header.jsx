import React from 'react'

const Header = ({title, subtitle}) => {
  return (
     <div className="text-center my-8">
        <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-3">{title}</h2>
        {subtitle && (
          <p className="text-pink-200 text-lg mb-4 max-w-2xl mx-auto">{subtitle}</p>
        )}
        <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full pink-glow"></div>
      </div>
  )
}

export default Header
