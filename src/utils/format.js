export const formatCreatedDate = (value) => {

    /* format data */
    const date = new Date(value)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`

}