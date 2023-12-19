import { useEffect, useState } from "react";
import { app } from "firebaseApp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getAuth,onAuthStateChanged} from 'firebase/auth';

import Router from "./components/Router";
import Loader from "components/Loader";


function App() {
  const auth = getAuth(app);
  //auth를 체크하기 전에는 loader를 띄어주는 용도
  const [init,setInit] = useState<boolean>(false);

  //auth의 current user가 있으면 autehnticated로 바뀌는것.
  const [isAuthenticated,setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  },[auth]);
  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated = {isAuthenticated} /> : <Loader />}
    </>

  );
  

}

export default App;