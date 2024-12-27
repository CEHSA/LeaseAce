import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#003976] text-white p-4">
      <div className="container mx-auto flex items-center gap-4">
        <img 
          src="/aaa-logo.png" 
          alt="AAA Student Rentals" 
          className="h-10 w-auto"
        />
        <h1 className="text-xl font-bold">Student Lease Agreement</h1>
      </div>
    </header>
  )
}

export default Header
