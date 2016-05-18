/**
 * Created by tzr4032369 on 2016/4/19.
 */
/*************全局变量与函数  ***********/
var textarea = document.getElementById('order');
var ol = document.getElementsByTagName('ol')[0];
var refresh = document.getElementById('refresh');

//提示
function move_out(){
    alert('超出移动范围，不能移动！');
}

//为执行按钮添加事件
document.getElementById('run').onclick = function(){
    var text = textarea.value;
    var orders = text.split('\n');
    var i=0;
    var timer =setInterval(function(){
        if(i<orders.length){
            if(/\d+/.test(orders[i])){   //判断是否含数字
                for(var j=0;j<orders[i].match(/\d+/).length;j++){
                    runCommand(orders[i].replace(/\s+\d+\s*/g,''),orders[i].match(/\d+/)[j]);   //将命令与数字拆分
                }
            }else{
                runCommand(orders[i]);
            }
        }else{
            clearInterval(timer);
        }
        i++;
    },500);
}


//ִ执行命令
function runCommand(){
    var order = arguments[0].toLowerCase(); //兼容大小写
    var num = arguments[1] || 1;
    switch(order){
        case 'go':
           active.go(num);
            break;
        case 'tun lef':
            active.turn(1);
            break;
        case 'tun rig':
            active.turn(3);
            break;
        case  'tun bac':
            active.turn(2);
            break;
        case  'tra lef':
            if(active.col <=num){move_out();return;}
            active.traLef(num);
            break;
        case  'tra rig':
            if(active.col >10-num){move_out();return;}
            active.traRig(num);
            break;
        case  'tra top':
            if(active.row <=num){move_out();return;}
            active.traTop(num);
            break;
        case  'tra bot':
            if(active.row >10-num){move_out();return;}
            active.traBot(num);
            break;
        case  'mov lef':
            if(active.col <=num){move_out();return;}
            active.movLef(num);
            break;
        case  'mov rig':
            if(active.col>10-num){move_out();return;}
            active.movRig(num);
            break;
        case  'mov top':
            if(active.row <=num){move_out();return;}
            active.movTop(num);
            break;
        case  'mov bot':
            if(active.row >10-num){move_out();return;}
            active.movBot(num);
            break;

        default :
    }
}

//activeNode
function activeNode(row,col){
    this.row = row;  //行
    this.col = col;  //列
    this.direction = 0;  //0向上 1向左 2向下 3向右
    this.dom = function(){
        return innerDom;
    }
}

//activeNode的原型方法

//显示activeNode
activeNode.prototype.show = function(){
    this.dom().style.top = this.row*50+this.row-1+'px';
    this.dom().style.left = this.col*50+this.col-1+'px';
    this.dom().style.transform = "rotateZ(-"+this.direction*90+"deg)";
    var table = document.getElementsByTagName('table')[0];
    table.appendChild(this.dom());
}

activeNode.prototype.go = function(num){
    switch(this.direction){
        case 0:
            if(this.row <=num){move_out();return;}
            this.dom().style.top = (parseInt(this.dom().style.top) - 51*num) +'px';
            this.row-=num;
            break;
        case 1:
            if(this.col <=num){move_out();return;}
            this.dom().style.left = (parseInt(this.dom().style.left) - 51*num) +'px';
            this.col-=num;
            break;
        case 2:
            if(this.row >10-num){move_out();return;}
            this.dom().style.top = (parseInt(this.dom().style.top) + 51*num) +'px';
            this.row+=num;
            break;
        case 3:
            if(this.col >10-num){move_out();return;}
            this.dom().style.left = (parseInt(this.dom().style.left) + 51*num) +'px';
            this.col+=num;
            break;
        default :

    }
}

activeNode.prototype.turn = function(directionNum){
    var newDirection =this.direction+directionNum;
    this.dom().style.transform = "rotateZ(-"+newDirection*90+"deg)";
    this.direction = (this.direction+directionNum)%4;
}

activeNode.prototype.traLef = function(num){
    this.col -=num;
    this.dom().style.left = (parseInt(this.dom().style.left) - 51*num) +'px';
}

activeNode.prototype.traTop = function(num){
    this.row -=num;
    this.dom().style.top = (parseInt(this.dom().style.top) -  51*num) +'px';
}

activeNode.prototype.traRig = function(num){
    this.col +=num;
    this.dom().style.left = (parseInt(this.dom().style.left) +  51*num) +'px';
}

activeNode.prototype.traBot = function(num){
    this.row +=num;
    this.dom().style.top = (parseInt(this.dom().style.top) +  51*num) +'px';
}

activeNode.prototype.movLef= function(num){
    this.dom().style.transform = "rotateZ(-90deg)";
    this.direction =1;
    this.traLef(num);
}

activeNode.prototype.movRig= function(num){
    this.dom().style.transform = "rotateZ(90deg)";
    this.direction =3;
    this.traRig(num);
}

activeNode.prototype.movTop= function(num){
    this.dom().style.transform = "rotateZ(0deg)";
    this.direction =0;
    this.traTop(num);
}

activeNode.prototype.movBot= function(num){
    this.dom().style.transform = "rotateZ(-180deg)";
    this.direction =2;
    this.traBot(num);
}

//初始化活动节点
var innerDom = document.createElement('div');
innerDom.className = 'active';

//实例化activeNode对象
var active = new activeNode(5,6);
active.show();

//处理console输入框样式

//为输入框添加keyup事件
textarea.onkeyup= function(){
    rowhasChange();
}

//为输入框添加scroll事件
textarea.addEventListener('scroll', function() {
    //同步行号显示
    var top = textarea.scrollTop;
    ol.scrollTop = top;
})

//刷新
refresh.onclick = function(){
    textarea.value ='';
    ol.innerHTML = '';
}

//监测行数，添加行号
function rowhasChange(){
    var input = textarea.value;
    var orders = input.split('\n');
    var top = textarea.scrollTop;
    var arr =[];
    for (var i = 0; i < orders.length; i++) {
        arr.push("<li>" + (i + 1) + "</li>");
    }
    ol.innerHTML = arr.join("");
    ol.scrollTop = top;
}


