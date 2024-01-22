import { useState, useContext, useEffect  } from 'react';
import { useFetchUsersQuery } from '../store';
import TransactionsContext from '../context/transactions';

function Login() {

  const {data: fetchedUsers} = useFetchUsersQuery();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [localUsers, setLocalUsers] = useState([]);

  const { navigation, loginApp, setCurrentUser } = useContext(TransactionsContext);

  useEffect(() => {
    if (fetchedUsers) {
      setLocalUsers(fetchedUsers);
    }
  }, [fetchedUsers]);

  console.log(localUsers);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
  
    if (!localUsers || localUsers.length === 0) {
      setErrorMessage('No users');
      return; 
    }
  
    const foundUser = localUsers.find(
      (user) =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.password === password
    )
  
    if (foundUser) {
      loginApp();
      setCurrentUser(foundUser);

      //
      // console.log(foundUser);

      navigation('/homepage');
      setErrorMessage('');

      //
      // console.log("USER EXISTS LOG IN SUCCESSFUL");
    } else {
      setErrorMessage('Invalid username or password');
      //
      // console.log("NO USER!!!");
    }
  };

  
  const handleSignupClick = () => {
    navigation('/');
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Enter Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Login
            </button>
            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <span
              onClick={handleSignupClick}
              className="font-medium text-emerald-600 hover:text-emerald-500 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
