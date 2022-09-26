function formateDate(time){
    if(!time) return ''
    let data=new Date(time)
    return data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate()+' '
}
export default formateDate