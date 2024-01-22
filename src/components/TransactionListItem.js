import { useState, useContext } from 'react';
import { FaShoppingBag, FaGift, FaMoneyBillAlt, FaMoneyBillWave } from "react-icons/fa";
import {MdFastfood, MdHome, MdFlightTakeoff, MdHealthAndSafety, MdSchool, MdDirectionsBus} from "react-icons/md"
import {AiFillBank} from "react-icons/ai"
import {GiMoneyStack} from "react-icons/gi"
import { useDeleteTransactionMutation, useEditTransactionMutation } from '../store';
import TransactionsContext from '../context/transactions';

function TransactionListItem({ transaction }) {

  const {currentUser} = useContext(TransactionsContext)

  const [deleteTransaction] = useDeleteTransactionMutation();
  const [editTransaction] = useEditTransactionMutation()
  
  const [openEditAccrd, setOpenAccrd] = useState(false);

  const [editedTransactionCategory, setEditedTransactionCategory] = useState(''); 
  const [editedTransactionAmount, setEditedTransactionAmount] = useState(''); 
  const [editedTransactionCurrency, setEditedTransactionCurrency] = useState(''); 
  const [editedTransactionDate, setEditedTransactionDate] = useState(''); 

  const handleSaveItem = (transaction) => {
    const editedInfo = {
      user: currentUser,
      transaction: {
        id: transaction.id,
        category: editedTransactionCategory,
        amount: editedTransactionAmount, 
        currency: editedTransactionCurrency,
        date: editedTransactionDate
      }
    }

    editTransaction(editedInfo);
    
    setOpenAccrd(!openEditAccrd);
  }
  
  const isExpenseCategory = [
    'Food & Drink',
    'Shopping',
    'Transport',
    'Home',
    'Travel',
    'Healthcare',
    'Education',
  ].includes(transaction.category);

  const categoryIcons = {
   "Food & Drink": MdFastfood,
    Shopping: FaShoppingBag,
    Transport: MdDirectionsBus,
    Home: MdHome,
    Travel: MdFlightTakeoff,
    Healthcare: MdHealthAndSafety,
    Education: MdSchool,
    Salary: FaMoneyBillWave,
    Gift: FaGift,
    Loan: AiFillBank,
    "Extra Income":GiMoneyStack
  };

  const TransactionIcon = categoryIcons[transaction.category] || FaMoneyBillAlt;

  const transactionAmount = isExpenseCategory
  ? `-${transaction.amount} ${transaction.currency}`
  : `+${transaction.amount} ${transaction.currency}`;

  const transactionColor = isExpenseCategory ? 'text-red-500' : 'text-emerald-400';


  const handleItemClick = () => {
    setOpenAccrd(!openEditAccrd);

    setEditedTransactionCategory(transaction.category);
    setEditedTransactionAmount(transaction.amount);
    setEditedTransactionCurrency(transaction.currency);
    setEditedTransactionDate(transaction.date);
  }

  const handleDeleteItem  = (transaction) => {
    deleteTransaction(transaction)
  }

  const handleCancelItem = () => {
    setOpenAccrd(!openEditAccrd);
  }

  return (
    <div>
      <div
        className={`flex flex-row justify-between items-center hover:bg-gray-100 px-4 ${transactionColor}`}
        onClick={handleItemClick} 
      >
        <div className='flex flex-row items-center'>
          <TransactionIcon/>
          <p className='mx-4'>{transaction.category}</p>
        </div>
        <p className={`font-bold py-4 text-md ${transactionColor}`}>{transactionAmount}</p>
      </div>

      {openEditAccrd && (
        <div className='bg-white w-full px-4 py-4 rounded-md shadow-sm space-x-4'>
        <div className='flex flex-row justify-between gap-x-4'>
          <div className="w-1/4">
            <label htmlFor="category" className="font-medium text-sm text-gray-400 ">Category</label>
            <select
              name="category"
              id="category"
              className="border rounded-md px-3 py-2 w-full"
              value={editedTransactionCategory}
              onChange={(e) => setEditedTransactionCategory(e.target.value)}
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
              value={editedTransactionDate}
              onChange={(e) => setEditedTransactionDate(e.target.value)}
            />
          </div>
  
          <div className="w-1/4">
            <label htmlFor="amount" className="font-medium text-sm text-gray-400 ">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="border rounded-md px-3 py-2 w-full"
              value={editedTransactionAmount}
              onChange={(e) => setEditedTransactionAmount(e.target.value)}
            />
          </div>
  
          <div className="w-1/4">
            <label htmlFor="currency" className="font-medium text-sm text-gray-400 ">Currency</label>
            <select
              name="currency"
              id="currency"
              className="border rounded-md px-3 py-2 w-full"
              value={editedTransactionCurrency}
              onChange={(e) => setEditedTransactionCurrency(e.target.value)}
            >
              {/* <option value="EUR">EUR</option>
              <option value="USD">USD</option> */}
              <option value="ALL">ALL</option>
            </select>
          </div>
        </div>
        <div className='text-end mt-2 gap-2 flex justify-end'>
          <button
            className='hover:bg-emerald-600 rounded-md bg-emerald-500 px-2 h-10 text-slate-50 font-medium text-lg self-center'
            onClick={() => handleSaveItem(transaction)}
          >
            Save
          </button>
          <button
            className='hover:bg-red-600 rounded-md bg-red-500 px-2 h-10 text-slate-50 font-medium text-lg self-center'
            onClick={() => handleDeleteItem(transaction)}
          >
           Delete
          </button>
          <button
            className='hover:bg-gray-400 rounded-md bg-gray-400 px-2 h-10 text-slate-50 font-medium text-lg self-center'
            onClick={handleCancelItem}
          >
            Cancel
          </button>
        </div>
      </div>
      )}
    </div>
  );
}

export default TransactionListItem;
