import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'

const Login = () => {

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/user/dashboard')
        } catch (err) {
            if (!err.status) {
            
                setErrMsg(err.data?.message);
            }

            
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>
   

return (


    <div className='max-w-sm mx-auto'>
        <h1 className='text-center mt-2  mb-3 text-4xl'>Login Form</h1>



        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div>
                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input
                    type="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    placeholder="Username"
                    name="username"
                    autoComplete="username"
                    ref={userRef}
                    value={username}
                    onChange={handleUserInput}
                    required />

            </div>


            <div className="">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="•••••••••"
                    name="password"
                    onChange={handlePwdInput}
                    value={password}
                    required />

            </div>

            <div className="flex justify-center mt-3">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Login</button>
            </div>


            

        </form>

        <p className="mt-2 text-sm text-red-600 "><span className="font-medium">Don't have an account!</span> <Link to="/register"> Register here!</Link></p>






    </div>
)
}

export default Login