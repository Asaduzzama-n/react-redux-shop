import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import {  onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from './redux/hook';
import { setUser, setUserLoading } from './redux/feature/user/userSlice';
import { auth } from './lib/firebase';
import { useEffect } from 'react';

function App() {

const dispatch = useAppDispatch();

useEffect(()=>{
  dispatch(setUserLoading(true))
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user.email!))
      dispatch(setUserLoading(false))

    } else {
      dispatch(setUserLoading(false))
    }
  });
},[])



  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
