import { useContext } from 'react';
import { FaUserAlt } from 'react-icons/fa'
import TransactionsContext from '../context/transactions';

function NavigationBar() {
  const { currentUser, navigation, removeDataFromStorage } = useContext(TransactionsContext);

  const handleLogout = () => {
    navigation('/log-in');
    removeDataFromStorage();
  };

  return (
    <div className='flex flex-row justify-between items-center px-8 bg-white shadow-sm'>
        <p className='font-bold text-xl'>Logo</p>
        <ul className='flex flex-row'>
          <li className='text-lg font-semibold'>
          <button className='text-emerald-500 focus:outline-none hover:text-emerald-600 border-b-2 border-emerald-500 py-4 px-6'>Transactions</button>
          </li>
          <li className='text-lg font-semibold'>
            <button className='text-gray-400 focus:outline-none hover:text-gray-500 py-4 px-6'>Other</button>
          </li>
        </ul>
        <div className='flex flex-row items-center gap-2'>
          <div className='flex flex-row items-center'>
            <FaUserAlt></FaUserAlt>
            <p className='mx-2 font-semibold text-gray-600'>{currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1)}</p>
          </div>
          <div>
            {/* <BiChevronDown></BiChevronDown> */}
            <button className='hover:bg-gray-300 rounded-md bg-gray-400 px-2 h-10 text-slate-50 font-medium text-lg self-center' onClick={handleLogout}>Log out</button>
          </div>
        </div>
    </div>
  )
}

export default NavigationBar