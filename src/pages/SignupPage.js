import { useState, useContext  } from 'react';
import {useAddUserMutation} from "../store"
import TransactionsContext from '../context/transactions';

function Signup() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addUser] = useAddUserMutation();

  const { navigation } = useContext(TransactionsContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit =  (event) => {
    event.preventDefault();
    if (password.length < 6) {
      return;
    } else if (!email) {
      return;
    }

    const newUser= {
      name, 
      surname, 
      email, 
      password
    }

    addUser(newUser);
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    navigation('/log-in')
  };

  const handleLoginClick = () => {
    navigation('/log-in');
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-4 ">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Create an Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="rounded-none w-full px-3 py-2 border text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
              />
              <p className='text-small text-gray-400 py-1 px-2'>
              {name.length < 2 ? "Name must be longer than 2 characters!" : ""}
              </p>
            </div>
            <div>
              <label htmlFor="surname" className="sr-only">
                Surname
              </label>
              <input
                id="surname"
                name="surname"
                type="text"
                autoComplete="surname"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Surname"
                value={surname}
                onChange={handleSurnameChange}
              />
              <p className='text-small text-gray-400 py-1 px-2'>
              {surname.length < 2 ? "Surname must be longer than 2 characters!" : ""}
              </p>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
              />
              <p className='text-small text-gray-400 py-1 px-2'>
              {!email && "Email field is required!"}
              </p>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-900  focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <p className='text-small text-gray-400 py-1 px-2'>
              {password.length < 6 ? "Password must be longer than 6 characters!" : ""}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Create an account
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <span
              onClick={handleLoginClick}
              className="font-medium text-emerald-600 hover:text-emerald-500 cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );

}

export default Signup;
