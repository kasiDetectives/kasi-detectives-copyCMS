import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  getUserReports(){
    return firebase.database().ref().child('Incident').once('value').then((snapshot) => {
      console.log(snapshot.val());
      let values = snapshot.val()
      return values
    })
    
  }
}
