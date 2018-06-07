		var host = window.isLocal ? window.server : "http://support.supermap.com.cn:8090";
		var map, url = host + "/iserver/services/map-china400/rest/maps/China";
		/* 通过DOM ID初始化地图实例 ，用对象字面量进行配置 */
		map = L.map('dcmap', {
			center: [28.5590629, 100.347585],
			maxZoom: 18,
			zoom: 13,
			attributionControl: false,
			zoomControl:false,
			scrollWheelZoom: true, //鼠标滚轮缩放
			tap: false, //移动端缩放,
			doubleClickZoom: false //双击缩放,
		});
		/*SuperMap iServer 的 REST 地图服务的图层*/
		L.supermap.tiledMapLayer(url).addTo(map);
		//点位图层组
		var overlayGroup = L.layerGroup();
		map.addEventListener("dblclick",function(){
			//监测是否有图层存在
			if(overlayGroup.toGeoJSON().features.length ===0 ) return;
			toggleFade(document.getElementById("map-tooltip"),"双击时，还原图层信息")
			//双击时，恢复原图层情况
			overlayGroup.eachLayer(function(layer){
				layer.setOpacity(1);
				layer.openTooltip();
			});
		})
		/**
		 * 确保element元素的style特性，设置了visible,opacity；
		 * 其层叠样式中，包含有transition；
		 */
		function toggleFade(element,comment){
			element.style.visibility="visible";
			element.style.opacity="1";
			element.innerHTML=comment;
			setTimeout(function(){
				element.style.visibility="hidden";
				element.style.opacity="0";
			},1500);
		}
		//轨迹点图层（全局控制）
		var layerList = [];
		//调用客户端弹出窗
	    function ShowMedia(msg) {
	        jsObj.showMediaMsg(msg);
	    }
		function clickItem(element){
			//清除上次的图层
			overlayGroup.clearLayers();
			//切换图层时，删除可能存在的路径
			if(layerList.length !==0){
				layerList.forEach(function (layer) {layer.removeFrom(map);});
				layerList = [];
			}
			//请求对应类型的图层信息
			$.ajax({
	            url:"http://localhost:8080/rest/gisGetLayer",
	            dataType:"json",
	            type:"GET",
	            data:{"layer":element.dataset.layer},
	            success:function(data){
					data.map(function(item,index,arr){
						addMarker(item);
						overlayGroup.addTo(map);
						overlayGroup.eachLayer(function(layer){
							layer.openTooltip();
						});
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
	        node.style ="";
	        node.textContent=content;
	        var popup = L.popup({
	            closeButton:false,
		        autoPan:false,
		        closeOnClick:true
	        }).setContent(content);
	        return popup;
	    }
	    function setTooltip(content){
	    	var tooltip = L.tooltip({
	    		direction:"bottom",
	    		permanent:true
	    	}).setTooltipContent(content);
	    	return tooltip;
	    }
		function addMarker(item,rowIndex){
	        var point = new L.latLng(item.LATITUDE,item.LONGITUDE);
	        var myIcon = null;
	        var hoverIcon = null;
	        var marker = null;
	        var size = [42, 42];
	        var ancher = [21,38];   //图像图标与实际坐标点位置的锚准
	        var markerClickFunction = null;
	        var inside ='';
	        switch(item.LAYER)
	        {
	            case "resource":
	                myIcon = L.icon({
	                    iconUrl:"gis/scenic.png",
	                    iconSize:size,
	                    iconAnchor:ancher
	                    
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/scenic.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38]
	                    
	                });
	                marker = L.marker(point,{icon:myIcon});  // 创建标注
	               	inside =createDiv(createSpan(item.NAME),"map-detail-title")+
	       			createDiv(
	       				createDiv(createDiv(createSpan("经度","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LONGITUDE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("纬度","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LATITUDE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("类别","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.TYPE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("状态","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.STATE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("联系人","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LINKMAN,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("联系电话","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LINKPHONE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("地址","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.ADDRESS,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("分组","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.GROUP,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createSpan("简介","map-detail-icon")+createSpan("简介","map-detail-span"),"map-detail-block")+
	       				createDiv(item.INTRODUCTION,"map-detail-brief"),"map-detail-frame");
	                break;
	            case "monitor":
	                myIcon = L.icon({
	                    iconUrl:"gis/monitor.png",
	                    iconSize:size,
	                    iconAnchor:ancher
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/monitor.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38]
	                });
	                marker = L.marker(point,{icon:myIcon});  // 创建标注
	                marker.addEventListener("click",function(){
	                    //ShowMedia(item.MAIN_URL);
	                });
	               	inside =createDiv(createSpan(item.NAME),"map-detail-title")+
	       			createDiv(
	       				createDiv(createDiv(createSpan("经度","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LONGITUDE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("纬度","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LATITUDE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("类别","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.TYPE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("状态","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.STATE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("联系人","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LINKMAN,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("联系电话","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LINKPHONE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("地址","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.ADDRESS,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("分组","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.GROUP,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createSpan("简介","map-detail-icon")+createSpan("简介","map-detail-span"),"map-detail-block")+
	       				createDiv(item.INTRODUCTION,"map-detail-brief"),"map-detail-frame");
	                break;
	            case "patrol":
	                myIcon = L.icon({
	                    iconUrl:"gis/patrol.png",
	                    iconSize:size,
	                    iconAnchor:ancher
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/patrol.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38]
	                });
	                marker = L.marker(point,{icon:myIcon});  // 创建标注
	                markerClickFunction=function(){
	                    $.ajax({
	                        url:"http://localhost:8080/rest/gisGetPatrolPath",
	                        data:{"id":item.ID},
	                        dataType:"json",
	                        success:function(data){
	                            if(layerList.length !==0){
									layerList.forEach(function (layer) {layer.removeFrom(map);});
									layerList = [];
								}
	                            var pointList = [];
	                            data.map(function(item,index,array){
	                                if(index == data.length-1){
	                                    return;  //不绘制最后一个点
	                                }
	                                var mypoint = [item.LATITUDE,item.LONGITUDE];
	                                var marker = L.marker(mypoint).addTo(map);
	                                marker.bindTooltip(new Date(item.GATHER_TIME).Format("yyyy-MM-dd hh:mm:ss"),{
	                                	direction:"bottom",
	    								permanent:true
	                                }).openTooltip();
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
	                            var line = L.polyline(pointList,lineStyle);
	                            layerList.push(line);  //添加到图层数组，统一删除
	                            line.addTo(map);
	                            var removeMarker = function(){
	                                layerList.forEach(function (layer) {layer.removeFrom(map);});
	                                map.removeEventListener("click",removeMarker);
	                            }
	                            map.addEventListener("click",removeMarker);
	                            map.flyToBounds(pointList);
	                        },
	                        error:function(){
	
	                        }
	                    });
	                };
	                break;
	            case "group":
	                myIcon = L.icon({
	                    iconUrl:"gis/group.png",
	                    iconSize:size,
	                    iconAnchor:ancher
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/group.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38]
	                });
	                marker = L.marker(point,{icon:myIcon});  // 创建标注
	                markerClickFunction=function(){
	                    $.ajax({
	                        url:"http://localhost:8080/rest/gisGetGroupPath",
	                        data:{"id":item.ID},
	                        dataType:"json",
	                        success:function(data){
	                           	if(layerList.length !==0){
									layerList.forEach(function (layer) {layer.removeFrom(map);});
									layerList = [];
								}
	                            var pointList = [];
	                            data.map(function(item,index,array){
	                                if(index == data.length-1){
	                                    return;  //不绘制最后一个点
	                                }
	                                var mypoint = [item.LATITUDE,item.LONGITUDE];
	                                var marker = L.marker(mypoint);
	                                marker.bindTooltip(new Date(item.GATHER_TIME).Format("yyyy-MM-dd hh:mm:ss"),{
	                                	direction:"bottom",
	    								permanent:true
	                                }).openTooltip();
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
	                            layerList.push(line);  //添加到图层数组，统一删除
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
	                };
	                break;
	            case "pubFacility":
	                myIcon = L.icon({
	                    iconUrl:"gis/pub_facility.png",
	                    iconSize:size,
	                    iconAnchor:ancher
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/pub_facility.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38]
	                });
	                marker = L.marker(point,{icon:myIcon});  // 创建标注
	                break;
	            case "sos":
	                myIcon = L.icon({
	                    iconUrl:"gis/hotel.png",
	                    iconSize:size,
	                    iconAnchor:ancher
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/hotel.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38]
	                });
	                marker = L.marker(point,{icon:myIcon});  // 创建标注
					inside =createDiv(createSpan(item.NAME)+createSpan("报表","map-detail-chart"),"map-detail-title")+
	       			createDiv(
	       				createDiv(createDiv(createSpan("经度","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LONGITUDE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("纬度","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LATITUDE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("类别","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.TYPE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("状态","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.STATE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("联系人","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LINKMAN,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("联系电话","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.LINKPHONE,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createDiv(createSpan("地址","map-detail-span"),"map-detail-left")+
	       						  createDiv(createSpan(item.ADDRESS,"map-detail-span"),"map-detail-right"),"map-detail-block")+
	       				createDiv(createSpan("简介","map-detail-icon")+createSpan("简介","map-detail-span"),"map-detail-block")+
	       				createDiv(item.INTRODUCTION,"map-detail-brief"),"map-detail-frame")+
	       			createDiv(null,"map-detail-echarts map-detail-echarts-none");
	                break;
	            default:
	                myIcon = L.icon({
	                    iconUrl:"gis/default.png",
	                    iconSize:size,
	                    iconAnchor:ancher
	                });
	                hoverIcon = L.icon({
	                    iconUrl:"gis/default.png",
	                    iconSize:[48,48],
	                    iconAnchor:[24,38]
	                });
	                marker = L.marker(point,{icon:myIcon});  // 创建标注
	        }
	        if(markerClickFunction == null){
		        markerClickFunction = function(){

		        };
	        }
	        marker.bindTooltip(item.NAME,{
	        	direction:"bottom"
	        });
	        //添加至覆盖物容器
	        overlayGroup.addLayer(marker);
	       	
	        var html = createDiv(inside,"map-detail-outer");
	        //点位点击时，添加该点位的popup
	        marker.addEventListener("click",function(){
	        		var rootNode = document.createElement("div");
		        	var popup = L.popup({
		        		closeButton:false,
			            autoPan:false,
			            closeOnClick:true,
			            offset:[0,-12],
			            maxWidth:500
		        	}).setLatLng(marker.getLatLng()).setContent(html);
		        	popup.openOn(map);
	        		overlayGroup.eachLayer(function(layer){
		        		if(layer===marker) return;
		        		layer.setOpacity(0);  //隐藏图层信息
		        	});
		        	map.flyTo(marker.getLatLng());
		        	document.querySelector(".map-detail-chart").addEventListener('click',function(){
		        		document.querySelector(".map-detail-echarts").className = "map-detail-echarts map-detail-echarts-display";
	       				document.querySelector(".map-detail-frame").className = "map-detail-frame map-detail-echarts-none";
	       				var echart = echarts.init(document.querySelector(".map-detail-echarts"));
	       				option = {
							color:['#4287ff','#61ceff','#a0bdee','#f29e87','#eaca47','#e7b068','#efd784'],
						    xAxis: {
						        type: 'category',
						        data: ['一级预警', '二级预警', '三级预警', '四级预警']
						    },
						    yAxis: {
						        type: 'value'
						    },
						    series: [{
						        data: [120, 200, 150, 80],
						        type: 'bar'
						    }]
						};
						echart.setOption(option);
		       		});
	        });
	        marker.addEventListener("mouseover",function(){
	            marker.setIcon(hoverIcon);
	        });
	        marker.addEventListener("mouseout",function(){
	            marker.setIcon(myIcon);
	        });
	    }
		function createSpan(content,className){
	        var html = "<span";
	        if(arguments.length == 2)
	        {
	            html +=" class='"+className+"'";
	        }
	        html += ">";
	        if(content === null || content === undefined)
	        {
	            content = "";
	        }
	        html += content + "</span>";
	        return html;
	    }
	function createDiv(content,className){
        var html = "<div";
        if(arguments.length == 2)
        {
            html +=" class='"+className+"'";
        }
        html += ">";
        if(content === null || content === undefined)
        {
            content = " ";
        }
        html += content + "</div>";
        return html;
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
   