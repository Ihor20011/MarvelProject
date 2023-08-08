import React from "react";
import { ActionsTypeInfern } from "./redux-store";
import { BaseThunkType } from "./redux-store";
import { MarvelGetCaracters } from "../api/marvelHeaderapi";
import { stat } from "fs";
const SET_CARACTER='SET_CARACTER';
const SET_ID='SET_ID';
const CLOSE='CLOSE';
const CHANGE="CHANGE";
const CHANGEGRAY='CHANGEGRAY';
const NEW_GAME='NEW_GAME';

type caracterType={
    id:number,
    name:string,
    description:string,
    thumbnail:{
        path:string,
        extension:string,
    },

}
const initiAlState={
    caracters:[ ] as Array<caracterType>,
    curentPage:1 as number,
    pageSize:18 as number,
    totalCount:0 as number,
    caracter:null as caracterType|null,
}
type initiAlStateType=typeof initiAlState
type ActionsType=ActionsTypeInfern<typeof actions>
type thunkType=BaseThunkType<ActionsType>

 export const caracterReducer=(state=initiAlState,action:ActionsType):initiAlStateType=>{
    switch(action.type){
       case SET_CARACTER:{
        return{...state,
            caracters:[...action.caracterArra],
            totalCount:action.total
        }
       }
       case SET_ID:{
        return{...state,
        caracter:action.caracter
        }
       }
       case CLOSE:{
        return{...state,
        caracter:null
        }
       }
        default:
            return state
    }
}
const actions={
    setCaracter:(array:Array<caracterType>,total:number)=>{
        return{type:SET_CARACTER,caracterArra:array,total:total} as const
    },
    showCaracter:(caracter:caracterType)=>{
        return{type:SET_ID,caracter:caracter} as const
    },
    close:()=>{
        return{type:CLOSE} as const 
    },
    changeColor:(id:number)=>{
        return{type:CHANGE,id:id} as const 
    },
    changeColorGray:(id:number)=>{
        return{type:CHANGEGRAY,idnumber:id} as const 
    },
    newGame:()=>{
    return{type:NEW_GAME} as const
    }
}
export const NewGame=():thunkType=>{
    return async(dispatch)=>{
        dispatch(actions.newGame())
    }
}
export const Change=(id:number):thunkType=>{
    return async(dispatch)=>{
      dispatch(actions.changeColor(id))
    }
}
export const ChangeGray=(id:number):thunkType=>{
    return async(dispatch)=>{
      dispatch(actions.changeColorGray(id))
    }
}



export const Close=():thunkType=>{
    return async(dispatch)=>{
      dispatch(actions.close())
    }
}
 export const SetCAractersThunkCreator=():thunkType=>{
    return async(dispatch)=>{
    let array=await MarvelGetCaracters.setCaracterMain()
    dispatch(actions.setCaracter(array.results,array.total))
    }
}


export const SetCAractersName=(name:string):thunkType=>{
    return async(dispatch)=>{
    let array=await MarvelGetCaracters.FindCaracters(name)
    dispatch(actions.setCaracter(array.results,array.total))
    }
}
export const SetNewCaracter=(id:number):thunkType=>{
    return async(dispatch)=>{
        let newCaracter= await MarvelGetCaracters.SetNewCaracter(id)
        dispatch(actions.showCaracter(newCaracter));
    }
}

