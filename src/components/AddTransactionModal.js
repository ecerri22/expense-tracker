import { useState, useContext } from 'react'; 
import { useAddTransactionMutation } from '../store';
import TransactionsContext from '../context/transactions';

function AddTransactionModal() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('ALL');
  const [date, setDate] = useState('');

  const [ addTransaction ] = useAddTransactionMutation();
  const { currentUser } = useContext(TransactionsContext)

  // console.log(currentUser);

  const handleSubmit = ( currentUser) => {
    // event.preventDefault();
    const addTransactionObj = {
      user: currentUser,
      transaction: {
        category,
        amount,
        currency,
        date,
      },
    };
  
    // console.log(addTransactionObj);

    addTransaction(addTransactionObj);
    
    setCategory(''); 
    setAmount(0);
    setCurrency('ALL');
    setDate('');  
  };
  

  return (
    <div className='bg-white w-full px-4 py-4 rounded-md shadow-sm space-x-4'>
      <div className='flex flex-row justify-between gap-x-4'>
        <div className="w-1/4">
          <label htmlFor="category" className="font-medium text-sm text-gray-400 ">Category</label>
          <select
            name="category"
            id="category"
            className="border rounded-md px-3 py-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose category</option>
            <option value="Food & Drink">Food & Drink</option>
            <option value="Shopping">Shopping</option>
            <option value="Transport">Transport</option>
            <option value="Home">Home</option>
            <option value="Travel">Travel</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>


            <option value="Salary">Salary</option>
            <option value="Gift">Gift</option>
            <option value="Loan">Loan</option>
            <option value="Extra Income">Extra Income</option>
          </select>
        </div>

        <div className="w-1/4">
          <label htmlFor="date" className="font-medium text-sm text-gray-400 ">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="border rounded-md px-3 py-2 w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="w-1/4">
          <label htmlFor="amount" className="font-medium text-sm text-gray-400 ">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="border rounded-md px-3 py-2 w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="w-1/4">
          <label htmlFor="currency" className="font-medium text-sm text-gray-400 ">Currency</label>
          <select
            name="currency"
            id="currency"
            className="border rounded-md px-3 py-2 w-full"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>
      <div className='text-end mt-2'>
        <button
          className='hover:bg-emerald-600 rounded-md bg-emerald-500 px-2 h-10 text-slate-50 font-medium text-lg self-center'
          onClick={()=>handleSubmit(currentUser)}
        >
          + Add transaction
        </button>
      </div>
    </div>
  );
}

export default AddTransactionModal;
