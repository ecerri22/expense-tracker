import { useContext } from 'react';
import { useFetchTransactionsQuery } from '../store';
import TransactionsListInDay from '../components/TransactionsListInDay';
import AddTransactionModal from '../components/AddTransactionModal';
import TransactionsContext from '../context/transactions';

function Transactions() {
    const {currentUser} = useContext(TransactionsContext)
    const {data} = useFetchTransactionsQuery(currentUser);
    // console.log(currentUser);

    const expenseCategories = ['Food & Drink', 'Shopping', 'Transport', 'Home', 'Travel', 'Healthcare', 'Education'];
    const incomeCategories = ['Salary', 'Loan', 'Extra Income', 'Gift'];

    const currentWalletBalance = () => {
        if (!data) return null;

        return data.reduce((accumulator, transaction) => {        
            if (expenseCategories.includes(transaction.category)) {
                return accumulator - parseFloat(transaction.amount);
            } else {
                return accumulator + parseFloat(transaction.amount);
            } 
        }, 0);
    }
    
    const calculateTotalIncome = () => {
        if (!data) return null;
    
        return data.reduce((total, transaction) => {
            if (incomeCategories.includes(transaction.category)) {
                return total + parseFloat(transaction.amount);
            }

            return total;
        }, 0);
    };
    
    const calculateTotalExpenses = () => {
        if (!data) return null;

        return data.reduce((total, transaction) => {
            if (expenseCategories.includes(transaction.category)) {
                return total + parseFloat(transaction.amount);
            }

            return total;
        }, 0);
    };


    return (
        <div className='flex flex-col h-screen w-4/5 m-auto py-2 '>
            <div className='flex bg-inherit px-4 py-2 gap-x-4 items-center'>
                <AddTransactionModal/>
            </div>

            <div className='flex bg-inherit px-4 py-2 gap-x-4'>
                <div className='flex flex-col p-4 w-1/4 bg-white rounded-md shadow-sm flex-1'>
                    <p className='font-medium'>Current Wallet Balance</p>
                    <p className={`text-2xl ${currentWalletBalance() > 0 ? 'text-emerald-500' : 'text-gray-500'} tracking-wide`}>
                        {currentWalletBalance() > 0 
                        ? "+" + currentWalletBalance()
                        : currentWalletBalance()} ALL
                    </p>
                </div>
                <div className='flex flex-col p-4 w-1/4 bg-white rounded-md shadow-sm	flex-1'>
                    <p className='font-medium'>Total Period Expenses</p>
                    <p className={`text-2xl text-red-500 tracking-wide`}>
                        {calculateTotalExpenses() > 0 
                        ? "-" + calculateTotalExpenses() 
                        : calculateTotalIncome()} ALL
                    </p>
                </div>
                <div className='flex flex-col p-4 w-1/4 bg-white rounded-md shadow-sm	flex-1'>
                    <p className='font-medium'>Total Period Income</p>
                    <p className={`text-2xl text-emerald-500 tracking-wide`}>
                        {calculateTotalExpenses() > 0 
                        ? "+" + calculateTotalIncome() 
                        : calculateTotalIncome()} ALL
                    </p>
                </div>
                
            </div>

            <div className='flex bg-inherit px-4 py-2 gap-x-4'>
                <div className='flex flex-col p-4 w-1/2 bg-white rounded-md shadow-sm	'>
                    <p className='font-medium'>OTHER DATA</p> 
                </div>

                <div className='flex flex-col p-4 w-1/2 bg-white rounded-md shadow-sm'>
                    <TransactionsListInDay />
                </div>
            </div>
        </div>
    );
      
}
    
export default Transactions;
