import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

var ctx = document.getElementById('myChartModulair').getContext('2d');

const firebaseConfig = {
    apiKey: "AIzaSyCNNgqnimWqcB1-L9PCDP0-JsfzIbBF5Hc",
    authDomain: "calidair-d27b9.firebaseapp.com",
    databaseURL: "https://calidair-d27b9-default-rtdb.firebaseio.com",
    projectId: "calidair-d27b9",
    storageBucket: "calidair-d27b9.appspot.com",
    messagingSenderId: "1098783857210",
    appId: "1:1098783857210:web:69150e2ac5166013def303",
    measurementId: "G-TH610EFHC3"
  };



// Initialize Firebase
initializeApp(firebaseConfig);
const database = ref(getDatabase());
const dbRef = getDatabase();
let link='CalidAir/CalidAirPM4DBD9E7CDCD2/Data'
//const dbRef = getDatabase(app);
//const database = ref(getDatabase(app))

const selectModulair = document.querySelector('.select-measures')


const pm10 = document.getElementById('pm10');
const pm25 = document.getElementById('pm25');
const pm1 = document.getElementById('pm1');
const date = document.getElementById('date');
const hour = document.getElementById('hour');

//Consulta API FireBase
const url = 'https://calidair-d27b9-default-rtdb.firebaseio.com/CalidAir/CalidAirPM4DBD9E7CDCD2/Data.json?orderBy=%22id%22&limitToLast=60&print=pretty';
fetch(url)
.then(res => res.json())
.then(data => {   

    tabla(data);

})
.catch(error => console.error(error));
function tabla(data){
    let dates_s =[];
    let pm1_s = [];
    let pm25_s = [];
    let pm10_s = [];
    let rh_s = [];
    let temp_s = [];
    let day_s = [];
    let hour_s = [];
    for (var key in data) {
        dates_s.push(data[key].date);
        day_s.push(data[key].date.split(" ")[0]);
        hour_s.push(data[key].date.split(" ")[1]);
        pm1_s.push(data[key].pm1.toFixed(2));
        pm25_s.push(data[key].pm25.toFixed(2));
        pm10_s.push(data[key].pm10.toFixed(2));
        rh_s.push(data[key].hum.toFixed(2));
        temp_s.push(data[key].temp.toFixed(2));
     }
     
     //Espacios para última medición
     date.innerHTML = `${day_s[day_s.length-1]}, `
     hour.innerHTML = `${hour_s[hour_s.length-1]}`
     pm1.innerHTML = `${pm1_s[pm1_s.length-1]} µg/m<sup>3</sup>`
     pm25.innerHTML = `${pm25_s[pm25_s.length-1]} µg/m<sup>3</sup>`
     pm10.innerHTML = `${pm10_s[pm10_s.length-1]} µg/m<sup>3</sup>`
     //Gráfica de tendencias
     var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: [],
        datasets: [{
            label: `Escoja una opción`,
            data: [],
            backgroundColor: '',
            borderColor: '',
            fill: false,
            pointStyle: 'circle',
            pointRadius: 3,
            pointHoverRadius: 15,
            tension: 0.4
            
        }]},
        options: {
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 15,
                        font: {size: 30},
                        
                        color: '#000'

                    }
                },
                tooltips: {
                    enabled: true,
                    backgroundColor: 'red'
                }
            },
            elements: {
                line: {
                    borderWidth: 1
                },
                point: {
                    radius: 3,
                    
                }
            },
            maintainAspectRatio: false,
            scales: {
                y: {
                    
                    grid:{display:true},
                    display: true,
                    beginAtZero: false,
                    ticks: {
                        color: '#000'
                    }
    
                },
                x: {
                   
                    title:{
                        display: true,
                        text: 'Hora'
    
                    },
                    
                    display: true,
                    grid: {display: true},
                    ticks: {
                        color: '#000',
                        autoSkip: true,
                        maxTicksLimit: 8,
                        
                    }
                }
            },
            layout: {
                padding: {
                    bottom: 40
                }
            },
            responsive: true
        }
    });

    myChart.update()
    selectModulair.addEventListener('change', updateSelect)
    function updateSelect() {
        
        const measureModulair = selectModulair.value
        
        switch(measureModulair) {
            case "0":
                myChart.data.labels = dates_s
                myChart.data.datasets[0].data = pm25_s
                myChart.data.datasets[0].borderColor="#19C895"
                myChart.data.datasets[0].backgroundColor="#289B1F"
                myChart.data.datasets[0].label = `PM2.5 µg/m\u00B3`
                myChart.update()
                break;

                
            case "1": 
                myChart.data.labels = dates_s
                myChart.data.datasets[0].data = pm1_s
                myChart.data.datasets[0].borderColor="#EAAA00"
                myChart.data.datasets[0].backgroundColor="#C18D02"
                myChart.data.datasets[0].label = `PM1 µg/m\u00B3`
                myChart.update()
                break;
               
            case "2": 

                myChart.data.labels = dates_s
                myChart.data.datasets[0].data = pm10_s
                myChart.data.datasets[0].borderColor="#56083E"
                myChart.data.datasets[0].backgroundColor="#C72C97"
                myChart.data.datasets[0].label = `PM10 µg/m\u00B3`
                myChart.update()
                break;

            case "3": 
                myChart.data.labels = dates_s
                myChart.data.datasets[0].data = temp_s
                myChart.data.datasets[0].borderColor="#EE0000"
                myChart.data.datasets[0].backgroundColor="#8C0000"
                myChart.data.datasets[0].label = `Temperatura externa °C` 
                myChart.update()
                break;
            case "4": 
                myChart.data.labels = dates_s
                myChart.data.datasets[0].data = rh_s
                myChart.data.datasets[0].borderColor="#234783"
                myChart.data.datasets[0].backgroundColor="#13284B"
                myChart.data.datasets[0].label = `Humedad Rel. externa (%)`
                myChart.update()
                break;
        }
    }
}

