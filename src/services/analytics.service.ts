import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  crimesList
  constructor() { }

  fetchCrimeCategories(){
    return firebase.database().ref().child('CrimeTypes').once('value').then(result =>{
        let crimeTypes  = result.val()
        console.log(crimeTypes);
        
        
        return crimeTypes
      }).catch(error =>{
        console.log(error);
        return error
      })
    }
  getUserReports(){
    return firebase.database().ref().child('Incident').once('value').then((snapshot) => {
      console.log(snapshot.val());
      let values = snapshot.val()
      return values
    })
    
  }
}
