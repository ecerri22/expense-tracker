import { useContext } from 'react';
import TransactionsContext from '../context/transactions';

function Route({path, children}) {
  const {currentPath} = useContext(TransactionsContext);

  if(currentPath === path) {
    return children;
  }

  return null;
}

export default Route;