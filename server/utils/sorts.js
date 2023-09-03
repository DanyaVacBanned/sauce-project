


module.exports = function(arr){
    let temp = null
    
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length - 1; j++){
            if(new Date(arr[j].timestamps * 1000).getTime() > new Date(arr[j + 1].timestamps * 1000).getTime()){
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}