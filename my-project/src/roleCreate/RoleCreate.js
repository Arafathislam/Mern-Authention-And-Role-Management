import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
const RoleCreate = () => {


  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  return (
    <div className='mt-5 flex flex-col justify-center items-center'>



      <div className="text-2xl">
        <p>Role Create</p>
      </div>




      {/* cards flex start */}

      <div className='m-5 flex gap-3 justify-center items-center '>

        {/* card start */}
        <div className="w-[1200px]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">

          <form className="max-w-sm mx-auto">
     

   {/* User  choice filed */}

      <div className='flex gap-2'>

      <div>
            <button id="dropdownSearchButton"   onClick={toggleDropdown} data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center " type="button">Dropdown User <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            <div className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-white rounded-lg shadow w-60 absolute`}>
              <div className="p-3">
                <label for="input-group-search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search user" />
                </div>
              </div>
              <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 " aria-labelledby="dropdownSearchButton">
              
        
              
        
             
                <li>
                  <div className="flex items-center ps-2 rounded hover:bg-gray-100">
                    <input id="checkbox-item-17" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2 " />
                    <label for="checkbox-item-17" className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded d">arafath</label>
                  </div>
                </li>











              </ul>
              <a href="#" className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50  hover:bg-gray-100 hover:underline">
                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                </svg>
                Add User
              </a>
            </div>


            </div>

          
            <div className='mt-1'>
              <h1>Arafath,islam,Arnob,Arif</h1>
            </div>


            </div>


  {/*  User choice filed end  */}






   {/* Access  choice filed */}


{/*  Access choice filed end  */}








            <div className="flex justify-center mt-3">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Done</button>

            </div>













          </form>






        </div>

        {/* card end */}
















      </div>

      {/* cards flex end */}


    </div>
  )
}

export default RoleCreate