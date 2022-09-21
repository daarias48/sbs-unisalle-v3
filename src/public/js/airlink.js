import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAP4ipIhAWYl8PEuMcnsbBAMhlaq_F5L40",
    authDomain: "aire-ciudadano.firebaseapp.com",
    databaseURL: "https://aire-ciudadano-default-rtdb.firebaseio.com",
    projectId: "aire-ciudadano",
    storageBucket: "aire-ciudadano.appspot.com",
    messagingSenderId: "109955859655",
    appId: "1:109955859655:web:17471d237468c5ce476ae2",
    measurementId: "G-CRLNK0PD2L"
  };
  
  // Initialize Firebase
  initializeApp(firebaseConfig);
  const database = ref(getDatabase());


// Variables FrontEnd
var ctx = document.getElementById('myChartModulair').getContext('2d');
const selectModulair = document.querySelector('.select-measures')
const temp = document.getElementById('temp');
const rh = document.getElementById('rh');
const pm1_1 = document.getElementById('pm1');
const pm10_1 = document.getElementById('pm10');
const pm25_1 = document.getElementById('pm25');
const date = document.getElementById('date');
const hour = document.getElementById('hour');
const deviceName = document.getElementById('deviceName');
const comunication = document.getElementById('comunication');
const maker = document.getElementById('maker');
const device = document.getElementById('device');

//Consulta API FireBase
const url = 'https://aire-ciudadano-default-rtdb.firebaseio.com/sensors/airlink.json?orderBy=%22id%22&limitToLast=60&print=pretty';
fetch(url)
.then(res => res.json())
.then(data => {   

    tabla(data);

})
.catch(error => console.error(error));
function tabla(data){
    let dates_s =[];
    let hours_s = [];
    let pm1_s = [];
    let pm25_s = [];
    let pm10_s = [];
    let rh_s = [];
    let temp_s = [];
    let device_s = [];
    let maker_s = [];
    let deviceName_s = []
    let comunication_s = []
    let auxiliar;
    let graphDates = []
    for (var key in data) {
        dates_s.push(data[key].date);
        hours_s.push(data[key].hour);
        pm1_s.push(data[key].pm_1);
        pm25_s.push(data[key].pm_25);
        pm10_s.push(data[key].pm_10);
        rh_s.push(data[key].rh);
        temp_s.push(data[key].temp);
        device_s.push(data[key].device);
        maker_s.push(data[key].marker);
        deviceName_s.push(data[key].model);
        comunication_s.push(data[key].comunication);
        auxiliar = data[key].date + " " +data[key].hour
        graphDates.push(auxiliar);  
     }
     console.log(graphDates)
     //Espacios para última medición
     date.innerHTML = `${dates_s[dates_s.length-1]}, `
     hour.innerHTML = hours_s[hours_s.length-1]
     pm1_1.innerHTML = `${pm1_s[pm1_s.length-1]} µg/m<sup>3</sup>`
     pm25_1.innerHTML = `${pm25_s[pm25_s.length-1]} µg/m<sup>3</sup>`
     pm10_1.innerHTML = `${pm10_s[pm10_s.length-1]} µg/m<sup>3</sup>`
     rh.innerHTML = `${rh_s[rh_s.length-1]} %`
     temp.innerHTML = `${temp_s[temp_s.length-1]} °C`
     device.innerHTML = device_s[device_s.length-1]
     deviceName.innerHTML = deviceName_s[deviceName_s.length-1]
     comunication.innerHTML = comunication_s[comunication_s.length-1]
     maker.innerHTML = maker_s[maker_s.length-1]
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
            case "3":
                myChart.data.labels = graphDates
                myChart.data.datasets[0].data = temp_s
                myChart.data.datasets[0].borderColor="#EE0000"
                myChart.data.datasets[0].backgroundColor="#8C0000"
                myChart.data.datasets[0].label = `Temperatura interna °C` 
                myChart.update()
                break;
            case "4": 
                myChart.data.labels = graphDates
                myChart.data.datasets[0].data = rh_s
                myChart.data.datasets[0].borderColor="#234783"
                myChart.data.datasets[0].backgroundColor="#13284B"
                myChart.data.datasets[0].label = `Humedad Rel. interna (%)`
                myChart.update()
                break;
            case "1": 
                myChart.data.labels = graphDates
                myChart.data.datasets[0].data = pm1_s
                myChart.data.datasets[0].borderColor="#19C895"
                myChart.data.datasets[0].backgroundColor="#289B1F"
                myChart.data.datasets[0].label = `PM1 µg/m\u00B3`
                myChart.update()
                break;
            case "2": 
                myChart.data.labels = graphDates
                myChart.data.datasets[0].data = pm10_s
                myChart.data.datasets[0].borderColor="#56083E"
                myChart.data.datasets[0].backgroundColor="#C72C97"
                myChart.data.datasets[0].label = `PM10 µg/m\u00B3`
                myChart.update()
                break;
            case "0": 
                myChart.data.labels = graphDates
                myChart.data.datasets[0].data = pm25_s
                myChart.data.datasets[0].borderColor="#EAAA00"
                myChart.data.datasets[0].backgroundColor="#C18D02"
                myChart.data.datasets[0].label = `PM2.5 µg/m\u00B3`
                myChart.update()
                break;
         

        }
    }



}

