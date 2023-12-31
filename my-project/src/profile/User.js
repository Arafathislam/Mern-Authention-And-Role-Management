import React from 'react'
import { Link } from 'react-router-dom'
const User = () => {
  return (
    <div className='mt-5 flex flex-col justify-center items-center'>



    <div className="text-2xl">
      <p>Users</p>
    </div>




    {/* cards flex start */}


<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
    <table class="w-[1200px]  text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    username
                </th>
                <th scope="col" class="px-6 py-3">
                    role
                </th>
                <th scope="col" class="px-6 py-3">
                    last Activity
                </th>
                <th scope="col" class="px-6 py-3">
                    Active
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
              
            </tr>
        </thead>
        <tbody>
            <tr class="odd:bg-white  even:bg-gray-50  border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    arafath
                </th>
                <td class="px-6 py-4">
                    admin
                </td>
                <td class="px-6 py-4">
                    17 min ago
                </td>
                <td class="px-6 py-4">
                    Yes
                </td>
                <td class="px-6 py-4 flex gap-2">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ban</a>
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                </td>
            </tr>

 
 
        </tbody>
    </table>
</div>



  

    {/* cards flex end */}


  </div>
  )
}

export default User