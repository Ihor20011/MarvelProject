import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { AppstateType } from "../../redux/redux-store";
import s from './marvelHeader.module.css'
import { setCarThunkCreator } from "../../redux/marvelHeader-reducer";
import { AnyAction } from "redux";
 export const MarvelHeader=()=>{
   const dispatch=useDispatch();
     useEffect(()=>{
       dispatch(setCarThunkCreator() as unknown as AnyAction)
     },[])

     const arracaracters=useSelector((state:AppstateType)=>state.headerMarvel.caracters)

     const [caracterShow,changeCaracter]=useState(false)
     const [comics,changecomis]=useState(false) 
     
     const [series,changeseries]=useState(false)
     const [events,changeevents]=useState(false)
     const [stories,changestories]=useState(false)
    //  const navigate = useNavigate();
    return(
      <div>
        <div className={s.mainBlock}>
          <div  onMouseEnter={()=>{changeCaracter(false);changecomis(false)}} className={s.logoBlock}>
            <div className={s.login}>loginName</div>
             <NavLink to={'/'}><img className={s.photo}  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png"/></NavLink>  
            <div className={s.shop}>marvelShop</div>
          </div>
          <div className={s.navigateblock}>
            <div onMouseEnter={()=>{changeCaracter(true); changecomis(false) }}><NavLink to={'/caracters'}>Caracters</NavLink></div>
            <div onMouseEnter={()=>{changecomis(true);changeCaracter(false);}} ><NavLink to={'/Comics'} >Comics</NavLink></div>
            <div><NavLink to={'/Series'} >Series</NavLink></div>
            <div><NavLink to={'/Events'} >Events</NavLink></div>
            <div><NavLink to={'/Stories'} >Stories</NavLink> </div>
          </div>
        </div>
        <div className={s.infoBlock}>
          {caracterShow&&
          <div className={s.main} onMouseLeave={()=>{changeCaracter(false)}}>
          <span>TREDING IN THE UNIVERSE</span> 
          <div className={s.cracter}>
           {arracaracters.map((car,index)=>{ 
            return <NavLink to={`caracters/?id=${car.id}`} ><div key={index}  className={s.namecar}><img   className={s.superfoto} src={car.thumbnail.path +'.jpg'}/>{car.name}</div></NavLink> 
           })} 
          </div> 
        </div>}
       </div>
       <div className={s.infoBlock}>
          {comics&&
        <div className={s.cracter} onMouseLeave={()=>{changecomis(false)}}>comics</div>}
       </div>
      </div>
    )
}


