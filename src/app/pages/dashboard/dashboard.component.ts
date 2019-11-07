import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { AnalyticsService } from 'src/services/analytics.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  userReportedArray = []
  locationReportArray = []
  numberOfDiffCrimes = []
  reason = '';
  array = []
  numUserIncidents
  numPlaceIncidents = []
  currentYearReports = []
  monthlyReport = [
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

  
  constructor(public analyticsService : AnalyticsService) {
    this.fetchUserReports()
    this.fetchCrimes()
    console.log(this.monthlyReport);
    
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

    var gradientChartOptionsConfigurationWithTooltipRed: any = {
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
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
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

    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
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
            suggestedMax: 125,
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
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };


    var gradientBarChartConfiguration: any = {
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
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
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

    this.canvas = document.getElementById("chartLineRed");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    var data = {
      labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
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
        data: [80, 100, 70, 80, 120, 80],
      }]
    };

    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipRed
    });


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
      options: gradientChartOptionsConfigurationWithTooltipGreen

    });



    var chart_labels = ['tembisa  ', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    this.datasets = [
      [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
      [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
      [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
    ];
    this.data = this.datasets[2];



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
      options: gradientChartOptionsConfigurationWithTooltipRed
    };
    this.myChartData = new Chart(this.ctx, config);


    this.canvas = document.getElementById("CountryChart");
    this.ctx  = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


    var myChart = new Chart(this.ctx, {
      type: 'bar',
      responsive: true,
      legend: {
        display: false
      },
      data: {
        labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
        datasets: [{
          label: "Countries",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [53, 20, 10, 80, 100, 45],
        }]
      },
      options: gradientBarChartConfiguration
    });

  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
  fetchCrimes(){
    this.analyticsService.fetchCrimeCategories().then(result=> {
      console.log(result);
      
    })
  }
  fetchUserReports(){
    let addNewLocation
    this.analyticsService.getUserReports().then(data => {
      console.log(data);
      let userReports = data

      for(let place in userReports){
        console.log(place);
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

        //iterating checking for matching months
        for(let monthIndex = 0; monthIndex < this.monthlyReport.length; monthIndex++){
          if(this.monthlyReport[monthIndex].month === this.userReportedArray[i].month){
            console.log('yippie',this.monthlyReport[monthIndex].month);
            this.monthlyReport[monthIndex].numberOfReports = this.monthlyReport[monthIndex].numberOfReports + 1
          }
        }
        
          if(this.locationReportArray.length === 0){
            this.locationReportArray.push({
              location: this.userReportedArray[i].place,
              numberOfReports: 1
            })
          }else{
            for(let locationIndex = 0; locationIndex < this.locationReportArray.length; locationIndex++){
              if(this.locationReportArray[locationIndex].location === this.userReportedArray[i].place){
                this.locationReportArray[locationIndex].numberOfReports = this.locationReportArray[locationIndex].numberOfReports + 1
              }else{
                addNewLocation = true
              }
          }
          // if(this.monthlyReport[locationIndex].month === this.userReportedArray[i].month){
          //   console.log('yippie',this.monthlyReport[locationIndex].month);
          //   this.monthlyReport[locationIndex].numberOfReports = this.monthlyReport[locationIndex].numberOfReports + 1
          //   }
          
          }
          if(addNewLocation === true){
            this.locationReportArray.push({
              location: this.userReportedArray[i].place,
              numberOfReports: 1
            })
          }
      }
     
      console.log(this.userReportedArray);
      console.log(this.monthlyReport);
      console.log(this.locationReportArray);
      
    })
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
