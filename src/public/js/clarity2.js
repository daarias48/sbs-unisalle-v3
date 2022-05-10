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


const selectClarity = document.querySelector('.select-measures')

const temp = document.getElementById('temperatureClarity');
const rh = document.getElementById('rhClarity');
//const no2 = document.getElementById('no2Clarity');
const pm1mass = document.getElementById('pm1massClarity');
const pm10mass = document.getElementById('pm10massClarity');
const pm25mass = document.getElementById('pm25massClarity');
const date = document.getElementById('dateClarity');
const hour = document.getElementById('hourClarity');
const idClarity = document.getElementById('idClarity');
const model = document.getElementById('modelClarity');
const comunication = document.getElementById('comunication')
const maker = document.getElementById('maker')

let clarity = []
const allDates = []
const database = ref(getDatabase());
const dbRef = getDatabase();
const commentsRef = ref(dbRef, 'sensors/clarity2')
onChildAdded(commentsRef, (data) => {
    clarity = data.val()
    temp.innerHTML = `${clarity.temperature} °C`
    rh.innerHTML = `${clarity.rh} %`
    //no2.innerHTML = `${clarity.NO2} ppb`
    pm1mass.innerHTML = `${clarity.pm1Mass} µg/m<sup>3</sup>`
    pm10mass.innerHTML = `${clarity.pm10Mass} µg/m<sup>3</sup>`
    pm25mass.innerHTML = `${clarity.pm2_5Mass} µg/m<sup>3</sup>`
    date.innerHTML = `${clarity.date},`
    hour.innerHTML = clarity.hour
    model.innerHTML = clarity.model
    idClarity.innerHTML = clarity.deviceID
    comunication.innerHTML = clarity.comunication
    maker.innerHTML = clarity.maker
}, {
    onlyOn: true
})

const allHours = []
const allTemperatures = []
const allNO2 = []
const allRh = []
const allPm1Mass = []
const allPm1Num = []
const allPm10Mass = []
const allPm10Num = []
const allPm25Mass = []
const allPm25Num = []

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

const reference = ref(dbRef, 'sensors/clarity2')
onValue(reference, (snap) => {
    const data = snap.val()
    for (const key in data) {
        allDates.push(data[key].date)
        allHours.push(data[key].hour)
        allTemperatures.push(data[key].temperature)
        allNO2.push(data[key].NO2)
        allRh.push(data[key].rh)
        allPm1Mass.push(data[key].pm1Mass)
        allPm1Num.push(data[key].pm1Num)
        allPm10Mass.push(data[key].pm10Mass)
        allPm10Num.push(data[key].pm10Num)
        allPm25Mass.push(data[key].pm2_5Mass)
        allPm25Num.push(data[key].pm2_5Num)
    }
    const hour = allHours.reverse().filter((el, i) => i < 20).reverse()
    const temperature = allTemperatures.reverse().filter((el, i) => i < 20).reverse()
    const no2 = allNO2.reverse().filter((el, i) => i < 20).reverse()
    const rh = allRh.reverse().filter((el, i) => i < 20).reverse()
    const pm1Mass = allPm1Mass.reverse().filter((el, i) => i < 20).reverse()
    const pm1Num = allPm1Num.reverse().filter((el, i) => i < 20).reverse()
    const pm10Mass = allPm10Mass.reverse().filter((el, i) => i < 20).reverse()
    const pm10Num = allPm10Num.reverse().filter((el, i) => i < 20).reverse()
    const pm25Mass = allPm25Mass.reverse().filter((el, i) => i < 20).reverse()
    const pm25Num = allPm25Num.reverse().filter((el, i) => i < 20).reverse()
    datesReduced = allDates.reverse().filter((el, i) => i < 20).reverse()
    const dates = myDates(datesReduced)
   


    myChart.update()
    selectClarity.addEventListener('change', updateSelect)
    function updateSelect() {
        const measureClarity = selectClarity.value
        switch (measureClarity) {
            case "0": 
            myChart.data.labels = hour
            myChart.data.datasets[0].data = pm1Mass
            myChart.data.datasets[0].borderColor="#19C895"
            myChart.data.datasets[0].backgroundColor="#289B1F"
            myChart.data.datasets[0].label = `PM1 µg/m\u00B3`
            myChart.update()
            break;

            case "1": 
            myChart.data.labels = hour
            myChart.data.datasets[0].data = pm25Mass
            myChart.data.datasets[0].borderColor="#EAAA00"
            myChart.data.datasets[0].backgroundColor="#C18D02"
            myChart.data.datasets[0].label = `PM2.5 µg/m\u00B3`
            myChart.update()
            break;

            case "2": 
            myChart.data.labels = hour
            myChart.data.datasets[0].data = pm10Mass 
            myChart.data.datasets[0].borderColor="#56083E"
            myChart.data.datasets[0].backgroundColor="#C72C97"
            myChart.data.datasets[0].label = `PM10 µg/m\u00B3`
            myChart.update()
            break;

            case "3":
                myChart.data.labels = hour
                myChart.data.datasets[0].data = no2
                myChart.data.datasets[0].borderColor="#DB4781"
                myChart.data.datasets[0].backgroundColor="#8C0037"
                myChart.data.datasets[0].label = `NO2 concentrado ppb` 
                myChart.update()
                break;

            case "4":
                myChart.data.labels = hour
                myChart.data.datasets[0].data = temperature
                myChart.data.datasets[0].borderColor="#EE0000"
                myChart.data.datasets[0].backgroundColor="#8C0000"
                myChart.data.datasets[0].label = `Temperatura interna °C` 
                myChart.update()
                break;
            case "5": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = rh
                myChart.data.datasets[0].borderColor="#234783"
                myChart.data.datasets[0].backgroundColor="#13284B"
                myChart.data.datasets[0].label = `Humedad Rel. interna (%)`
                myChart.update()
                break;
        }
    }
})
let myDates = (dates) => {
    const datesReduced = dates.reduce((acc, el) => {
        if (!acc[el]) acc[el] = el
        return acc
    }, {})
    const datesFiltered = []
    for (let date in datesReduced) {
        datesFiltered.push(datesReduced[date])
    }
    return datesFiltered.join(', ')
}

const formExport = document.getElementById('formExport')
const date1 = document.getElementById('date1')

formExport.addEventListener('submit', e => {
    e.preventDefault()
    get(child(database, 'sensors/clarity2'))
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
    saveAsExcel(excelBuffer, 'Mediciones-Clarity2')
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetmt.sheet;charset=UTF-8'
const EXCEL_EXTENSION = '.xlsx'

const saveAsExcel = (buffer, fileName) => {
    const data = new Blob([buffer], { type: EXCEL_TYPE })
    saveAs(data, fileName + EXCEL_EXTENSION)
}
