//字符省略
export const splicStr = (str, n) =>{
    let len = str.length;
    if(typeof str === 'string'){
        if(len<=n){
            return str;
        }else{
            return str.substring(0, n)+" . . . ";
        }
    }
};


