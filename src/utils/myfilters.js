export const dataFormat = (data, spe) => {
    data = new Date(data)
    spe = spe || '/'
    var year = data.getFullYear()
    var month = data.getMonth() + 1
    var day = data.getDate()
    return year + spe + month + spe + day
}
//
export const myCate = (arr) => {

    var newArr = []
    for (var i = 0; i < arr.length; i++) {
        newArr[i] = arr[i].name
    }
    //    console.log(newArr);

    newArr = newArr.join(",")

    return newArr
}