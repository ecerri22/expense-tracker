import { useContext } from 'react';
import { useFetchTransactionsQuery } from '../store';
import TransactionListItem from './TransactionListItem';
import TransactionsContext from '../context/transactions';

function TransactionsListInDay() {
  const {currentUser} = useContext(TransactionsContext);
  const {data, error, isLoading} = useFetchTransactionsQuery(currentUser);

  let content;
  if (isLoading) {
    content = <p>Loading data...</p>
  } else if (error || data === undefined) {
    content = <p>Error getting data...</p>
  } else {
    const reversedData = [...data].reverse();

    content = reversedData.map((transaction) => {
      return <TransactionListItem
        key={transaction.id}
        transaction={transaction}
      />
    });
  }

  return (
    <div>
        <div className='flex flex-col p-4 w-full '>
          <p className="font-medium text-md item-end">Transaction History</p>

          <div className="flex flex-col h-80 overflow-y-auto">
            {content}
          </div>
        </div>
    </div>
  );
}

export default TransactionsListInDay;
