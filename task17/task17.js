/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
/**
*随机生成颜色
*/
function getRandomColor(){
  return '#' + 
    (function(color){
      return (color += '0123456789abcdef'[Math.floor(Math.random()*16)])&&
      (color.length==6)?color:arguments.callee(color);
    })('');
}

/**
*监听事件
*/
function addEvent(node,event,handler){
  event = event ||window.event;
  if(!!node.addEventListener){
      node.addEventListener(event,handler,!1);
  }else{
    node.attachEvent("on"+event,handler);
  }
}

var width = 14;//图标宽度

/**
 * 渲染图表
 */
function renderChart() {
  var chartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
  chartWrap.innerHTML = "";
  for(var p in chartData){
    var rectangel = document.createElement("div");
    var backGroundColor = getRandomColor();
    rectangel.setAttribute('style',"width:"+width+"px;height:"+chartData[p]+"px;background:"+backGroundColor);
    rectangel.setAttribute('title',p+"空气质量:"+chartData[p]);
    chartWrap.appendChild(rectangel);
  }  
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    var target = event.target||event.srcElement;
// 确定是否选项发生了变化       
    if(target.value !== pageState.nowGraTime){
// 设置对应数据
      pageState.nowGraTime = target.value;
      initAqiChartData();
// 调用图表渲染函数      
      renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    var target = event.target||event.srcElement;
  // 确定是否选项发生了变化     
    if(target.value !== pageState.nowSelectCity){
  // 设置对应数据      
      pageState.nowSelectCity = target.value ;
      initAqiChartData();
  // 调用图表渲染函数      
      renderChart();      
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var time = document.getElementById('form-gra-time');
  addEvent(time,"change",graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  var city = document.getElementById('city-select');  
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var html = "" ;
  for(var p in aqiSourceData){
      html += "<option>"+p+"</option>";
  }
  city.innerHTML += html;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEvent(city,"change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var city = document.getElementById('city-select').value;
  var tempData=aqiSourceData[city];
  switch(pageState.nowGraTime){
    case "day": 
      chartData = tempData;
      break;
    case "week":
      chartData = {};
      width = 50;
      var item = 0,sum = 0,weekItem =1,date,weekNum;
      for(var d in tempData){
        date = new Date(d);
        weekNum = date.getDay();
        sum +=tempData[d];     
        item++;        
        if(weekNum == 0){
          chartData["2016年第"+weekItem+"周空气质量:"]=Math.floor(sum/item);
          console.log(chartData);
          sum = 0;
          item = 0;
          weekItem++;           
        }else{     
          chartData["2016年第"+weekItem+"周空气质量:"]=Math.floor(sum/item);
          console.log(chartData);
          }         
      }
    break;
    case "month":
      chartData = {};
      width = 80;
      var item = 0, sum = 0,month = 1,date;
      for(var d in tempData){
        date = new Date(d);
        var nowMonth = date.getMonth()+1;//date中Month是从0开始计数，因此+1后未自然月的月份       
        if(nowMonth == month){        
          sum += tempData[d];
          item++;
          chartData["2016年"+month+"月空气质量："] = Math.floor(sum/item);              
        } else{
          month++;
          sum = 0;
          item = 0; 
          sum += tempData[d];
          item++;
        }   
      }    
    break;
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();