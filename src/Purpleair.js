const purpleairSensor = (data) => {
    
    let dateObj = data.sensor.lastseen
    var name_pm1='pm1.0_atm'
    const format = new Date(dateObj = new Date())
    const dateFormat = format.toLocaleString('es-MX', { timeZone: 'America/Guayaquil' }).split(' ')
    const date = dateFormat[0]
    const hourFormat = dateFormat[1].split(':')
    const hour = `${hourFormat[0]}:${hourFormat[1]}`
    const rh = parseFloat(data.sensor.humidity).toFixed(0)
    const pm1 = parseFloat(data.sensor['pm1.0_atm']).toFixed(2)
    const pm10 = parseFloat(data.sensor['pm10.0_atm']).toFixed(2)
    const pm25 = parseFloat(data.sensor['pm2.5_atm']).toFixed(2)
    
    const tempF = parseFloat(data.sensor.temperature).toFixed(0)
    const tempe = ((tempF - 32) * (5 / 9)).toFixed(0)

    return Sensor = {
        id: data.sensor.last_seen,
        rh,
        tempe,
        pm1,
        pm10,
        pm25,
        date,
        hour,
        storage: '110 VAC',
        maker: 'PurpleAir',
        model: 'PurpleAir',
        comunication: 'Wifi',
        device: data.sensor.sensor_index
    }
}
module.exports = purpleairSensor