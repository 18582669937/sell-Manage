function getNum(num) {
    return num < 10 ? '0' + num : num
}
export let getChinatime = (utctime) => {

    let date = new Date(utctime)

    return date.getFullYear() + '-' + getNum((date.getMonth() + 1)) + '-' + getNum(date.getDate()) + ' ' + getNum(date.getHours()) + ":" + getNum(date.getMinutes()) + ":" + getNum(date.getSeconds())
}