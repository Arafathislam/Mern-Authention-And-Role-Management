import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../features/auth/authApiSlice';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrMsg('Passwords do not match');
            return;
        }

        try {
            const { data, message, httpStatus, error } = await register({ username, email, password,confirmPassword}).unwrap();

            if (!error && httpStatus === 202) {
                // Registration success logic, if needed
                console.log('Registration successful:', message);
                // Redirect to login or any other page
                navigate('/login');
            } else {
                // Registration failure logic, if needed
                console.error('Registration failed:', message);
                setErrMsg(message);
            }
        } catch (err) {
            // Handle other errors
            console.error(err);
            setErrMsg('An error occurred during registration');
        }
    };

    return (
        <>
            <div className='max-w-sm mx-auto'>
                <h1 className='text-center mt-2 mb-3 text-4xl'>Register Form</h1>

                <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                            Username
                        </label>
                        <input
                            type='text'
                            id='username'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                            placeholder='Username'
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className=''>
                        <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                            Email address
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                            placeholder='example@company.com'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className=''>
                        <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                            placeholder='•••••••••'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className=''>
                        <label
                            htmlFor='confirmPassword'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                            placeholder='•••••••••'
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-center mt-3'>
                        <button
                            type='submit'
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </div>

                    {errMsg && <p className='mt-2 text-sm text-red-600'>{errMsg}</p>}
                </form>

                <p className='mt-2 text-sm text-red-600 '>
                    <span className='font-medium'>Already have an account!</span> <Link to='/login'> Login here!</Link>
                </p>
            </div>
        </>
    );
};

export default Register;