const formExport = document.getElementById('formExport')
const date1 = document.getElementById('date1')

formExport.addEventListener('submit', e => {
    e.preventDefault()
    get(child(database, link))
        .then(snapshot => {
            let dateFormat1 = date1.value.split('-').reverse().join('/')
        let dateFiltered
        let dateFlag
        dateFormat1.split('/')[0] === '01' ? dateFlag = false : dateFlag = true

        if(dateFlag) {
            const formatDay = parseInt(dateFormat1.split('/')[0])
            if(formatDay < 10) {
                dateFiltered = `0${formatDay - 1}/${dateFormat1.split('/')[1]}/${dateFormat1.split('/')[2]}`
            }else {
                dateFiltered = `${formatDay - 1}/${dateFormat1.split('/')[1]}/${dateFormat1.split('/')[2]}`
            }
        }else dateFiltered = dateFormat1

            
            const dato = snapshot.val()
            let structure = []
            let indice = 0
            let indiceFiltered = 0
            let fecha_parcial='18/05/2022'
            
            for (let key in dato) {
               
                if(dato[key].date.split(" ")[0] == dateFiltered.toString()) {
                    indiceFiltered = indice
                }
                structure.push(dato[key])
                indice++
            }

            if(indiceFiltered != 0) {
                let datas = structure.map((el, i) => {
                    let obj = {}
                    if(i === indiceFiltered) {
                        indiceFiltered++
                        obj = el
                    }
                    return obj
                })
                dataToExport(datas)
            }else {
               alert('Fecha fuera de rango')
            }
            indiceFiltered = 0 
        })
})

const dataToExport = async (obj) => {
    await obj
    let datas = obj.filter((el) => el.date ? el : null)
    datas != null ? downloadExcel(datas) : alert('Ocurrió un error')
}

