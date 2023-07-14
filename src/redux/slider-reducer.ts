import React from "react";
import { ActionsTypeInfern } from "./redux-store";

const NEXT_SLIDE="NEXT_SLIDE";
const PREV_SLIDE='PREV_SLIDE';


let initialState={
    photo:['https://assets-prd.ignimgs.com/2022/09/21/collage-maker-20-sep-2022-11-29-pm-1-1663730990588.jpg',
    'https://assets1.ignimgs.com/2020/03/16/ign-top25-spiderman-blogroll-1584381584593_160w.jpg?width=1280','https://img4.goodfon.ru/wallpaper/nbig/0/9f/chiornaia-pantera-black-panther-marvel-supergeroi-komiks-chi.jpg'] as Array<string>,
    curentSlide:0 as number,
    description:[  { name:'ironMen', id:1},{ name:'SpiderMan',id:2},{name:'Black-Panter',id:3}] as Array<any>
}
type initialStateType=typeof initialState

 export const SliderReducer=(state=initialState,actions:Actions):initialStateType=>{
 switch(actions.type){
    case NEXT_SLIDE:{
        return{...state,
        curentSlide:state.curentSlide+1
        }
    }
    case PREV_SLIDE:{
        return{...state,
        curentSlide:state.curentSlide-1
        }
    }
     default:
    return state
}
}
type  Actions=ActionsTypeInfern<typeof actionsMar>
export const actionsMar={
    nextSlide:()=>{
        return{
            type:NEXT_SLIDE
        } as const
    },
    prevSlide:()=>{
        return{
            type:PREV_SLIDE
        }as const
    }
}