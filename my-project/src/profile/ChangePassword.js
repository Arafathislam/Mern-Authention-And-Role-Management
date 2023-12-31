import React from 'react'
import { Link } from 'react-router-dom'
const ChangePassword = () => {
  return (
    <div className='mt-5 flex flex-col justify-center items-center'>



      <div className="text-2xl">
        <p>Change Password</p>
      </div>




      {/* cards flex start */}

      <div className='m-5 flex gap-3 justify-center items-center '>

        {/* card start */}
        <div className="w-[800px]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">



          <form className="max-w-sm mx-auto">



            <div className="">
              <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••" required />
              <p className="mt-2 text-sm text-gray-900 ">Enter Old Password</p>
            </div>



            <div className="">
              <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••" required />
              <p className="mt-2 text-sm text-gray-900 ">Enter New Password</p>
              
            </div>


            <div className="">
              <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••" required />
              <p className="mt-2 text-sm text-gray-900 ">Confirm New Password</p>

            </div>

            <div className="flex justify-center mt-3">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Confirm</button>

            </div>
            


          </form>




        </div>

        {/* card end */}
















      </div>

      {/* cards flex end */}


    </div>
  )
}

export default ChangePassword