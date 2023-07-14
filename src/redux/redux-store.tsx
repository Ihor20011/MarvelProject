import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import  thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import { compose } from "redux";
import React, { Component, ComponentType, useState } from "react";
import { connect } from "react-redux";
import { SliderReducer } from "./slider-reducer";
import { marvelHeaderReducer } from "./marvelHeader-reducer";
import { caracterReducer } from "./marvelCaractersReducer";

let reducers=combineReducers({
    form:formReducer,
    slider:SliderReducer,
    headerMarvel:marvelHeaderReducer,
    caracters:caracterReducer,
});
type rootReducer= typeof reducers;
export type AppstateType = ReturnType<rootReducer> ///даная фернкия помогает затраьб тип который возвращает main reducer


type PropertiesType<T>=T extends {[key:string]:infer R}?R:never;


export type ActionsTypeInfern<T extends{[key:string]:(...arg:any)=>any}>=ReturnType<PropertiesType<T>>;


export type BaseThunkType< A extends Action>=ThunkAction<Promise<void>,AppstateType,unknown,A> 

//@ts-ignore

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store= createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)))
// let store=createStore(reducers,applyMiddleware(thunkMiddleware));
//@ts-ignore
window.store=store
export default store
/////



