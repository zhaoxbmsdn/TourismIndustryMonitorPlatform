			/**
			 * echarts实例
			 */
			//新闻影响力
			var newsInfluence = echarts.init(document.getElementById("newsMain"));	
			//公众舆论
			var publicOpinion = echarts.init(document.getElementById("publicMain"));
			//售票情况
			var ticketSales = echarts.init(document.getElementById("ticketMain"));
			//游客流量
			var touristFlow = echarts.init(document.getElementById("touristMain"));
			//自驾游
			var carFlow = echarts.init(document.getElementById("carMain"));
			//旅游资源区域分布
			var tourism = echarts.init(document.getElementById("tourismMain"));
			
			//通用配置项
			var raderColor = ['#00d9f1','#f6cac0','#99f5c0'];   //数据面积区域填充颜色数组
			var raderFrameLineColor = 'rgb(37,85,135)';         //雷达图直径线和分割线颜色
			var raderLegendRadius = 5;//雷达图图例大小
			
			var pieColor = ['#4287ff','#61ceff','#56fbff','#c791aa','#f3d4cd'];
			/* 
			 *  测试数据
			 */
			var dData = [];
			dData.push(['新浪',{'阅读数':600,'点赞数':200,'转发量':200}]);
			dData.push(['腾讯',{'阅读数':300,'点赞数':800,'转发量':300}]);
			dData.push(['电商',{'阅读数':600,'点赞数':1000,'转发量':700}]);		
			function setRadarData(arr){
				var d = [];
				arr.forEach(function(item,index,array){
					d.push({
						'name':item[0],
						'value':(function(){
							var a =[];
							for(var i in item[1])
							{
								a.push(item[1][i]);
							}
							return a;
						})(),
						'lineStyle':{
								'normal':{
								'color':raderColor[index],
								'opacity':0.1   //弱化边界线的存在
							}
						},
						'areaStyle':{
							'normal':{
								'color':raderColor[index],
								'opacity':0.4
							}
						}
					});
				});
				return d;
			}
			
			var setIndicator = function(arr)
			{
				var data = [];
				arr.forEach(function(element)
					{
						data.push({
							name:element,
							color:'#eee',
							max:1000,
							min:0
						});
					}
				);
				return data;
			}
			/*
			 * 绘制框架,构造一个原型的雷达图，拥有三个维度（新闻条数、阅读数及转发量）
			 */
			var newsInfluenceOption = {
				color:['#00d9f1','#f6cac0','#99f5c0'],
				//雷达坐标系
				radar:{
					center:['50%','50%'],
					radius:'85%',
					shape:'circle',
					splitNumber:5,
					nameGap:4,
					//刻度线，直径线
					axisLine:{
						show:true,
						lineStyle:{
							color:raderFrameLineColor,
							opacity: 0.5,
							width:1
						}
					},
					axisLabel:{
						show:false,
						inside:true,
						textStyle:{
							color: '#eee',
	                        fontSize:8
						}
					},
					axisTick:{
						show:false
					},
					//分割线，圆形线
					splitLine:{
						show:true,
						lineStyle:{
							//分割线的颜色
							color:raderFrameLineColor,
							shadowOffsetX: 0,
		                    shadowOffsetY: 0,
		                    shadowColor: '#00a7e6',
		                    shadowBlur:10,
							width:1,
							opacity: 0.7,
						}
					},
					splitArea:{
						show:true,
						//填充区域的颜色
						areaStyle: {
		                    color: ['rgb(10,34,61)']
		                }
					},
					indicator:setIndicator(['点赞量','阅读量','转发量'])
				},
				//图例
				legend:{
					show:true,
					type:'plain',
					right:'5%',
					bottom:'5%',
					orient:'vertical',
					textStyle:{color:'white'},
					icon:'circle',
					itemWidth:raderLegendRadius,
					itemHeight:raderLegendRadius,
					data:dData.map(function(item,index,array){
						return item[0]
					}),

				},
				//系列
				series:[
				{
					name:'radarData',
					type:'radar',
					symbol:'none',
					data:setRadarData(dData)
				}]
			};
			newsInfluence.setOption(newsInfluenceOption);
			
			
			/**
			 * 舆论测试数据
			 */
			//类目轴数据
			var xData = ['正面','中性','负面'];
			//值数据
			var dData = [];
			
			/*
			 *   Data 示例:
			 * 	 [
			 * 		['正面',200],
			 * 		['中性',200],
			 * 		['负面',200]
			 *   ]
			 */
			var Data = [];
			
			function selectFrom(lowerValue,upperValue)
			{
				var choices = upperValue - lowerValue + 1;
				return Math.floor(Math.random() * choices + lowerValue);
			}
			
			for(var i = 0;i<3;i++)
			{
				Data.push([xData[i],selectFrom(100,500)]);
			}
			
			function createComparisonFunction(propertyName)
			{
				return function(obj1,obj2){
					var value1 = obj1[propertyName];
					var value2 = obj2[propertyName];
					
					if(value1 > value2)
					{
						return -1;
					}
					else if(value1 < value2)
					{
						return 1;
					}
					else{
						return 0;
					}
				}
			}
			
			Data.sort(createComparisonFunction(1));
			
			var publicOpinionOption = {
				grid:{
					show:false,
					top:'15%',
					left:'15%',
					right:'15%',
					bottom:'15%'
				},
				color:raderColor,
				xAxis:{
					show:true,
					type:'category',
					axisLabel:{
						show:true,
						textStyle:{
							color:'white'
						}
					},
					axisTick:{
						show:false
					},
					axisLine:{
						show:false
					},
					splitLine:{
						show:false
					},
					data:Data.map(function(item,index,array){
						return  item[0];
					})
				},
				yAxis:{
					shwo:true,
					type:'value',
					splitNumber:2,
					axisLine:{
						show:false
					},
					axisLabel:{
						show:true,
						textStyle:{
							color:'#eee'
						}
					},
					axisTick:{
						show:false
					},
					splitLine:{
						show:true,
						lineStyle:{
							color:'#204587',
							opacity:0.7
						}
					}
				},
				series:[
					{
						name:'OpinionBar',
						type:'bar',
						barWidth:'20%',
						itemStyle:{
							normal:{
								barBorderRadius:80
							}
						},
						label:{
							normal:{
								show:false,
								formatter:'{b}'
							}
						},
						data:Data.map(function(item,index,array){
							return {
									'name':item[0],
									'value':item[1],
									'itemStyle':{
										'normal':{
											'color':raderColor[index]
										}
									}
							};
						})
					}
				]
			}
			publicOpinion.setOption(publicOpinionOption);
			
	
			/**
			 * 售票测试数据
			 */
			/*
			 *   Ddata格式
			 * 	[
			 * 		['2017-10-1',[{name:online,value:0},{name:offline,value:3000}]],
			 * 		['2017-10-2',[~]],
			 *  ]
			 */
			
			var now = +new Date();
			var oneDay = 24 * 60 * 60 * 1000;
			
			function selectFrom(lowerValue,upperValue)
			{
				var choices = upperValue - lowerValue + 1;
				return Math.floor(Math.random() * choices + lowerValue);
			}
			
			function createObj(name){
				var obj = new Object();
				obj.name = name;
				obj.value = selectFrom(100,1000);
				obj.toString = function(){
					return "name: "+this.name+",value: "+this.value;
				}
				return obj;
			}
			
			var originalData = [];
			
			for(var i = 0; i< 100; i++)
			{
					var tday = new Date(now+=oneDay);
					var cday = [tday.getFullYear(),tday.getMonth()+1,tday.getDate()].join("-");
					originalData.push([cday,[createObj("OTA"),createObj("电商"),createObj("线下"),createObj("其他")]]);
			}
			var ticketSalesOption = {
				legend: {
				    orient: 'horizontal',
				    right: '2%',
				    bottom:'2%',
				    textStyle:{
				    	color:'white'
				    },
				    itemWidth:10,
				    itemHeight:10
				},
				color:pieColor,
				series:[
					{
						name:'ticketSales',
						type:'pie',
						radius:'75%',
						center:['50%','43%'],
						cursor:'pointer',
						hoverAnimation:false,
						label:{
							normal:{
								formatter:'{c}',
								symbol:'cicle',
								color:'#eee',
								fontSize:12,
								position:'outside'
							}
						},
						labelLine:{
							normal:{
								length:5,
								length2:25,
								smooth:0.1
							}
						},
						markLine:{
							symbol:['none','circle']
						}
					}
				]
				
			};
			
			ticketSales.setOption(ticketSalesOption);
			ticketSales.setOption({
				legend:{
					data:originalData[0][1].map(function(item,index,array){return item.name;})
				},
				series:[
				{
					data:originalData[0][1]
				}
				]}
			);
			
			var start = +new Date(2017,11,1);
			var oneDay = 24*60*60*1000;
			
			function selectFrom(lowerValue,upperValue)
			{
				var choices = upperValue - lowerValue+1;
				return Math.floor(Math.random()*choices+lowerValue);
			}
			
			/*
			 * data 格式
			 * [
			 * 		[2017-10-1,200],
			 * 		[2017-10-2,300],
			 * 		[2017-10-3,200]
			 * ]
			 */
			function manualData(){
				var data = [];
				var i = 0;
				for(i;i<100;i++)
				{
					var now = new Date(start += oneDay);
					data.push([[now.getFullYear(),now.getMonth()+1,now.getDate()].join("-"),selectFrom(100,500)]);
				}
				return data;
			}
			var eData = manualData();
			console.log(eData);
			var date = [];
			var dat = []
			eData.forEach(function(item)
			{
				date.push(item[0]);
				dat.push(item[1]);
			});		
			
			var touristFlowOption = {
				titile:{
					show:false
				},
				grid:{
					show:false,
					cursor:'pointer',
					top:'10%',
					bottom:'15%',
					left:'10%',
					right:'5%'
				},
				textStyle:{
					color:'white'
				},
				backgroundColor:'transparent',
				dataZoom: [
					{
					/*
					 *   内置型数据漫游
					 */
			        type: 'inside',
			        start: 90,
			        end: 100
				    }
				],
				xAxis:{
					show:true,
					type:'category',
					axisTick:{
						show:false
					},
					axisLine:{
						show:false
					},
					data:date
				},
				yAxis:{
					show:true,
					type:'value',
					splitNumber:3,
					axisLine:{
						show:false
					},
					axisTick:{
						show:false
					},
					splitLine:{
						show:true,
						lineStyle:{
							opacity:0.2
						}
					}
				},
				series:[
					{
						name:'areaLine',
						type:'line',
						data:dat,
						smooth:true,
						symbol:'circle',
						showSymbol:false,
						lineStyle:{
							normal:{
								color:'#00ffff',
								opacity:1
							}
						},
						areaStyle:{
							normal:{
								color:{
									type: 'linear',
								    x: 0,
								    y: 0,
								    x2: 0,
								    y2: 1,
								    colorStops: [
								    	{
								        	offset: 1, color: 'rgba(80,191,237,0.15)' // 100% 处的颜色  下部颜色
								    	}, 

								    		{
								        	offset: 0, color: '#00ffff ' // 0% 处的颜色 上部颜色
								    	}
								    ],
								    globalCoord: false // 缺省为 false
								},
								cursor:'pointer',
								opacity:0.73
							}
						}
					}
				]
				
			};
			touristFlow.setOption(touristFlowOption);
	
		carFlowOption = {
		    title : {
					show:false
		    },
		    tooltip : {
		        trigger: 'item'
		    },
		    visualMap: {
		    	type:'continuous',
		        min: 0,
		        max: 1000,
		        left: '5%',
		        bottom:'15%',
		        itemWidth:10,
		        itemHeight:80, 
		        textStyle:{
		        	color:'#eee'
		        },
		        inRange:{
		        	color:['#93fbde','#3d80ee']
		        },
		        calculable : false
		    },
		    series : [
		        {
		            name: '自驾游车辆数',
		            type: 'map',
		            mapType: 'china',
		            roam: false,
		            aspectScale:0.9,  //地图长宽比
		            zoom:1.2,
		            label: {
		            	normal:{
		            		show: false
		            	},
		            	emphasis:{
		            		show:true,
		            		color:'#eee'
		            	}
		                
		            },
		    		itemStyle:{
		            	normal:{
		            		borderColor:'gray'
		            	},
		            	emphasis:{
		            		areaColor:'rgba(80,191,237,0.1)',
		            	}
		            },
		            markPoint:{
		            	symbol: 'path://M774.4 360.533333c0 140.8-253.866667 569.6-253.866667 569.6s-253.866667-428.8-253.866666-569.6 113.066667-253.866667 253.866666-253.866666 253.866667 113.066667 253.866667 253.866666z',
		            	symbolSize:10,
		            	symbolKeepAspect:true,
		            	label:{
		            		normal:{
		            			show:false,
		            			fontSize:'9'
		            		}
		            	},
		            	itemStyle:{
		            		normal:{
		            			color:'#eee'
		            		}
		            	},
		            	data:[{
		            		name:'稻城亚丁',
		            		coord:[100.3158,28.5383]
		            	}
		            	]
		            },
		            data:[
		                {name: '北京',value: 1000},
		                {name: '天津',value: Math.round(Math.random()*1000)},
		                {name: '上海',value: Math.round(Math.random()*1000)},
		                {name: '重庆',value: Math.round(Math.random()*1000)},
		                {name: '河北',value: 900},
		                {name: '河南',value: 1000},
		                {name: '云南',value: Math.round(Math.random()*1000)},
		                {name: '辽宁',value: 1000},
		                {name: '黑龙江',value: Math.round(Math.random()*1000)},
		                {name: '湖南',value: Math.round(Math.random()*1000)},
		                {name: '安徽',value: Math.round(Math.random()*1000)},
		                {name: '山东',value: Math.round(Math.random()*1000)},
		                {name: '新疆',value: Math.round(Math.random()*1000)},
		                {name: '江苏',value: Math.round(Math.random()*1000)},
		                {name: '浙江',value: Math.round(Math.random()*1000)},
		                {name: '江西',value: Math.round(Math.random()*1000)},
		                {name: '湖北',value: Math.round(Math.random()*1000)},
		                {name: '广西',value: Math.round(Math.random()*1000)},
		                {name: '甘肃',value: Math.round(Math.random()*1000)},
		                {name: '山西',value: Math.round(Math.random()*1000)},
		                {name: '内蒙古',value: Math.round(Math.random()*1000)},
		                {name: '陕西',value: Math.round(Math.random()*1000)},
		                {name: '吉林',value: Math.round(Math.random()*1000)},
		                {name: '福建',value: Math.round(Math.random()*1000)},
		                {name: '贵州',value: Math.round(Math.random()*1000)},
		                {name: '广东',value: Math.round(Math.random()*1000)},
		                {name: '青海',value: Math.round(Math.random()*1000)},
		                {name: '西藏',value: Math.round(Math.random()*1000)},
		                {name: '四川',value: Math.round(Math.random()*1000)},
		                {name: '宁夏',value: Math.round(Math.random()*1000)},
		                {name: '海南',value: Math.round(Math.random()*1000)},
		                {name: '台湾',value: Math.round(Math.random()*1000)},
		                {name: '香港',value: Math.round(Math.random()*1000)},
		                {name: '澳门',value: Math.round(Math.random()*1000)}
		            ]
		        }
		    ]
};
		carFlow.setOption(carFlowOption);
		

		tourismOption = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    color:['#4287ff','#61ceff','#a0bdee','#f29e87','#eaca47','#e7b068','#efd784'],
		    textStyle:{
		    	color:'#eee'
		    },
		    legend: {
		    	top:0,
		    	right:'5%',
		    	icon:'circle',
		    	itemWidth:5,
		    	itemHeight:5,	
			    textStyle:{
			    	color:'#eee'
			    },
		        data: ['吃', '住','行','游','购','娱','厕']
		    },
		    grid: {
		    	show:false,
		    	top:30,
		        left: '3%',
		        right: '5	%',
		        bottom: '1%',
		        containLabel: true
		    },
		    xAxis:  {
		        type: 'value',
		        axisLabel:{
		        	show:true,
		        	margin:0
		        },
		        axisLine:{
		        	show:false
		        },
		        axisTick:{
		        	show:false
		        },
		        splitLine:{
		        	show:false
		        }
		    },
		    yAxis: {
		        type: 'category',
		       	axisLine:{
		        	show:false
		        },
		        axisTick:{
		        	show:false
		        },
		        data: ['金珠镇','香格里拉镇','桑堆乡','省母乡','傍河乡','色拉乡','巨龙乡','邓波乡','木拉乡','赤土乡','蒙自乡','各卡乡','吉呷乡','俄牙同乡']
		    },
		    series: [
		        {
		            name: '吃',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: false,
		                    position: 'insideRight'
		                }
		            },
		            data: [320, 302, 301, 334, 390, 330, 320,320, 302, 301, 334, 390, 330, 320]
		        },
		        {
		            name: '住',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: false,
		                    position: 'insideRight'
		                }
		            },
		            data: [120, 132, 101, 134, 90, 230, 210,20, 132, 101, 134, 90, 230, 210]
		        },
		        {
		            name: '行',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: false,
		                    position: 'insideRight'
		                }
		            },
		            data: [220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310]
		        },
		        {
		            name: '游',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: false,
		                    position: 'insideRight'
		                }
		            },
		            data: [150, 212, 201, 154, 190, 330, 410,150, 212, 201, 154, 190, 330, 410]
		        },
		        {
		            name: '购',
		            type: 'bar',
		            stack: '总量',
		            barCategoryGap:'40%',
		            label: {
		                normal: {
		                    show: false,
		                    position: 'insideRight'
		                }
		            },
		            data: [80, 82, 91, 94, 120, 130, 130,80, 82, 91, 94, 190, 130, 120]
		        },
		        		        {
		            name: '厕',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: false,
		                    position: 'insideRight'
		                }
		            },
		            data: [50, 22, 21, 54, 10, 30, 40,10, 12, 21, 54, 10, 30, 40]
		        },
		        {
		            name: '娱',
		            type: 'bar',
		            stack: '总量',
		            barCategoryGap:'40%',
		            label: {
		                normal: {
		                    show: false,
		                    position: 'insideRight'
		                }
		            },
		            data: [20, 82, 19, 34, 90, 30, 20,20, 32, 17, 34, 10, 30, 20]
		        }
		    ]
		};
		tourism.setOption(tourismOption);
