export const dataFormat = (data, spe) => {
    data = new Date(data)
    spe = spe || '/'
    var year = data.getFullYear()
    var month = data.getMonth() + 1
    var day = data.getDate()
    return year + spe + month + spe + day
}