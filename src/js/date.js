
function getDateFromDate(date) {
    return getDate(date.getFullYear(), date.getMonth()+1, date.getDate())
}

function getDate(year, month, day) {
    return new Date(Date.UTC(year, month-1, day))
}

export {getDate, getDateFromDate}