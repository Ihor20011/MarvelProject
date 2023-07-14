import React from 'react';
import { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MarvelHeader } from './components/marvelHeader/marvelHeader';
import { MarvelSlider } from './components/marvelSlider/marvelSlider';
import { Caracters } from './components/marvelCaractersPage/marvelCaracters';
class AppC extends React.Component {
  render(){
    return(
      <BrowserRouter>
       <div className='app-wrapper'>
         <MarvelHeader/>  
        <div className='app-wrapper-content'>
          <Suspense fallback={<div>loading</div>}>
        <Routes>
           <Route path='/' element={<MarvelSlider/>}/>
          <Route path='/caracters/:id?' element={<Caracters/>}/> 
        </Routes>
          </Suspense>
        </div>
      </div>
      </BrowserRouter>
    )
  }
}    
export default AppC ;








