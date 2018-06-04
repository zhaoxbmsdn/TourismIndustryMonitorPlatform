		var host = window.isLocal ? window.server : "http://support.supermap.com.cn:8090";
		var map, url = host + "/iserver/services/map-china400/rest/maps/China";
		/* 通过DOM ID初始化地图实例 ，用对象字面量进行配置 */
		map = L.map('dcmap', {
			center: [28.5590629, 100.347585],
			maxZoom: 18,
			zoom: 13,
			attributionControl: false,
			scrollWheelZoom: true, //鼠标滚轮缩放
			tap: false, //移动端缩放,
			doubleClickZoom: false, //双击缩放,
			zoomControl: true
		});
		/*SuperMap iServer 的 REST 地图服务的图层*/
		L.supermap.tiledMapLayer(url).addTo(map);
		//点位图层组
		var overlayGroup = L.layerGroup();
		//调用客户端弹出窗
	    function ShowMedia(msg) {
	        jsObj.showMediaMsg(msg);
	    }
		function clickItem(element){
			//清除上次的图层
			overlayGroup.clearLayers();
			//触发删除路径的事件
			map.fire("click");  
			//请求对应类型的图层信息
			$.ajax({
	            url:"http://111.231.216.136:8080/rest/gisGetLayer",
	            dataType:"json",
	            type:"GET",
	            data:{"layer":element.dataset.layer},
	            success:function(data){
					data.map(function(item,index,arr){
						addMarker(item);
					});
					map.flyToBounds(overlayGroup.getLayers().map(function (layer,index,arr) {
                    	return layer.getLatLng();
                	}));
	            },
	            error:function(){
	                console.log("网络连接异常；查询请求失败！");
	            }
	        });
		}
		   /* 设置popup的样式 */
	    function setPopup(content){
	        var node = document.createElement("div");
	        node.style ="background:transparent;font-size:12px;font-weight:bold;color:black;";
	        node.textContent=content;
	        var popup = L.popup({
	            closeButton:false,
	            offset:[0,24],
	            autoPan:false,
	            closeOnClick:true
	        }).setContent(node);
	        return popup;
	    }
		function addMarker(item,rowIndex){
	        var point = new L.latLng(item.LATITUDE,item.LONGITUDE);
	        var myIcon = null;
	        var hoverIcon = null;
	        var marker = null;
	        var size = [42, 42];
	        var ancher = [21,38];   //图像图标与实际坐标点位置的锚准
	        switch(item.LAYER)
	        {
	            case "scenic":
	                myIcon = L.icon({
	                    iconUrl:"gis/scenic.png",
	                    iconSize:size,
	                    iconAnchor:ancher,
	                    title:item.NAME.toString()
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/scenic.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38],
	                    title:item.NAME.toString()
	                });
	                marker = L.marker(point,{icon:myIcon});  // 创建标注
	                break;
	            case "monitor":
	                myIcon = L.icon({
	                    iconUrl:"gis/monitor.png",
	                    iconSize:size,
	                    iconAnchor:ancher,
	                    title:item.NAME.toString()
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/monitor.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38],
	                    title:item.NAME.toString()
	                });
	                marker = L.marker(point,{icon:myIcon}).addTo(map);  // 创建标注
	                marker.addEventListener("click",function(){
	                    ShowMedia(item.MAIN_URL);
	                });
	                break;
	            case "patrol":
	                myIcon = L.icon({
	                    iconUrl:"gis/patrol.png",
	                    iconSize:size,
	                    iconAnchor:ancher,
	                    title:item.NAME.toString()
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/patrol.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38],
	                    title:item.NAME.toString()
	                });
	                marker = L.marker(point,{icon:myIcon}).addTo(map);  // 创建标注
	                marker.addEventListener("click",function(){
	                    $.ajax({
	                        url:"http://111.231.216.136:8080/rest/gisGetPatrolPath",
	                        data:{"id":item.ID},
	                        dataType:"json",
	                        success:function(data){
	                            map.fire("click"); //避免前一条轨迹线未删除
	                            var layerList = [];
	                            var pointList = [];
	                            data.map(function(item,index,array){
	                                if(index == data.length-1){
	                                    return;  //不绘制最后一个点
	                                }
	                                var mypoint = [item.LATITUDE,item.LONGITUDE];
	                                var marker = L.marker(mypoint).addTo(map);
	                                var popup = setPopup(new Date(item.GATHER_TIME).Format("yyyy-MM-dd hh:mm:ss")).setLatLng(marker.getLatLng());
	                                popup.addTo(map);
	                                layerList.push(popup);
	                                layerList.push(marker);
	                                pointList.push(mypoint);
	                            });
	                            pointList.push(point); //添加最后一个点
	                            var lineStyle= {
	                                color:'#000',
	                                weight:2,
	                                fill:false,
	                                lineCap:'butt',
	                                dashArray:"5,5"
	                            };
	                            var line = L.polyline(pointList,lineStyle).addTo(map);
	                            var removeMarker = function(){
	                                layerList.forEach(function (layer) {
	                                    layer.removeFrom(map);
	                                });
	                                line.removeFrom(map);
	                                map.removeEventListener("click",removeMarker);
	                            }
	                            map.addEventListener("click",removeMarker);
	                            map.flyToBounds(pointList);
	                        },
	                        error:function(){
	
	                        }
	                    });
	                });
	                break;
	            case "group":
	                myIcon = L.icon({
	                    iconUrl:"gis/group.png",
	                    iconSize:size,
	                    iconAnchor:ancher,
	                    title:item.NAME.toString()
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/group.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38],
	                    title:item.NAME.toString()
	                });
	                marker = L.marker(point,{icon:myIcon}).addTo(map);  // 创建标注
	                marker.addEventListener("click",function(){
	                    $.ajax({
	                        url:"http://111.231.216.136:8080/rest/gisGetGroupPath",
	                        data:{"id":item.ID},
	                        dataType:"json",
	                        success:function(data){
	                            map.fire("click");  //避免前一条轨迹线未删除
	                            var layerList = [];
	                            var pointList = [];
	                            data.map(function(item,index,array){
	                                if(index == data.length-1){
	                                    return;  //不绘制最后一个点
	                                }
	                                var mypoint = [item.LATITUDE,item.LONGITUDE];
	                                var marker = L.marker(mypoint);
	
	                                var popup = setPopup(new Date(item.GATHER_TIME).Format("yyyy-MM-dd hh:mm:ss")).setLatLng(marker.getLatLng());
	                                popup.addTo(map);
	                                layerList.push(popup);
	                                layerList.push(marker);
	                                marker.addTo(map);
	                                pointList.push(mypoint);
	                            });
	                            pointList.push(point); //添加最后一个点
	                            var lineStyle= {
	                                color:'#000',
	                                weight:2,
	                                fill:false,
	                                lineCap:'butt',
	                                dashArray:"5,5"
	                            };
	                            var line = L.polyline(pointList,lineStyle);
	                            line.addTo(map);
	                            var removeMarker = function(){
	                                layerList.forEach(function (layer) {
	                                    layer.removeFrom(map);
	                                });
	                                line.removeFrom(map);
	                                map.removeEventListener("click",removeMarker);
	                            }
	                            map.addEventListener("click",removeMarker);
	                            map.flyToBounds(pointList);
	                        }
	                    });
	                });
	                break;
	            case "pubFacility":
	                myIcon = L.icon({
	                    iconUrl:"gis/pub_facility.png",
	                    iconSize:size,
	                    iconAnchor:ancher,
	                    title:item.NAME.toString()
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/pub_facility.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38],
	                    title:item.NAME.toString()
	                });
	                marker = L.marker(point,{icon:myIcon}).addTo(map);  // 创建标注
	                break;
	            case "touristShop":
	                myIcon = L.icon({
	                    iconUrl:"gis/tourist_shop.png",
	                    iconSize:size,
	                    iconAnchor:ancher,
	                    title:item.NAME.toString()
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/tourist_shop.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38],
	                    title:item.NAME.toString()
	                });
	                marker = L.marker(point,{icon:myIcon}).addTo(map);  // 创建标注
	                break;
	            case "hotel":
	                myIcon = L.icon({
	                    iconUrl:"gis/hotel.png",
	                    iconSize:size,
	                    iconAnchor:ancher,
	                    title:item.NAME.toString()
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/hotel.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38],
	                    title:item.NAME.toString()
	                });
	                marker = L.marker(point,{icon:myIcon}).addTo(map);  // 创建标注
	                break;
	            default:
	                myIcon = L.icon({
	                    iconUrl:"gis/default.png",
	                    iconSize:size,
	                    iconAnchor:ancher,
	                    title:item.NAME.toString()
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/default.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38],
	                    title:item.NAME.toString()
	                });
	                marker = L.marker(point,{icon:myIcon}).addTo(map);  // 创建标注
	        }
	        marker.bindTooltip("my tooltip text",{
	        	direction:"bottom"
	        }).openTooltip();
	        //添加至覆盖物容器
	        overlayGroup.addLayer(marker).addTo(map);
	        //点位点击时，添加该点位的popup
	        marker.addEventListener("click",function(){
	        	var popup = setPopup(item.NAME).setLatLng(marker.getLatLng());
	        	overlayGroup.addLayer(popup);
	        	popup.openOn(map);
	        })
	        marker.addEventListener("mouseover",function(){
	            marker.setIcon(hoverIcon);
	        });
	        marker.addEventListener("mouseout",function(){
	            marker.setIcon(myIcon);
	        })
	    }
		
		    /**
     *   author: meizz
     *	 用于格式化Date样式
     */
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
   