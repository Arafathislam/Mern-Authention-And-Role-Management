import React from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
    return (
        <>

            <div className='max-w-sm mx-auto'>
                <h1 className='text-center mt-2  mb-3 text-4xl'>Register Form</h1>



                <form class="max-w-sm mx-auto">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Username" required />
                        <p class="mt-2 text-sm text-red-600 "><span class="font-medium">Oops!</span> Username already taken!</p>

                    </div>



                    <div class="">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="example@company.com" required />
                        <p class="mt-2 text-sm text-red-600 "><span class="font-medium">Oops!</span> Email already taken!</p>
                   
                    </div>

                    <div class="">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••" required />
                        <p class="mt-2 text-sm text-red-600 "><span class="font-medium">Oops!</span> Password doesnt match!</p>
                    </div>


                    <div class="">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••" required />
                        <p class="mt-2 text-sm text-red-600 "><span class="font-medium">Oops!</span> Password doesnt match!</p>
                    </div>

                    <div class="flex justify-center mt-3">
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Register</button>

                    </div>
            <p class="mt-2 text-sm text-red-600 "><span class="font-medium">Already have an account!</span> <Link to="/login"> Login here!</Link></p>


                </form>






            </div>
        </>
    )
}

export default Register