const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = {
        Sheets: {
            'data': worksheet
        },
        SheetNames: ['data']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    saveAsExcel(excelBuffer, 'Mediciones-CalidAir2')
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetmt.sheet;charset=UTF-8'
const EXCEL_EXTENSION = '.xlsx'

const saveAsExcel = (buffer, fileName) => {
    const data = new Blob([buffer], { type: EXCEL_TYPE })
    saveAs(data, fileName + EXCEL_EXTENSION)
}
/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

var ctx = document.getElementById('myChartModulair').getContext('2d');

const firebaseConfig = {
    apiKey: "AIzaSyCNNgqnimWqcB1-L9PCDP0-JsfzIbBF5Hc",
    authDomain: "calidair-d27b9.firebaseapp.com",
    databaseURL: "https://calidair-d27b9-default-rtdb.firebaseio.com",
    projectId: "calidair-d27b9",
    storageBucket: "calidair-d27b9.appspot.com",
    messagingSenderId: "1098783857210",
    appId: "1:1098783857210:web:69150e2ac5166013def303",
    measurementId: "G-TH610EFHC3"
  };



// Initialize Firebase
initializeApp(firebaseConfig);
//const dbRef = getDatabase(app);
//const database = ref(getDatabase(app))

const selectModulair = document.querySelector('.select-measures')


const pm10 = document.getElementById('pm10');
const pm25 = document.getElementById('pm25');
const pm1 = document.getElementById('pm1');
const date = document.getElementById('date');
const hour = document.getElementById('hour');
const title = document.getElementById('sensor-title');
let dateHour;



let nuboair = []

const database = ref(getDatabase());
const dbRef = getDatabase();
let link='CalidAir/CalidAirPM4DBD9E7CDCD2/Data'



const commentsRef = ref(dbRef, link)
onChildAdded(commentsRef, (data) => {
    nuboair = data.val()
    //temp.innerHTML = `${nuboair.temperature} °C`
    //rh.innerHTML = `${nuboair.hum} %`
    pm10.innerHTML = `${nuboair.pm10.toFixed(2)} µg/m<sup>3</sup>`
    pm25.innerHTML = `${nuboair.pm25.toFixed(2)} µg/m<sup>3</sup>`
    pm1.innerHTML = `${nuboair.pm1.toFixed(2)} µg/m<sup>3</sup>`
    dateHour=nuboair.date
    date.innerHTML = `${dateHour.split(" ")[0]},`
    hour.innerHTML = `${dateHour.split(" ")[1]}`
  

    //atmP.innerHTML = `${nuboair.pressure} hPa`

    //airQ.innerHTML = nuboair.airQuality

}, {
    onlyOn: true
})
const allDates = []
const allHours = []
const datesFormat =[]

const allTemperatures = []
const allRh = []
const allPm1 = []
const allPm10 = []
const allPm25 = []

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: [],
    datasets: [{
        label: `Escoja una opción`,
        data: [],
        backgroundColor: '',
        borderColor: '',
        fill: false,
        pointStyle: 'circle',
        pointRadius: 3,
        pointHoverRadius: 15,
        tension: 0.4
        
    }]},
    options: {
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 15,
                    font: {size: 30},
                    color: '#000'
                }
            },
            tooltips: {
                enabled: true,
                backgroundColor: 'red'
            }
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 3,
                
            }
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                
                grid:{display:true},
                display: true,
                beginAtZero: false,
                ticks: {
                    color: '#000'
                }

            },
            x: {
                title:{
                    display: true,
                    text: 'Hora'

                },
                
                display: true,
                grid: {display: true},
                ticks: {
                    color: '#000'
                }
            }
        },
        layout: {
            padding: {
                bottom: 40
            }
        },
        responsive: true
    }
});

let datesReduced = []

