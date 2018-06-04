// 1.设置地图最大、最小级别,关闭默认地图POI事件(构造底图时，关闭底图可点功能)
function initMap(map){
//	地图样式设置，针对在线开发。离线地图是不需要的，因为下载好的离线地图样式已固定
//	var myStyleJson=[
//	                 {
//	                     "featureType": "background",
//	                     "elementType": "all",
//	                     "stylers": {
//	                               "color": "#00233B"
//	                     }
//	           },
//	           {
//	                     "featureType": "green",
//	                     "elementType": "all",
//	                     "stylers": {
//	                               "color": "#0092BA"
//	                     }
//	           }
//	]
//	map.setMapStyle({styleJson: myStyleJson });
	map.setMinZoom(6);	//设置地图允许的最小级别。
	map.setMaxZoom(15);	//设置地图允许的最大级别。
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    // 将地图显示范围设定在指定区域，地图拖出该区域后会重新弹回。离线地图时需要引入AreaRestriction_min.js
    var b = new BMap.Bounds(new BMap.Point(96.136156,26.558),new BMap.Point(103.071937,34.464461)); // 范围 左下角，右上角的点位置
    try {    // js中尽然还有try catch方法，可以避免bug引起的错误
        BMapLib.AreaRestriction.setBounds(map, b); // 以map为中心，以b为范围的地图
    } catch (e) {
        // 捕获错误异常
        alert(e);
    }
}
// 根据标题和内容确定基本信息
function addMouseoverHandler(title,content,marker){
	marker.addEventListener("mouseover",function(e){
		openInfo(title,content,e)}
	);
}
// 弹出信息窗口
function openInfo(title,content,e){
	var opts = {
			  width : 200,     // 信息窗口宽度
			  height: 100,     // 信息窗口高度
			  enableMessage:true,//设置允许信息窗发送短息
			};
	var p = e.target;
	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	opts.title = title;
	var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
	map.openInfoWindow(infoWindow,point); //开启信息窗口
}

//设置文字样式并显示
function addMarkerLabel(marker,name){
    var lenth =21 - name.length * 6;
    var label = new BMap.Label(name,{offset:new BMap.Size(lenth,38)});
    label.setStyle({border :"0px", backgroundColor: "transparent",fontSize:"12px",fontWeight:"bold",color : "yellow"});
    marker.setLabel(label);
}

function isAllWS(str)
{
	/*  匹配字符串中的空格，并舍弃，校验其长度   */
	if(str.replace(/\s+/g,'').length==0)
		return true;
	else
		return false;
}

