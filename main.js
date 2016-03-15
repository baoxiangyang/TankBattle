function Tanke(x,y,arr){
		this.x = x; //初始位置
		this.y = y;
		//1->上,2->右，3->下，4->左
		this.direct = 1; //初始方向
		this.color = arr; //坦克颜色
		this.speed = 1; //移动速度
		this.type = "Hero"
	}
Tanke.prototype = {
	drawTanke:function(){  //绘坦克
		switch(this.direct){
			case 1:
			case 3:
				cxt.beginPath();
				cxt.fillStyle = this.color[0];
				cxt.fillRect(this.x-10,this.y-15,5,30);
				cxt.fillRect(this.x+5,this.y-15,5,30);
				cxt.fillRect(this.x-4,this.y-10,8,20);
				cxt.fillStyle = this.color[1];
				cxt.arc(this.x,this.y,4,0,2*Math.PI);
				cxt.fill();
				cxt.closePath();
				cxt.strokeStyle = this.color[1];
				cxt.lineWidth = 2;
				cxt.beginPath();
				cxt.moveTo(this.x,this.y);
				if(this.direct == 1){
					cxt.lineTo(this.x,this.y-15)
				}else if(this.direct == 3){
					cxt.lineTo(this.x,this.y+15)
				}
				cxt.stroke();
				cxt.closePath()
				break;
			case 2:
			case 4:
				cxt.beginPath();
				cxt.fillStyle = this.color[0];
				cxt.fillRect(this.x-15,this.y-10,30,5);
				cxt.fillRect(this.x-15,this.y+5,30,5);
				cxt.fillRect(this.x-10,this.y-4,20,8);
				cxt.fillStyle = this.color[1];
				cxt.arc(this.x,this.y,4,0,2*Math.PI);
				cxt.fill();
				cxt.closePath();
				cxt.strokeStyle = this.color[1];
				cxt.lineWidth = 2;
				cxt.beginPath();
				cxt.moveTo(this.x,this.y);
				if(this.direct == 2){
					cxt.lineTo(this.x+15,this.y);
				}else if(this.direct == 4){
					cxt.lineTo(this.x-15,this.y)
				}
				cxt.stroke();
				cxt.closePath();
				break;
		}
	},
	moveUp:function(){ //坦克上移
		this.y -= this.speed;
		if(this.y < -185){
			this.y = -185;
		}
		this.direct = 1;
	},
	moveRight:function(){ //坦克右移
		this.x += this.speed;
		if(this.x >185 ){
			this.x = 185;
		}
		this.direct = 2;
	},
	moveDown:function(){ //坦克下移
		this.y += this.speed;
		if(this.y >185){
			this.y = 185;
		}
		this.direct = 3;
	},
	moveLeft:function(){ //坦克左移
		this.x -= this.speed;
		if(this.x < -185){
			this.x = -185;
		};
		this.direct = 4;
	},
	shooting:function(){ //发射子弹
		switch(this.direct){
			case 1:
				arrZidan.push(new Zidan(this.x,this.y-15,this.direct,this.color[1],this.type))
				break;
			case 2:
				arrZidan.push(new Zidan(this.x+15,this.y,this.direct,this.color[1],this.type))
				break;
			case 3:
				arrZidan.push(new Zidan(this.x,this.y+15,this.direct,this.color[1],this.type))
				break;
			case 4:
				arrZidan.push(new Zidan(this.x-15,this.y,this.direct,this.color[1],this.type))
				break;
		}
	}

}
function Ditanke(x,y,arr){ //敌方坦克
	Tanke.call(this,x,y,arr)
	this.stop = true;
	this.isDie = false;
	this.type = "Criminal";
	}
