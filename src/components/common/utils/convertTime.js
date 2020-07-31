// import moment from 'moment-timezone/moment-timezone';
export const convertTime = (unix_timestamp) => {
    if(!unix_timestamp) return ''
    let time = new Date(unix_timestamp * 1000);
    let hours = time.getHours()< 10 ? `0${time.getHours()}` : time.getHours()
    let mins = time.getMinutes() < 10 ? `0${time.getMinutes()}`: time.getMinutes()
    return `${hours}:${mins}`
}

// https://overcoder.net/q/25947/%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D1%8F-%D1%87%D0%B0%D1%81%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE-%D0%BF%D0%BE%D1%8F%D1%81%D0%B0-%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82%D0%B0-%D0%B2-javascript