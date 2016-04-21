	function addLoadEvent(func){
		var oldonload = window.onload;
		if(typeof window.onload != 'function'){
			window.onload = func;
		}else{
			window.onload = function(){
			oldonload();
			func();
			}
		}
	}
	var item = 1; //图片数量基数
	function gallery () {
		var gallery = document.getElementById('gallery');
		gallery.innerHTML="";//清空元素
		/*使用for循环添加图片*/
		for(var i=1;i<=item;i++){
			var img = document.createElement('img');
			img.src = "img/"+i+".jpg";
			gallery.appendChild(img);
		}
		/*设置样式*/
		if(item>0){
			switch(item){
				case 1: 
				gallery.setAttribute('class','g-wrap');
				break;
				case 2: 
				gallery.setAttribute('class','g-wrap g-two');
				break;
				case 3: 
				gallery.setAttribute('class','g-wrap g-three');
				break;	
				case 4: 
				gallery.setAttribute('class','g-wrap g-four');
				break;		
				case 5: 
				gallery.setAttribute('class','g-wrap g-five');
				break;		
				case 6: 
				gallery.setAttribute('class','g-wrap g-six');
				break;											
			}
		}
		item++;
		if(item>6){
			item=1;
		}
	}
	addLoadEvent(gallery);
 	setInterval(gallery,5000);