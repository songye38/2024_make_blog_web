import { useEffect, useState } from "react";
import { app } from "firebaseApp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getAuth,onAuthStateChanged} from 'firebase/auth';

import Router from "./components/Router";


function App() {
  const auth = getAuth(app);
  console.log(auth);

  const [isAuthenticated,setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false);
      }
    })
    
  })
  return (
    <>
      <ToastContainer />
      <Router isAuthenticated = {isAuthenticated} />
    </>

  );
  

}

export default App;