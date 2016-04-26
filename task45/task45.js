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
/* 加载图片 */
	function images(){
		var images = [];
		for (var i = 1; i < 40; i++) {
			var src = 'img/'+i+'.jpg';
			images.push(src);
		}
		var Arr =[];
		for(var i=0;i<images.length;i++){
			var pic = document.createElement('div');
			pic.className = 'pic';
			var img = document.createElement('img');
			img.src = images[i];
			pic.appendChild(img);
			Arr[i] = pic;
		}
		var oParent = document.getElementById('main');
		for(var i=0;i<Arr.length;i++){
			oParent.appendChild(Arr[i]);
		}
	}	
	addLoadEvent(images);
