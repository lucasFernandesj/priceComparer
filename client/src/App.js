import React from 'react'
import './App.css';
import SearchInput from './components/SearchInput';
import ResRami from './components/ResRami';
import ResHazi from './components/ResHazi';
import ResYbitan from './components/ResYbitan';
import CartComponent from './components/CartComponent';
import ResComponent from './components/ResComponent';

import {BrowserRouter,Routes,Route} from  'react-router-dom'




class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
     return (

    //   <div>
    //     <SearchInput/>

    // <div className='resContainer'>
    //   <ResRami/>
    //   <ResHazi/>
    //   <ResYbitan/>
    // </div>

    //   </div>

    <BrowserRouter>
      <Routes>
      <Route path='/' element={<ResComponent/>} />
      <Route path='/cart' element={<CartComponent/>} />

      </Routes>
    
    </BrowserRouter>

  );
  }
 
}

export default App;
