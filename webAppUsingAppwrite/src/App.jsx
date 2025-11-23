import { useEffect, useState } from 'react'
import './App.css'

import { useDispatch } from 'react-redux';
import {Footer, Header} from './components';
// import { store } from './store/store';
import auth from './appwrite/auth';
import authService from './appwrite/auth';
import database from './appwrite/database';
import DBservice from './appwrite/database';
import {login, logout} from './store/authSlice';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        // User is logged in, you can dispatch an action to update the state
        dispatch(login(userData));
      }else{
        dispatch(logout());
      }
    }).finally(() => {
      setLoading(false);
    });
  }, []);

 return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className='w-full block'>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet/>
          </main>
        <Footer />
      </div>
    </div>
 ) : null;
}

export default App