Ditanke.prototype = new Tanke();
Ditanke.prototype.start = function(){//处理敌方坦克移动方向
	if(this.stop){
		var number = Math.round(Math.random()*3)+1;
		switch(number){
			case 1:
				this.moveUp()
				break;
			case 2:
				this.moveRight()
				break;
			case 3:
				this.moveDown();
				break;
			case 4:
				this.moveLeft();
				break;
			default:
				alert('错误');
		};
		this.stop = false;
	}else{
		switch(this.direct){
			case 1:
				this.moveUp()
				break;
			case 2:
				this.moveRight()
				break;
			case 3:
				this.moveDown();
				break;
			case 4:
				this.moveLeft();
				break;
			default:
				alert('错误');
		}
	}
	this.isdie();
	this.drawTanke()
}
Ditanke.prototype.moveUp=function(){
	this.y -= this.speed;
	if(this.y < -185){
		this.y = -185;
		this.stop = true;
	}
	this.direct = 1;
}
Ditanke.prototype.moveRight = function(){
	this.x += this.speed;
	if(this.x >185 ){
		this.x = 185;
		this.stop = true;
	}
	this.direct = 2;
}
Ditanke.prototype.moveDown = function(){
	this.y += this.speed;
	if(this.y >185){
		this.y = 185;
		this.stop = true;
	}
	this.direct = 3;
}
Ditanke.prototype.moveLeft = function(){
	this.x -= this.speed;
	if(this.x < -185){
		this.x = -185;
		this.stop = true;
	};
	this.direct = 4;
}
Ditanke.prototype.isdie = function(){ //敌方坦克被打中时执行
	if(this.isDie){
		diTanke.splice(diTanke.indexOf(this),1);
		return false;
	}
}
function Zidan(x,y,direct,color,type){ //子弹构造函数
	this.x = x;
	this.y = y;
	this.direct = direct;
	this.color = color;
	this.speed = 5;
	this.isDie = false;
	this.type = type;
}
Zidan.prototype = {
	drawZidan:function(){ //绘制子弹
		cxt.beginPath();
		cxt.fillStyle = this.color;
		cxt.arc(this.x,this.y,2,0,2*Math.PI);
		cxt.fill();
		cxt.closePath();
	},
	aniteZidan:function(){ //子弹运动
		switch(this.direct){
			case 1:
				this.y -= this.speed;
				break;
			case 2:
				this.x += this.speed;
				break;
			case 3:
				this.y += this.speed;
				break;
			case 4:
				this.x -= this.speed;
				break;
		}
		this.dieZidan()
	},
	dieZidan:function(){ //判断子弹是否死亡
		if(this.isDie || this.x < -200 ||this.x >200 || this.y >200 || this.y < -200){
			arrZidan.splice(arrZidan.indexOf(this),1);
			return false;
		}
	}	
}
function Obstacle(arr){ //障碍物构造器
	this.x = arr[0];
	this.y = arr[1];
	this.color  = "#abcdef";	
	this.isDie = false;
}
Obstacle.prototype = {
	drawObstacle :function(){ //绘制障碍物
		cxt.beginPath();
		cxt.fillStyle = this.color;
		cxt.fillRect(this.x,this.y,20,30);
		cxt.closePath();
		cxt.beginPath();
		cxt.strokeStyle = '#fff';
		cxt.moveTo (this.x,this.y+5);
		cxt.lineTo(this.x+20,this.y+5);
		cxt.closePath();
		cxt.stroke()
		cxt.strokeStyle = '#2a2';
		cxt.beginPath()
		cxt.moveTo (this.x,this.y+15);
		cxt.lineTo(this.x+20,this.y+15);
		cxt.closePath();
		cxt.stroke()
		cxt.strokeStyle = '#111';
		cxt.beginPath()
		cxt.moveTo (this.x,this.y+25);
		cxt.lineTo(this.x+20,this.y+25);
		cxt.closePath()
		cxt.stroke()
		cxt.beginPath()
		cxt.strokeStyle='#987';
		cxt.moveTo (this.x+10,this.y+5);
		cxt.lineTo(this.x+10,this.y+25);
		cxt.stroke()
		cxt.closePath();
		cxt.beginPath()
		cxt.strokeStyle = 'blue';
		cxt.rect(this.x,this.y,20,30);
		cxt.stroke()
		this.isObstacle()
	},
	isObstacle:function(){ //判断障碍物是否死亡
		if(this.isDie){
			arrObstacle.splice(arrObstacle.indexOf(this),1)
			return false;
		}
	}
}