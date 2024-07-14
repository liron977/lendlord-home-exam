import React, { useState, useEffect } from 'react'

import axios from 'axios';
import './App.css';
import Header from './components/header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enGB } from 'date-fns/locale';
import NewUserDialog from './components/newUserDialog';
import UsersTable from './components/usersTable';


function App() {
  const [users, setUsers] = useState([]);

  const [shown, setShown] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  const toggleModal = () => setShown(prev => !prev)

  const refreshCallback = () => {
    if (shown) {
      toggleModal();
    }
    getUsers();
  }

  const getUsers = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/all`)
      setUsers(result.data);
  }

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <Header />
      <div id="content">
      <UsersTable users={users} refreshCallback={refreshCallback} />
      <button onClick={toggleModal}>Add User</button>
      <NewUserDialog shown={shown} toggleModal={toggleModal} refreshCallback={refreshCallback}/>
      </div>
      </LocalizationProvider>
    </div>
  );
}

export default App;
