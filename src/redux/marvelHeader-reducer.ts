import axios from "axios";
import React from "react";
import { MarvelGetCaracters } from "../api/marvelHeaderapi";
import { ActionsTypeInfern } from "./redux-store";
import { BaseThunkType } from "./redux-store";
const SetCaracters="SetCaracters";
type caracter={
    name:string,
    id:number,
    description:string
    thumbnail:{
        path:string,
        extension:string
    }
}
let initialState={
    caracters:[] as Array<caracter>
}
type initialStateType=typeof initialState
 export const marvelHeaderReducer=(state=initialState,action:ActionsType):initialStateType=>{
    switch (action.type){
    case SetCaracters:{
        return{...state,
        caracters:[...action.caracters]
        }
    }
        default:
        return state
    }
}
type ActionsType=ActionsTypeInfern<typeof actionsMArvelHeader>
 export const actionsMArvelHeader={
    setCaracter:(allcaracters:any)=>{
        return{
            type:SetCaracters,
            caracters:allcaracters
        } as const
    },

}

type thunkType=BaseThunkType<ActionsType>
export  const setCarThunkCreator=():thunkType=>{
return async(disspatch)=>{
 let arrayCaracters= await MarvelGetCaracters.setCarakte()
 disspatch(actionsMArvelHeader.setCaracter(arrayCaracters))
}
}


