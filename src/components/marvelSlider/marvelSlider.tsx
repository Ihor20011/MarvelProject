import React, { useEffect, useState } from "react";
import s from './slider.module.css'
import { useDispatch, useSelector } from "react-redux";
import { AppstateType } from "../../redux/redux-store";

export const MarvelSlider=()=>{
const photoBlockarr=useSelector((state:AppstateType)=>state.slider.photo);
const arrayOfdes=useSelector((state:AppstateType)=>state.slider.description);
let [desSlide,changeDes]=useState(1);
let [slide,changeSlide]=useState(0);
const dispatch=useDispatch();

const nextSlide=()=>{
    if (slide<2){
        changeSlide((prev)=>prev+1)
        changeDes((prev)=>prev+1)
    }
}
const prevSlide=()=>{
    if (slide !=0){
        changeSlide((prev)=>prev-1)
        changeDes((prev)=>prev-1)
    }
}
const sliderFunck=()=>{
    changeSlide(slide+1)
}
//   useEffect(()=>{
//     setInterval(()=>{
//         if (slide<2){
//             changeSlide(slide+1);
//             changeDes(desSlide+1)
//         } 
//         else if(slide>=2){
//          changeSlide(slide-2)
//          changeDes(desSlide-2)
//         }
//         },4000)
//     },[slide])

    return(
        <div className={s.main}>
            <div className={s.block}><img className={s.photo} src={photoBlockarr[slide]}/>
            </div>
            <div className={s.desblock}>
                    {arrayOfdes.map((d,index)=>{
                        return <div key={index}  className={desSlide===d.id?s.description:s.deselement}>{d.name}</div>
                    })}
            </div>
            <div className={s.btn}>
                <div>
            <button onClick={prevSlide}> <img className={s.nextone} src="https://cdn.pixabay.com/photo/2020/03/22/15/19/arrow-4957487_960_720.png" alt="" /></button>
                </div>
                <div>
            <button onClick={nextSlide}><img  className={s.next} src="https://cdn.pixabay.com/photo/2020/03/22/15/19/arrow-4957484_960_720.png" alt="" /></button>
                </div>
            </div>
        </div>
    )
}