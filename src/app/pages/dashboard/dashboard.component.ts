import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { AnalyticsService } from 'src/services/analytics.service';
import { ReportsIncidenceService } from 'src/services/reports-incidence.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets = [];
  public data: any;
  public myChartData;
  public myChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public month_dataset = []
  userReportedArray = []
  numberOfReportsPerLocation = []
  numberOfDiffCrimes = []
  places = []
  reason = '';
  array = []
  numUserIncidents
  numPlaceIncidents = []
  currentYearReports = []
  monthlyReport = []
  gradientChartOptionsConfigurationWithTooltipRed = {}
  gradientChartOptionsConfigurationWithTooltipGreen = {}
  gradientBarChartConfiguration = {}
  users = []
  constructor(public analyticsService : AnalyticsService, public incidentsService : ReportsIncidenceService) {
    
    this.fetchCrimes()
    this.fetchUserReports()
    
    // this.incidentsService.fetchSavedLocations().then(result => {
    //   console.log(result);
      
    // })
    console.log(this.monthlyReport);
   this.getUsers()
  }

  ngOnInit() {
    var gradientChartOptionsConfigurationWithTooltipBlue: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#fd9c00',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#2380f7"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#2380f7"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipPurple: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    this.gradientChartOptionsConfigurationWithTooltipRed = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            // suggestedMin: 10,
            // suggestedMax: 10,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
        
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",  
            minimum: 5,
            maximum: 10,
          },
          ticks: {
            padding: 10,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipOrange: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 110,
            padding: 20,
            fontColor: "#ff8a76"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(220,53,69,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ff8a76"
          }
        }]
      }
    };

    this.gradientChartOptionsConfigurationWithTooltipGreen = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: false,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            // suggestedMin: 50,
            // suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
            minimum: 5,
            maximum: 10,
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };


    this.gradientBarChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
            minimum: 5,
            maximum: 20,
          },
          ticks: {
            // suggestedMin: 60,
            // suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    // this.canvas = document.getElementById("chartLineRed");
    // this.ctx = this.canvas.getContext("2d");

    // var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    // gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    // gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    // gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors
    // var month_labels = []
    // // var month_dataset = []
    // console.log(this.monthlyReport);
    
    // for(let mi = 0; mi < this.monthlyReport.length; mi++){
    //   month_labels.push(this.monthlyReport[mi].month)
    //   this.month_dataset.push(this.monthlyReport[mi].numberOfReports)
    //   console.log(this.monthlyReport[mi].numberOfReports);
      
    // }
    // console.log(this.month_dataset);
    
    // var data = {
    //   labels: month_labels,
    //   datasets: [{
    //     label: "Data",
    //     fill: true,
    //     backgroundColor: gradientStroke,
    //     borderColor: '#ec250d',
    //     borderWidth: 2,
    //     borderDash: [],
    //     borderDashOffset: 0.0,
    //     pointBackgroundColor: '#ec250d',
    //     pointBorderColor: 'rgba(255,255,255,0)',
    //     pointHoverBackgroundColor: '#ec250d',
    //     pointBorderWidth: 20,
    //     pointHoverRadius: 4,
    //     pointHoverBorderWidth: 15,
    //     pointRadius: 4,
    //     data: this.month_dataset,
    //   }]
    // };
    // console.log(data.labels);
    
    // var myChart = new Chart(this.ctx, {
    //   type: 'line',
    //   data: data,
    //   options: gradientChartOptionsConfigurationWithTooltipRed
    // });


    this.canvas = document.getElementById("chartLineGreen");
    this.ctx = this.canvas.getContext("2d");


    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

    var datas = {
      labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
      datasets: [{
        label: "My First dataset",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#fd9c00',
        borderqaWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#fd9c00',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#fd9c00',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [90, 27, 60, 12, 80],
      }]
    };

    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: datas,
      options: this.gradientChartOptionsConfigurationWithTooltipGreen

    });

    

    ///new chart

    

  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
  fetchCrimes(){
    this.analyticsService.fetchCrimeCategories().then(result=> {
      console.log(result);
      let crimes = result
      for(let key in crimes){
        this.numberOfDiffCrimes.push({
          typeOfCrime : key,
          numberOfReports: 0
        })
      }
      console.log(this.numberOfDiffCrimes);
      
    })
  }
  getUsers(){
    this.analyticsService.getUsers().then(result => {
      console.log(result);
      let data = result
      
      for(let uid in data){
        this.users.push(Object(data[uid]))
      }
      console.log(this.users);
      
    })
  }
  fetchUserReports(){
    let addNewLocation
    this.monthlyReport = [
      {month: 'January', numberOfReports: 0},
      {month: 'February', numberOfReports: 0},
      {month: 'March', numberOfReports: 0},
      {month: 'April', numberOfReports: 0},
      {month: 'May', numberOfReports: 0},
      {month: 'June', numberOfReports: 0},
      {month: 'July', numberOfReports: 0},
      {month: 'August', numberOfReports: 0},
      {month: 'September', numberOfReports: 0},
      {month: 'October', numberOfReports: 0},
      {month: 'November', numberOfReports: 0},
      {month: 'December', numberOfReports: 0}
    ]
    this.analyticsService.getUserReports().then(data => {
      console.log(data);
      let userReports = data

      for(let place in userReports){
        console.log(place);
        let number = Object.values(userReports[place]).length
        console.log(number);
        
        this.numberOfReportsPerLocation.push({
          place: place,
          numberOfReports: number
        })
        for(let key in userReports[place]){
          console.log(key);
          this.userReportedArray.push({
            place: place,
            description: userReports[place][key]['description'],
            month: userReports[place][key]['month'],
            year: userReports[place][key]['year']
          })
        }
      }

      for(let i = 0; i < this.userReportedArray.length; i++){
        //iterating through crimes
        for(let ci = 0; ci < this.numberOfDiffCrimes.length; ci++){
          if(this.numberOfDiffCrimes[ci].typeOfCrime === this.userReportedArray[i].description){
            this.numberOfDiffCrimes[ci].numberOfReports = this.numberOfDiffCrimes[ci].numberOfReports + 1
          }
        }
        //iterating checking for matching months
        
        for(let monthIndex = 0; monthIndex < this.monthlyReport.length; monthIndex++){
          if(this.monthlyReport[monthIndex].month === this.userReportedArray[i].month){
            console.log('yippie',this.monthlyReport[monthIndex].month);
            this.monthlyReport[monthIndex].numberOfReports = this.monthlyReport[monthIndex].numberOfReports + 1
          }
        }
      }
      console.log(this.numberOfReportsPerLocation);
      
      // for(let li = 0; li < this.numberOfReportsPerLocation.length; li ++){
      //   //chart_labels.push(this.numberOfReportsPerLocation[0].place)
      //   this.datasets.push(this.numberOfReportsPerLocation[li].numberOfReports)
      //  }
     
      console.log(this.userReportedArray);
      console.log(this.monthlyReport);
      console.log(this.numberOfReportsPerLocation);
      console.log(this.numberOfDiffCrimes);
      
      this.loadMonthlyReportGraph()
      this.loadLocationReportGraph()
      this.loadCrimeTypeGraph()
    })
  }
  loadCrimeTypeGraph(){
    this.canvas = document.getElementById("CountryChart");
    this.ctx  = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors
    let crime_labels = []
    let crime_data = []
    console.log(this.numberOfDiffCrimes);
    
    for(let cgi = 0; cgi < this.numberOfDiffCrimes.length; cgi++){
      console.log(this.numberOfDiffCrimes[cgi].typeOfCrime);
      
      crime_labels.push(this.numberOfDiffCrimes[cgi].typeOfCrime)
      crime_data.push(this.numberOfDiffCrimes[cgi].numberOfReports)
    }
    console.log(crime_labels);
    console.log(crime_data);
    
    var myChart = new Chart(this.ctx, {
      type: 'bar',
      responsive: true,
      legend: {
        display: false
      },
      data: {
        labels: crime_labels,
        datasets: [{
          label: "Countries",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: crime_data,
        }]
      },
      options: this.gradientBarChartConfiguration
    });
  }

  loadLocationReportGraph(){
    //new chart
    var chart_labels = []
   // var chart_labels = ['tembisa  ', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
   for(let li = 0; li < this.numberOfReportsPerLocation.length; li ++){
    chart_labels.push(this.numberOfReportsPerLocation[li].place)
    this.datasets.push(this.numberOfReportsPerLocation[li].numberOfReports)
   }
    //var chart_labels = this.numberOfReportsPerLocation[0];
    // this.datasets = [
    //   [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
    //   [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
    //   [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
    // ];
    this.data = this.datasets;
   console.log(this.data);
   console.log(this.datasets);
   
   


    this.canvas = document.getElementById("chartBig1");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.data,
        }]
      },
      options: this.gradientChartOptionsConfigurationWithTooltipRed
    };
    this.myChartData = new Chart(this.ctx, config);
  }
  loadMonthlyReportGraph(){
    //monthly reports graph
    this.canvas = document.getElementById("chartLineRed");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors
    var month_labels = []
    // var month_dataset = []
    console.log(this.monthlyReport);
    
    for(let mi = 0; mi < this.monthlyReport.length; mi++){
      month_labels.push(this.monthlyReport[mi].month)
      this.month_dataset.push(this.monthlyReport[mi].numberOfReports)
      console.log(this.monthlyReport[mi].numberOfReports);
      
    }
    console.log(this.month_dataset);
    
    var data = {
      labels: month_labels,
      datasets: [{
        label: "Data",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#ec250d',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#ec250d',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#ec250d',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: this.month_dataset,
      }]
    };
    console.log(data.labels);
    
    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: data,
      options: this.gradientChartOptionsConfigurationWithTooltipRed
    });


    //location report graph
    
  }
  

  // fetchUserReports(){
  //   this.analyticsService.getUserReports().then(data => {
  //     console.log(data);
  //     let userReports = data
  //     let number = 0
  //     let addnew = true
  //     for(let key in userReports){
  //       console.log(key);
  //       console.log(Object.values(userReports[key]));
  //       let info: Array<any> = Object.values(userReports[key])
  //       console.log(info);
        
  //       for(let i=0; i<info.length; i++){
          
  //         console.log(info[i]);
  //         this.array.push({
  //           place: key,
  //           details: info[i]
  //         })
  //       }
  //       this.numPlaceIncidents.push({
  //         place: key,
  //         numberOfReports: info.length
  //       })
  //     }
  //     // let number = 0
  //     console.log(this.array);
  //     for(let x = 0; x < this.array.length; x++){
  //       console.log('rererererererererre');
  //       if(this.currentYearReports.length = 0){
  //         console.log('aading');
          
  //         this.currentYearReports.push({
  //           year: this.array[x].details.year,
  //           numberOfReports: number
  //         })
  //       }
        
  //       for(let y = 0; y < this.currentYearReports.length; y++){
  //         if(this.array[x].details.year !== this.currentYearReports[y].year){
            
  //           addnew = true
  //           console.log(addnew);
            
  //         }
  //         if(this.array[x].details.year === this.currentYearReports[y].year){
            
  //           addnew = false
  //           console.log(addnew);
  //         }
  //       }
  //       for(let y = 0; y < this.currentYearReports.length; y++){
  //         if(addnew === true){
  //           this.currentYearReports.push({
  //             year: this.array[x].details.year,
  //             numberOfReports: number
  //           })
  //         } else {
  //           this.currentYearReports[y].numberOfReports = (number + 1)
  //         }
  //       }

        
        
        
  //     }

      
  //     console.log(this.array);
  //     console.log(this.numPlaceIncidents);
      
  //     this.numUserIncidents = this.array.length
  //       console.log(this.numUserIncidents + ' reported user incidents')
  //       console.log();
  //       console.log(this.currentYearReports);
        
        
        
      
  //   })


  // }
}
