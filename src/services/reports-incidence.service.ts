import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class ReportsIncidenceService {
  crimesList : Array<any> = []
  savedLocations : Array<any> = []
  userIncidents : Array<any> = []
  tempArray : Array<any> = []
  currentDate
  monthNum
  monthArray
  month
  date
  year
  constructor() { }

  fetchCrimeCategories(){
    return firebase.database().ref().child('CrimeTypes').once('value').then(result =>{
        let string =  (JSON.stringify(result));
        let answer = JSON.parse(string)
        for(let key in answer){this.crimesList.push(key)}
        this.crimesList.push('Other')
        return this.crimesList
      }).catch(error =>{
        console.log(error);
        return error
      })
    }
    
  fetchUserIncidents(){
    return new Promise((resolve, reject) => {
     firebase.database().ref().child('Incident').on('child_added', result=>{
       let locations = result.val()
       console.log(locations);
       this.clearArray(this.tempArray)
       for(let key in locations){
         this.tempArray.push({
           object : Object.values(locations[key]),
           key: key
         })
       }
       console.log(this.tempArray);
      for(let i = 0; i < this.tempArray.length; i++){
       this.userIncidents.push({
         crimeType: this.tempArray[i].object[1],
         lat: this.tempArray[i].object[2],
         lng: this.tempArray[i].object[0]
       })
     }
       resolve(this.userIncidents)
       console.log(this.userIncidents);
     })
    })
}

fetchSavedLocations(){
  return new Promise((resolve, reject) => {
    firebase.database().ref().child('HighRisk').on('child_added', result=>{
      //this.clearArray(this.savedLocations)
      // //console.log(result.val());
      // let locations = JSON.parse(JSON.stringify(result))
      // console.log(locations);
      let locations = result.val()
      console.log(locations);
      this.clearArray(this.tempArray)
      for(let key in locations){
        this.tempArray.push({
          place : Object.values(locations[key]),
          key : key
        })
        //console.log(this.tempArray);
      }
      for(let i = 0; i < this.tempArray.length; i++){
        console.log(this.tempArray[i]);
        this.savedLocations.push({
          crimeType: this.tempArray[i].place[0],
          lat: this.tempArray[i].place[1],
          lng: this.tempArray[i].place[2],
          key: this.tempArray[i].key,
          //  status: 'highRisk'
        })
      }
       console.log(this.tempArray);
       console.log(this.savedLocations);
       resolve(this.savedLocations)
      })
      console.log(this.savedLocations);
     })
}
clearArray(array){
  for(let i=0; i < array.length; i++){array.splice(i)}
}
}
