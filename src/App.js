import { useContext } from 'react'
import UserDashboard from './pages/UserDashboard'
import TransactionsContext from './context/transactions';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Route from './components/Route';

function App() {
  const {login} = useContext(TransactionsContext)

  return (
    <div className='container is-fluid'>
      {!login && (
        <Route
        path="/">
          <Signup/>
        </Route>
      )}
      {!login && (
        <Route
        path="/log-in">
          <Login/>
        </Route>
      )}
      {login && (
        <div>
          <Route path="/homepage">
            <UserDashboard/>
          </Route>
        </div>
      )}
    </div>
  )
}

export default App;