const reference = ref(dbRef, link)
onValue(reference, (snap) => {
    const data = snap.val()
    for (const key in data) {
        allDates.push(data[key].date)
        allTemperatures.push(data[key].temp)
        allRh.push(data[key].hum)
        allPm1.push(data[key].pm1)
        allPm10.push(data[key].pm10)
        allPm25.push(data[key].pm25)
    }
    allDates.map(el => {
        const splited = el.split(' ')
        const f = `${splited[0]}`
        const h = `${splited[1]}`
        allHours.push(h)
        datesFormat.push(f)
    })
    const hour = allHours.reverse().filter((el, i) => i < 20).reverse()
    const temperature = allTemperatures.reverse().filter((el, i) => i < 20).reverse()
    const rh = allRh.reverse().filter((el, i) => i < 20).reverse()
    const pm10 = allPm10.reverse().filter((el, i) => i < 20).reverse()
    const pm25 = allPm25.reverse().filter((el, i) => i < 20).reverse()
    const pm1 = allPm1.reverse().filter((el, i) => i < 20).reverse()
    datesReduced = datesFormat.reverse().filter((el, i) => i < 20).reverse()
    const dates = myDates(datesReduced) 



    myChart.update()
    selectModulair.addEventListener('change', updateSelect)
    function updateSelect() {
        const measureModulair = selectModulair.value
        switch(measureModulair) {
            case "0":
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm25
                myChart.data.datasets[0].borderColor="#19C895"
                myChart.data.datasets[0].backgroundColor="#289B1F"
                myChart.data.datasets[0].label = `PM2.5 µg/m\u00B3`
                myChart.update()
                break;

                
            case "1": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm1
                myChart.data.datasets[0].borderColor="#EAAA00"
                myChart.data.datasets[0].backgroundColor="#C18D02"
                myChart.data.datasets[0].label = `PM1 µg/m\u00B3`
                myChart.update()
                break;
               
            case "2": 

                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm10
                myChart.data.datasets[0].borderColor="#56083E"
                myChart.data.datasets[0].backgroundColor="#C72C97"
                myChart.data.datasets[0].label = `PM10 µg/m\u00B3`
                myChart.update()
                break;

            case "3": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = temperature
                myChart.data.datasets[0].borderColor="#EE0000"
                myChart.data.datasets[0].backgroundColor="#8C0000"
                myChart.data.datasets[0].label = `Temperatura externa °C` 
                myChart.update()
                break;
            case "4": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = rh
                myChart.data.datasets[0].borderColor="#234783"
                myChart.data.datasets[0].backgroundColor="#13284B"
                myChart.data.datasets[0].label = `Humedad Rel. externa (%)`
                myChart.update()
                break;
        }
    }
})





let myDates = (dates) => {
    const datesReduced = dates.reduce((acc, el) => {
        if(!acc[el]) acc[el] = el
        return acc
    }, {})
    const datesFiltered = []
    for(let date in datesReduced){
        datesFiltered.push(datesReduced[date])
    }
    return datesFiltered.join(', ')
}

const formExport = document.getElementById('formExport')
const date1 = document.getElementById('date1')

formExport.addEventListener('submit', e => {
    e.preventDefault()
    get(child(database, link))
        .then(snapshot => {
            let dateFormat1 = date1.value.split('-').reverse().join('/')
        let dateFiltered
        let dateFlag
        dateFormat1.split('/')[0] === '01' ? dateFlag = false : dateFlag = true

        if(dateFlag) {
            const formatDay = parseInt(dateFormat1.split('/')[0])
            if(formatDay < 10) {
                dateFiltered = `0${formatDay - 1}/${dateFormat1.split('/')[1]}/${dateFormat1.split('/')[2]}`
            }else {
                dateFiltered = `${formatDay - 1}/${dateFormat1.split('/')[1]}/${dateFormat1.split('/')[2]}`
            }
        }else dateFiltered = dateFormat1

            
            const dato = snapshot.val()
            let structure = []
            let indice = 0
            let indiceFiltered = 0
            let fecha_parcial='18/05/2022'
            
            for (let key in dato) {
               
                if(dato[key].date.split(" ")[0] == dateFiltered.toString()) {
                    indiceFiltered = indice
                }
                structure.push(dato[key])
                indice++
            }

            if(indiceFiltered != 0) {
                let datas = structure.map((el, i) => {
                    let obj = {}
                    if(i === indiceFiltered) {
                        indiceFiltered++
                        obj = el
                    }
                    return obj
                })
                dataToExport(datas)
            }else {
               alert('Fecha fuera de rango')
            }
            indiceFiltered = 0 
        })
})

const dataToExport = async (obj) => {
    await obj
    let datas = obj.filter((el) => el.date ? el : null)
    datas != null ? downloadExcel(datas) : alert('Ocurrió un error')
}

const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = {
        Sheets: {
            'data': worksheet
        },
        SheetNames: ['data']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    saveAsExcel(excelBuffer, 'Mediciones-CalidAir2')
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetmt.sheet;charset=UTF-8'
const EXCEL_EXTENSION = '.xlsx'

const saveAsExcel = (buffer, fileName) => {
    const data = new Blob([buffer], { type: EXCEL_TYPE })
    saveAs(data, fileName + EXCEL_EXTENSION)
}*/