/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
	var aqiData = {};
	var aqi_list = [];
	var table =document.getElementById('aqi-table');
	var delBtn =document.getElementsByTagName('button');	
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
	function addAqiData() {
		var city = document.getElementById('aqi-city-input').value;
		var value = document.getElementById('aqi-value-input').value;
		if(city != "" && value !=""){
			var a = new Array();
			a[0]=city,a[1]=value;
			aqi_list.push(a);
			city = '"'+city+'"';
			aqiData[city]=value;			
		}
	}

/**
 * 渲染aqi-table表格
 */
	function renderAqiList() {
		table.innerHTML="";//清空table内容
		var tr =document.createElement('tr');
		tr.innerHTML ='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
		table.appendChild(tr);
		for(var i=0;i<aqi_list.length;i++){
			var tr =document.createElement('tr');
			//给创建的button添加一个item属性，用于删除时使用
			tr.innerHTML ='<tr><td>'+aqi_list[i][0]+'</td><td>'+aqi_list[i][1]+'</td><td><button item='+i+'>删除</button></td></tr>';
			table.appendChild(tr);		
		}
	}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
	function addBtnHandle() {
  		addAqiData();
		renderAqiList();
	}

/**
 * 点击各个删除按钮的时候的处理逻辑  aqiData["\"昆明\""]
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
	function delBtnHandle(j) {
  // do sth.
  		var city = aqi_list[j][0];
		aqi_list.splice(j,1);
		aqiData={};//清空aqiData对象
		for(var i=0;i<aqi_list.length;i++){
			var newCity = aqi_list[i][0];
			var newValue = aqi_list[i][1];
			newCity = '"'+newCity+'"';
			aqiData[newCity]=newValue;
		}
		renderAqiList();
	}

	function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
		var btn =document.getElementById('add-btn');
		btn.onclick = function(){
			addBtnHandle();
		};
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  		table.onclick = function(event){
  			var target =event.target||event.srcElement;
  			var item = target.getAttribute('item');
  			if(item != null){
  				delBtnHandle(item);
  			}
  		}
	}

	init();
