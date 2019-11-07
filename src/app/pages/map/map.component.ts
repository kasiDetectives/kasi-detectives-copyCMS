import { Component, OnInit, NgZone } from "@angular/core";
import { ReportsIncidenceService } from 'src/services/reports-incidence.service';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {
  highRiskLocations = {}
  reportedLocations = {}

  selectedMode
  lat
  lng
  hide = true
  start
  end 
  destinations
  dangerPlek
  infoWindow
  map
  myDest

  Lats = [] 
  Long = []

  keyboardShow = false
  MarkersArray = []
  //////////////////////////////////////////////
  address:string;
  DBLocation=[]
  scheduled=[];
  mySelected
  pic = '\assets\icon\magnifying-glass (10).png'
  //user : Array<any> = []
  user = {}
  userId
  result = []
  loc =[]
  email = null
  lats
  long
  message
  selectImage
  mapz : any;
  markers : any;
  autocomplete: any;
  autocompletez: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  autocompleteItemz: any;

  dangerImage
  
  backButton

  directionsService
  array = []

  showDirection = false
  showMe = true

  constructor(public reportIncidenceService : ReportsIncidenceService,public zone: NgZone) {
   
   ///// it shows inside constructor

  // this.reportIncidenceService.fetchSavedLocations().then(data =>{
  // console.log(data, "datatata"); 
  // this.highRiskLocations = data
  // console.log(this.highRiskLocations, "luk-Here");
  // })

  //this.loadLocations()
  //this.UseMarked()
  }


  

  handleLocationError(browserHasGeolocation, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }

  ngOnInit(){
    this.myMaps();
  }


  myMaps(){
    var infoWindowMarker;
    var selectedMarker
    var  infoWindow
    ///danger image
    this.dangerImage = {
      url: 'assets/danger (2).png', // This marker is 20 pixels wide by 32 pixels high.
      //  url: 'assets/icon/pin-black-silhouette-in-diagonal-position-pointing-down-right (8).png',
      size: new google.maps.Size(32, 32), // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0), // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new google.maps.Point(0, 40)
    };
    this.selectImage = {
      url: 'assets/icon/pin-black-silhouette-in-diagonal-position-pointing-down-right (2).png', // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(32, 32), // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0), // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new google.maps.Point(0, 40)
    };
    ///my location image
    var myLocationimage = {
      url: 'assets/placeholder.png', // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(32, 32), // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0), // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new google.maps.Point(0, 40)
    };



    console.log('initialising map');
    ///// set it to zero for sea
    var center = new google.maps.LatLng(0, 0);
    var myOptions = {
      zoom: 18,
     // disableDefaultUI: true,
     zoomControl: true,
     zoomControlOptions: {
         position: google.maps.ControlPosition.RIGHT_CENTER
     },
     scaleControl: true,
     streetViewControl: false,
     streetViewControlOptions: {
         position: google.maps.ControlPosition.BOTTOM_CENTER
     },
      fullscreenControl: false,
      // fullscreenControlOptions: {
      //   position: google.maps.ControlPosition.RIGHT_CENTER
      // },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      // mapTypeControlOptions: {
      //   style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      //   position: google.maps.ControlPosition.LEFT_BOTTOM
      // },
      center: center
    }
    var map = new google.maps.Map(document.getElementById('map'), myOptions);

    infoWindow = new google.maps.InfoWindow;
    infoWindowMarker= new google.maps.InfoWindow;
    // /// map click listener start
    map.addListener('dblclick',(event) => {
      //     //delete marker
     // this.deleteMarkers()
      //  //delete marker end
      //this.addMarker(event.latLng);
      var markers = new google.maps.Marker({
        position: event.latLng,
        map: map,
        // icon: selectImage,
        draggable: true
      });
      markers.push(markers);
      selectedMarker = markers
      console.log(selectedMarker,"first selected marker")
      console.log(event.latLng,"location of new marker")
      ////// listener on marker start
      // Report incident
      markers.addListener('click', (event) => {
        
        
       // this.reportIncident(event, markers)
      });
      //// listener on marker end
    });
    // Get the location of you
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        
        var pos=[]
        pos.push({
          location: new google.maps.LatLng(latitude, longitude)
        });

        this.array.push(pos[0])
        this.Lats = this.array[0].location.lat();
        this.Long = this.array[0].location.lng();

        var locations = {lat: this.Lats, lng: this.Long}
        this.start = locations
        
        console.log(locations, "wereAreHere");
        
        let marker = new google.maps.Marker({
          position: pos[0].location,
          zoom: 17,
          map: map,
          //animation: GoogleMapsAnimation.BOUNCE,
         // icon: myLocationimage, //icon: selectImage
        });
        this.markers.push(marker);
        map.setCenter(pos[0].location);
        this.geocoder.geocode({'location': new google.maps.LatLng(position.coords.latitude, position.coords.longitude)}, (results, status) => {
          console.log(results);
          if(status === "OK") {
          //let address= results[0].address_components[1].long_name + ',' + results[0].address_components[2].long_name + ',' + results[0].address_components[3].long_name
            let addressArray = {
              street: results[0].address_components[1].long_name,
              section: results[0].address_components[2].long_name,
              surburb: results[0].address_components[3].long_name
            }

           infoWindow.setContent(addressArray['street'])
           infoWindow.setPosition(pos[0].location);
           infoWindow.open(map)
          }
        })

        infoWindow.open(map);
        map.setCenter(pos[0].location);
        this.array.push(pos[0])
        this.Lats = this.array[0].location.lat();
        this.Long = this.array[0].location.lng();

 /////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// calling all Dangermarkers
return new Promise((resolve, reject) => {
  this.loadLocations().then(data => { 

    console.log(data, "qqqq");
    
    
    for( let x = 0; x < data.length; x++ ){
      this.DBLocation.push({
        crimeType: data[x].crimeType,
        location:new google.maps.LatLng(data[x].lat,data[x].lng)
      })

      console.log(this.DBLocation,"xxx");
      infoWindow = new google.maps.InfoWindow;
      /////marking them
      this.markers = new google.maps.Marker({
        map: map,
        draggable: false,
        position: new google.maps.LatLng(data[x].lat, data[x].lng),
       // icon: this.dangerImage,
      });
    }
  })
})

////////////////////////////// end here

      }, () => {
        this.handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, map.getCenter());
    }
  }



    //////  getting different places
    updateSearchResults(){
      console.log(this.autocomplete.input);
      if(this.autocomplete.input === '') {
        this.autocompleteItems = [];
        return;
      }
      this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
    }

      /////////////  places
  SearchPlaces(){
    if(this.myDest === '') {
      this.autocompleteItemz = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.myDest },
    (predictions, status) => {
      this.autocompleteItemz = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItemz.push(prediction);
        });
      });
    });
  }

  ///////// Use Location

  UseMarked(){
    //  return new Promise((resolve, reject) => {
    //   this.loadLocations().then(data => { 
        
    //     for( let x = 0; x < data.length; x++ ){
    //       this.DBLocation.push({
    //         crimeType: data[x].crimeType,
    //         location:new google.maps.LatLng(data[x].lat,data[x].lng)
    //       })

    //       console.log(this.DBLocation,"xxx");
    //       this.infoWindow = new google.maps.InfoWindow;
    //       /////marking them
    //       this.markers = new google.maps.Marker({
    //         map: this.map,
    //         draggable: false,
    //         position: new google.maps.LatLng(data[x].lat, data[x].lng),
    //        // icon: this.dangerImage,
    //       });
    //     }
    //   })
    // })
  }


  ///// test outside construc
  async loadLocations(){
    console.log("loadingLocations");
    let result :any
    await  this.reportIncidenceService.fetchSavedLocations().then(data =>{
      result = data
      this.highRiskLocations = data
      console.log(this.highRiskLocations);
      console.log(result.length);
    })
    console.log(result, "XXX");
    return  result 
  }

  async loadUserIncidents(){
    let result :any
    await this.reportIncidenceService.fetchUserIncidents().then(data => {
      result = data
      this.reportedLocations = data
      console.log(result.length);
    })
    console.log(result);
    return  result
  }
}
