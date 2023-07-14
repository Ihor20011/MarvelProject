import React, { useEffect, useState } from "react";
import { InjectedFormProps, reduxForm ,Field} from "redux-form";
import { TextAreaDialogs } from "../common/preloader/formcontrol/formControl";
import s from './marvelCaracters.module.css'
import { SetCAractersThunkCreator } from "../../redux/marvelCaractersReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppstateType } from "../../redux/redux-store";
import { AnyAction } from "redux";
import { SetNewCaracter } from "../../redux/marvelCaractersReducer";
import { SetCAractersName } from "../../redux/marvelCaractersReducer";
import { Close } from "../../redux/marvelCaractersReducer";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
 //I need to put 18 caracters on The one Page/
 export  const Caracters=()=>{
    const cracter=useSelector((state:AppstateType)=>state.caracters.caracter);
    const arrayCaracters=useSelector((state:AppstateType)=>state.caracters.caracters);
    const pageSize=useSelector((state:AppstateType)=>state.caracters.pageSize);
    const [curePage,changeCurePage]=useState(1);
    const leftCaraElem=(curePage-1) * pageSize+1;
    const rightCarElem=curePage * pageSize;
    
    const Navigate=useNavigate()
    const location=useLocation()
    const [params]=useSearchParams(location.search)
    const mainObj=Object.fromEntries(params)   

    let curentId 
    useEffect(()=>{
    curentId=+mainObj.id
    setNewCaracter(curentId)
    },[+mainObj.id])

    const setNewCaracter=(id:number)=>{
        dispatch(SetNewCaracter(id) as unknown as AnyAction )
    } 
    const  close=()=>{
        dispatch(Close() as unknown as AnyAction)
    }
    const find=(values:formType)=>{
        dispatch(SetCAractersName(values.serch) as unknown as AnyAction)
    }
    const dispatch=useDispatch();
    useEffect(()=>{
     dispatch(SetCAractersThunkCreator() as unknown as AnyAction)
    },[])

    const clickOntheCaracter=(id:number)=>{
        Navigate({search:`id=${id}`})
    }
    const returnall=()=>{
        dispatch(SetCAractersThunkCreator() as unknown as AnyAction)
    }
    if (cracter){
        return (
            <div>
                <Caracter cracter={cracter} close={close} navigate={Navigate} />
            </div>
        )
    }
    return (
        <div className={s.global}> 
        <div className={s.logoBlock}>
            <div>MARVEL CARACTERS</div>
        </div>
        <div>
            <ReduxForm onSubmit={find}/>
        </div>
        
        <button onClick={returnall}>return all</button> 
            <div className={s.mainBlock}>
                { 
                arrayCaracters
                .filter((elem,index)=>{
                    if (index>=leftCaraElem&& index<=rightCarElem){
                        return true
                    }
                })
                .map((c,index)=>{
                    return <div key={index}> 
                            <img  src={c.thumbnail.path+'.jpg'}/>
                               <p onClick={()=>{clickOntheCaracter(c.id)}}>{c.name}</p>
                           </div>
                })
                }  
                </div>  
                 <div className={s.blockPg}>
                 <Paginator curePage={curePage} changePage={(curePage)=>{changeCurePage(curePage)}}/> 
                </div> 
        </div>
    )
}

type formType={
    serch:string
}

const SearchForm:React.FC<InjectedFormProps<formType>>=(props)=>{
 return(
    <form onSubmit={props.handleSubmit}>
     <Field placeholder="seacrh"  component={TextAreaDialogs} name={'serch'} validate={[]} />
     <button>find</button>
    </form>
 )
}
const ReduxForm=reduxForm<formType>({
    form:'Caracter-form'
})(SearchForm)


type propsType={
    cracter:any,
    close:()=>void,
    navigate:(obj:any)=>void
}


const Caracter:React.FC<propsType>=({cracter,close,navigate})=>{
    return(
    <div>
           <div className={s.caracterPhoto}>
              <div className={s.jpg}><img className={s.marvelPhoto} src={cracter.thumbnail.path+'.jpg'} /></div>
              <div className={s.carName}>{cracter.name}</div>
           </div>
           <div className={s.description}>
            <div className={s.logodes}>DESCRIPTION</div>
            <div className={s.text}>{cracter.description}</div>
           </div>
           <div onClick={close} className={s.closeBtn}>Close</div>
            </div>
    )
}
type PropsType={
    changePage:(curePage:number)=>void,
    curePage:number
}
const Paginator:React.FC<PropsType>=(props)=>{
    const curentPage=useSelector((state:AppstateType)=>state.caracters.curentPage);
    const pageSize=useSelector((state:AppstateType)=>state.caracters.pageSize);
    const totalCount=useSelector((state:AppstateType)=>state.caracters.totalCount);

    const [currentPortion,changeCurrentPortion]=useState(1);
    const [portionSize,chang]=useState(10);
    
    let pageAmount=Math.ceil(totalCount/pageSize);
    let pages:Array<number>=[];
    for (let i=0;i<pageAmount;i++){
        pages.push(i)
    }
    let totalPortion=pageAmount/portionSize;
    let leftPortionElement=(currentPortion-1) * portionSize + 1;
    let rightPortinElement= currentPortion * portionSize;
    return(
        <div className={s.paginator}>
          {currentPortion>1&&
          <button className={s.sliderBtn} onClick={()=>{changeCurrentPortion(currentPortion-1)}}>prev</button>
          }
          {
            pages
            .filter((p)=>{
                if (p>=leftPortionElement&&p<=rightPortinElement){
                    return true
                }
            })
            .map((p,index)=>{
                return <div key={index} className={props.curePage===p?s.red:s.divCar} onClick={()=>{props.changePage(p)}}>{p}</div>
            })
          }
          {
            totalPortion > currentPortion&&
            <button className={s.sliderBtn} onClick={()=>{changeCurrentPortion(currentPortion+1)}}>Next</button>
          }
        </div>
    )
}

