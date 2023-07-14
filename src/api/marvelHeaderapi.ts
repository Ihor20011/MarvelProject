import React from "react";
import axios from "axios";
type caracter={
    name:string,
    id:number,
    description:string
    thumbnail:{
        path:string,
        extension:string
    }
}
type dataType={
count:number,
limit:number,
offset:number,
results:Array<caracter>
total:number
}
type setCaractersType={
    data:dataType
}
const mainCaracterUrl='http://gateway.marvel.com/v1/public/characters?&ts=1&apikey=4c421384e81b21ad7ae13363af016cee&hash=108a8ae1b74cc3fe8fcd96ddf6ddec9e'
const url='http://gateway.marvel.com/v1/public/characters?limit=5&ts=1&apikey=4c421384e81b21ad7ae13363af016cee&hash=108a8ae1b74cc3fe8fcd96ddf6ddec9e'
const urlTest='http://gateway.marvel.com/v1/public/characters?limit=100&ts=1&apikey=4c421384e81b21ad7ae13363af016cee&hash=108a8ae1b74cc3fe8fcd96ddf6ddec9e'

  export  const MarvelGetCaracters={
    setCarakte(){
         return  axios.get<setCaractersType>(url).then((responce)=>{
            console.log(responce.data.data.results)
            return  responce.data.data.results
        })
    },

    setCaracterMain(){
        return axios.get<setCaractersType>(urlTest).then((response)=>{
            return response.data.data
        })
    },
    SetNewCaracter(id:number){
    return axios.get<setCaractersType>(`http://gateway.marvel.com/v1/public/characters/${id}?&ts=1&apikey=4c421384e81b21ad7ae13363af016cee&hash=108a8ae1b74cc3fe8fcd96ddf6ddec9e`).then((responce)=>{
        return responce.data.data.results[0]
    })
    },
    FindCaracters(name:string){
        if (!name){
            return axios.get<setCaractersType>(urlTest).then((response)=>{
                return response.data.data
            }) 
        }
        return axios.get<setCaractersType>(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=1&apikey=4c421384e81b21ad7ae13363af016cee&hash=108a8ae1b74cc3fe8fcd96ddf6ddec9e`).then((responce)=>{
            return responce.data.data
        })
    }

 }
