			/* 
			 *  配置项设置
			*/
			var appConfig = {};
			//通用线条样式
			appConfig.lineStyle = {color:'rgba(0,117,169,1)'};
			//通用字体颜色
			appConfig.textColor = '#5bdeff';
			//通用面积颜色
			appConfig.areaColor = [];
			//通用颜色数组
			appConfig.color = ['green','yellow','red'];
			//通用透明背景颜色
			appConfig.backgroundColor = 'rgba(0,117,169,0.7)';
			//通用边框颜色
			appConfig.borderColor = '#49d9fe';
			//雷达半径
			appConfig.radarRadius = '50%';
			
			/*
			 *    通用标题样式设置
			 */
			appConfig.titleStyle = {
				'padding':[5,10,5,10],
				'left':20,
				'top':20,
				'textStyle':{
					'fontSize':12,
					'color':appConfig.textColor
				}
			};
			

			
			
			//通用雷达指示器设置
			appConfig.setIndicator = function(arr)
			{
				var data = [];
				arr.forEach(function(element)
					{
						data.push({
							name:element,
							color:appConfig.textColor,
							max:1000,
							min:0
						});
					}
				);
				return data;
			}
			//通用图例数据设置
			appConfig.legendData = [];
			//通用坐标系数据设置
			appConfig.data = [];
			