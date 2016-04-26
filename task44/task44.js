/*页面加载时加载函数*/
	function addLoadEvent (func) {
		var oldOnload=window.onload;
		if(typeof oldOnload !== 'function'){
			window.onload = func();
		}else{
			window.onload = function(){
				oldOnload();	
				func();
			}
		}
	}
/*兼容ie的根据className获取元素函数*/
	function getByClass(parent,clsName){
		if(!!parent.getElementsByClassName){
			return parent.getElementsByClassName(clsName);
		}else{
			var list = parent.getElementsByTagName('*'),result=[];
			for(var i=0;i<list.length;i++){
				if((' '+list[i].className+' ').indexOf(clsName)!==-1){
					result.push(list[i]);
				}
			}
			return result;
		}
	}
/*兼容ie的时间注册函数*/
	function addEvent(node,event,handler){
		var event = event||window.event;
		if(!!node.addEventListener){
			node.addEventListener(event,handler,false);
		}else{
			node.attachEvent('on'+event,handler);
		}
	}

/*获取数组最小值索引*/
	function getMinIdex(min,arr){
		for(var i in arr){
			if(arr[i]==min){
				return i;
			}
		}
	}

/*瀑布流布局函数*/
	function waterFall(){
		var oParent = document.getElementById('main');
		var oBoxs = getByClass(oParent,'box');//获取页面中已经加载的所有calssName为box的元素
		var boxW = oBoxs[0].offsetWidth;//获取宽度--瀑布流布局中每列的宽度是一样的
		var clos = Math.floor(document.documentElement.clientWidth/boxW);//每行容纳div的个数
		oParent.style.cssText = 'width:'+boxW*clos+'px;';
		var HArr =[];
		for(var i=0;i<oBoxs.length;i++){
			var h =oBoxs[i].offsetHeight;//获取元素的高度
			if(i<clos){
				HArr.push(h);
			}else{
				var minH = Math.min.apply(null,HArr);//获取数组（上一行）中最小值（最小高度）
				var index = getMinIdex(minH,HArr);//获取最小值在数组中的索引
				oBoxs[i].style.position = 'absolute';
				oBoxs[i].style.top = minH+'px';
				oBoxs[i].style.left = boxW*index+'px';
				HArr[index] += oBoxs[i].offsetHeight;
			}
		}
	}
	addLoadEvent(waterFall);
/*判断滚动条是否达到加载数据条件--当最后一张图片显示出来后加载其余图片*/
	function checkScrollSide(){
		var oParent = document.getElementById('main');
		var oBoxs = getByClass(oParent,'box');
		var lastPicHeight = oBoxs[oBoxs.length-1].offsetTop+oBoxs[oBoxs.length-1].offsetHeight;
		var scroolTop = document.documentElement.scrollTop||document.body.scrollTop;
		var documentHeight = document.documentElement.clientHeight;
		return (lastPicHeight<=scroolTop+documentHeight)?true:false;
	}
/*页面加载后，加载图片数据，存放图片*/
	function images(){
		var images = [];
		for (var i = 0; i < 20; i++) {
			var src = 'img/'+i+'.jpg';
			images.push(src);
		}
		var obj ={};
		for(var i=0;i<images.length;i++){
			var pic = document.createElement('div');
			pic.className = 'pic';
			var img = document.createElement('img');
			img.src = images[i];
			pic.appendChild(img);
			obj[i] = pic;
		}
		return obj;
	}
	addLoadEvent(images);	
/*监听滚动条事件*/
	window.onscroll = function(){
		var oParent = document.getElementById('main');
		var bool = checkScrollSide();
		var imagesObj = images();
		if(bool){
			for(var i=0;i<20;i++){ 
				var box = document.createElement('div');
				box.className ='box';
				box.appendChild(imagesObj[i]);
				oParent.appendChild(box);
			}
			waterFall();		
		}
	}
/*监听图片的点击事件*/
	var oParent= document.getElementById('main');
	addEvent(oParent,'click',function(event){
		var target = event.target||event.srcElement;
		var src = target.src;
		var Gpic= getByClass(document,'g-pic')[0];
		var picDiv = getByClass(Gpic,'m-pic')[0];
		picDiv.innerHTML='';	
		var img = document.createElement('img');
		img.src =src;	
		picDiv.appendChild(img);
		Gpic.style.display = 'block';
	});
/*监听遮罩的点击事件*/
	var Gpic= getByClass(document,'g-pic')[0];
	addEvent(Gpic,'click',function(event){
		var target = event.target||event.srcElement;
		console.log(target.className);
		if(target.className == 'm-pic'){
			Gpic.style.display = 'none';
		}	
	});