const formExport = document.getElementById('formExport')
const date1 = document.getElementById('date1')

formExport.addEventListener('submit', e => {
    e.preventDefault()
    get(child(database, 'sensors/airlink'))
        .then(snapshot => {
            let dayFormat = parseInt(date1.value.split('-').reverse()[0])
            let monthFormat = parseInt(date1.value.split('-').reverse()[1])
            let yearFormat = date1.value.split('-').reverse()[2]
            const dateFormated = `${dayFormat}/${monthFormat}/${yearFormat}`
            let dateFiltered
            let dateFlag

            dayFormat === 1 ? dateFlag = false : dateFlag = true

            if(dateFlag) dateFiltered = `${dayFormat - 1}/${monthFormat}/${yearFormat}`
            else dateFiltered = dateFormated
            
            const dato = snapshot.val()
            let structure = []
            let indice = 0
            let indiceFiltered = 0

            for (let key in dato) {
                if(dato[key].date == dateFiltered.toString()) {
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
    saveAsExcel(excelBuffer, 'Mediciones-Airlink')
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
  apiKey: "AIzaSyAP4ipIhAWYl8PEuMcnsbBAMhlaq_F5L40",
  authDomain: "aire-ciudadano.firebaseapp.com",
  databaseURL: "https://aire-ciudadano-default-rtdb.firebaseio.com",
  projectId: "aire-ciudadano",
  storageBucket: "aire-ciudadano.appspot.com",
  messagingSenderId: "109955859655",
  appId: "1:109955859655:web:17471d237468c5ce476ae2",
  measurementId: "G-CRLNK0PD2L"
};

// Initialize Firebase
initializeApp(firebaseConfig);



const selectModulair = document.querySelector('.select-measures')

const temp = document.getElementById('temp');
const rh = document.getElementById('rh');
const pm1_1 = document.getElementById('pm1');
const pm10_1 = document.getElementById('pm10');
const pm25_1 = document.getElementById('pm25');
const date = document.getElementById('date');
const hour = document.getElementById('hour');
var textoSub25 = "2.5"; 

const deviceName = document.getElementById('deviceName');
const comunication = document.getElementById('comunication');
const maker = document.getElementById('maker');
const device = document.getElementById('device');

let airlink = []
const allDates = []
const database = ref(getDatabase());

const dbRef = getDatabase();
const commentsRef = ref(dbRef, 'sensors/airlink')
onChildAdded(commentsRef, (data) => {
    airlink = data.val()
    temp.innerHTML = `${airlink.temp} °C`
    rh.innerHTML = `${airlink.rh} %`
    pm1_1.innerHTML = `${airlink.pm_1} µg/m<sup>3</sup>`
    pm10_1.innerHTML = `${airlink.pm_10} µg/m<sup>3</sup>`
    pm25_1.innerHTML = `${airlink.pm_25} µg/m<sup>3</sup>`
    date.innerHTML = `${airlink.date},`
    hour.innerHTML = airlink.hour
    device.innerHTML = airlink.device
    deviceName.innerHTML = airlink.model
    comunication.innerHTML = airlink.comunication
    maker.innerHTML = airlink.marker
    

}, {
    onlyOn: true
})

const allHours = []
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

const reference = ref(dbRef, 'sensors/airlink')
onValue(reference, (snap) => {
    const data = snap.val()
    for (const key in data) {
        allDates.push(data[key].date)
        allHours.push(data[key].hour)
        allTemperatures.push(data[key].temp)
        allRh.push(data[key].rh)
        allPm1.push(data[key].pm_1)
        allPm10.push(data[key].pm_10)
        allPm25.push(data[key].pm_25)
    }
    const hour = allHours.reverse().filter((el, i) => i < 20).reverse()
    const temperature = allTemperatures.reverse().filter((el, i) => i < 20).reverse()
    const rh = allRh.reverse().filter((el, i) => i < 20).reverse()
    const pm1 = allPm1.reverse().filter((el, i) => i < 20).reverse()
    const pm10 = allPm10.reverse().filter((el, i) => i < 20).reverse()
    const pm25 = allPm25.reverse().filter((el, i) => i < 20).reverse()
    datesReduced = allDates.reverse().filter((el, i) => i < 20).reverse()
    const dates = myDates(datesReduced) 




/*
    selectModulair.value = "0"
    myChart.data.datasets[0].data = pm25
    myChart.data.datasets[0].label = `PM 2.5µg/m3` 
    myChart.data.labels = hour
    myChart.update()*/
    /*
    myChart.update()
    selectModulair.addEventListener('change', updateSelect)
    function updateSelect() {
        
        const measureModulair = selectModulair.value
        
        switch(measureModulair) {
            case "3":
                myChart.data.labels = hour
                myChart.data.datasets[0].data = temperature
                myChart.data.datasets[0].borderColor="#EE0000"
                myChart.data.datasets[0].backgroundColor="#8C0000"
                myChart.data.datasets[0].label = `Temperatura interna °C` 
                myChart.update()
                break;
            case "4": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = rh
                myChart.data.datasets[0].borderColor="#234783"
                myChart.data.datasets[0].backgroundColor="#13284B"
                myChart.data.datasets[0].label = `Humedad Rel. interna (%)`
                myChart.update()
                break;
            case "1": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm1
                myChart.data.datasets[0].borderColor="#19C895"
                myChart.data.datasets[0].backgroundColor="#289B1F"
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
            case "0": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm25
                myChart.data.datasets[0].borderColor="#EAAA00"
                myChart.data.datasets[0].backgroundColor="#C18D02"
                myChart.data.datasets[0].label = `PM2.5 µg/m\u00B3`
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
    get(child(database, 'sensors/airlink'))
        .then(snapshot => {
            let dayFormat = parseInt(date1.value.split('-').reverse()[0])
            let monthFormat = parseInt(date1.value.split('-').reverse()[1])
            let yearFormat = date1.value.split('-').reverse()[2]
            const dateFormated = `${dayFormat}/${monthFormat}/${yearFormat}`
            let dateFiltered
            let dateFlag

            dayFormat === 1 ? dateFlag = false : dateFlag = true

            if(dateFlag) dateFiltered = `${dayFormat - 1}/${monthFormat}/${yearFormat}`
            else dateFiltered = dateFormated
            
            const dato = snapshot.val()
            let structure = []
            let indice = 0
            let indiceFiltered = 0

            for (let key in dato) {
                if(dato[key].date == dateFiltered.toString()) {
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
    saveAsExcel(excelBuffer, 'Mediciones-Airlink')
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetmt.sheet;charset=UTF-8'
const EXCEL_EXTENSION = '.xlsx'

const saveAsExcel = (buffer, fileName) => {
    const data = new Blob([buffer], { type: EXCEL_TYPE })
    saveAs(data, fileName + EXCEL_EXTENSION)
}
*/