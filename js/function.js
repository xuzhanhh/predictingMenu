/**
 * Created by 2 on 2017/5/15.
 */
function sameSing(a,b) {
    //二进制的政府表示在最高位 1 - 0 +  异或运算 对应位置不同为1 ab相同为0
    return (a ^ b)>=0
}

function vector(a,b) {
    return{
        x:b.x-a.x,
        y:b.y-a.y
    }
}

function vectorProduct(v1,v2) {
    return v1.x * v2.y - v2.x * v1.y
}


function isPointInTrangle(p,a,b,c) {
    var pa = vector(p,a);
    var pb = vector(p,b);
    var pc = vector(p,c);

    var t1 = vectorProduct(pa,pb);
    var t2 = vectorProduct(pb,pc);
    var t3 = vectorProduct(pc,pa);
    console.log(t1+"    "+t2+"  "+t3);
    return sameSing(t1,t2)&& sameSing(t2,t3)
}

function needDelay(elem,leftCorner,currMousePos) {
    var offset = elem.offset();

    var topLeft = {
        x:offset.left,
        y:offset.top
    };

    var buttomLeft = {
        x:offset.left,
        y:offset.top+elem.height()
    };

    return isPointInTrangle(currMousePos,leftCorner,topLeft,buttomLeft)
}