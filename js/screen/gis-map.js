			var map = new BMap.Map("dcmap");    // 创建Map实例
			map.centerAndZoom(new BMap.Point(100.212831,28.952490), 10);
			map.setMinZoom(9);	//设置地图允许的最小级别。
			map.setMaxZoom(15);	//设置地图允许的最大级别。
			map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
			//map.disableDragging();     //禁止拖拽
			//map.disableScrollWheelZoom();	//禁用滚轮放大缩小
			map.disableDoubleClickZoom();	//禁用双击放大
			map.clearOverlays();        //清除地图覆盖物
			/*稻城县轮廓绘制*/
		    var daoChengArea = "100.486914, 28.702024;100.492968, 28.702287;100.501225, 28.697012;100.527016, 28.67089;100.531065, 28.650297;100.528703, 28.635152;100.521839, 28.624503;100.526222, 28.599564;100.537043, 28.582773;100.511219, 28.557792;100.512483, 28.534418;100.494378, 28.502038;100.47687, 28.500392;100.471957, 28.489394;100.446343, 28.472521;100.446735, 28.461282;100.440013, 28.452963;100.435349, 28.44952;100.425434, 28.450815;100.420271, 28.443779;100.432889, 28.427451;100.428234, 28.414205;100.422077, 28.409643;100.430292, 28.401533;100.421886, 28.3818;100.403596, 28.364535;100.402716, 28.353424;100.392494, 28.340545;100.398579, 28.326732;100.416523, 28.321471;100.419584, 28.314073;100.417525, 28.299523;100.407847, 28.289912;100.406657, 28.282468;100.391793, 28.272829;100.380026, 28.258011;100.375605, 28.238862;100.371184, 28.235993;100.372917, 28.210738;100.385435, 28.192996;100.380115, 28.183752;100.384617, 28.175991;100.384651, 28.165279;100.380927, 28.163688;100.390691, 28.147148;100.387269, 28.140896;100.391343, 28.134485;100.389655, 28.124882;100.401493, 28.116643;100.399044, 28.101762;100.40409, 28.093886;100.402327, 28.081058;100.406744, 28.067979;100.417756, 28.062803;100.415538, 28.055247;100.423856, 28.047499;100.42024, 28.037138;100.429663, 28.023307;100.420276, 28.01366;100.411399, 28.01012;100.400609, 28.011012;100.384615, 28.021498;100.370975, 28.016643;100.349991, 28.023724;100.3425, 28.016088;100.324058, 28.018047;100.307295, 28.015515;100.299041, 28.008524;100.294107, 27.993123;100.282409, 27.977846;100.260175, 27.966489;100.251986, 27.973721;100.24453, 27.973192;100.237581, 27.977344;100.230538, 27.993495;100.196055, 27.990042;100.182952, 27.999592;100.175154, 28.0121;100.162344, 28.013736;100.153362, 28.025547;100.137564, 28.029368;100.133708, 28.03811;100.106428, 28.053168;100.081984, 28.082295;100.079315, 28.091372;100.066632, 28.088706;100.059004, 28.109582;100.049654, 28.121814;100.048392, 28.132006;100.036679, 28.138581;100.027686, 28.15081;100.029764, 28.166496;100.038905, 28.178473;100.036474, 28.186786;100.038736, 28.19022;100.055676, 28.187614;100.069329, 28.199741;100.08444, 28.188709;100.09379, 28.186442;100.105247, 28.198602;100.104258, 28.204246;100.10822, 28.207747;100.158793, 28.213868;100.175186, 28.229972;100.170268, 28.241609;100.177641, 28.24412;100.193687, 28.259646;100.174536, 28.278321;100.160192, 28.28209;100.153007, 28.294296;100.160082, 28.300023;100.174083, 28.302154;100.17799, 28.327023;100.181861, 28.330743;100.173769, 28.334709;100.16398, 28.33416;100.155414, 28.344418;100.144906, 28.345591;100.140014, 28.357206;100.105328, 28.365401;100.097173, 28.371104;100.060796, 28.376377;100.059605, 28.382504;100.071417, 28.407327;100.066259, 28.411853;100.080088, 28.431414;100.070666, 28.44011;100.06627, 28.453694;100.050645, 28.451983;100.045638, 28.457589;100.035895, 28.456278;100.029267, 28.463199;100.002788, 28.473771;99.995754, 28.482551;99.993525, 28.501807;99.987814, 28.508311;99.993533, 28.517618;99.99151, 28.532971;99.983759, 28.542046;99.975761, 28.540377;99.969732, 28.545747;99.967524, 28.567505;99.978444, 28.586706;99.988238, 28.593592;99.985581, 28.609934;100.010994, 28.62643;100.013479, 28.637676;100.0188, 28.64428;100.016343, 28.656123;100.029039, 28.661736;100.021742, 28.682749;100.028562, 28.688286;100.024031, 28.696882;100.030875, 28.700364;100.030764, 28.704724;100.023987, 28.712019;99.996157, 28.718467;99.991311, 28.737509;100.023641, 28.752201;100.034152, 28.76053;100.036479, 28.766825;100.031915, 28.777397;100.034873, 28.782482;100.049907, 28.78701;100.055161, 28.797005;100.0645, 28.796634;100.068092, 28.801283;100.076452, 28.803671;100.081174, 28.81207;100.075109, 28.835159;100.062214, 28.84399;100.053659, 28.837539;100.047329, 28.839298;100.03866, 28.835125;100.030785, 28.836577;100.029032, 28.846454;100.041314, 28.863365;100.03947, 28.877353;100.027399, 28.888027;100.026793, 28.901563;100.030764, 28.914659;100.03777, 28.922881;100.068895, 28.938768;100.069965, 28.943872;100.058974, 28.964207;100.076969, 28.977963;100.071041, 28.984861;100.072048, 28.990592;100.066082, 28.994777;100.065155, 29.001081;100.069502, 29.00581;100.061377, 29.014957;100.060984, 29.027686;100.047738, 29.041608;100.055606, 29.049394;100.054781, 29.063155;100.066759, 29.076521;100.062445, 29.106831;100.057073, 29.113396;100.061619, 29.121791;100.057793, 29.132943;100.033159, 29.15783;100.040661, 29.169923;100.038334, 29.179387;100.03099, 29.186404;100.034852, 29.195334;100.026311, 29.201863;100.013641, 29.219927;100.015616, 29.224995;100.011669, 29.234409;100.000124, 29.24659;100.001089, 29.271912;99.996675, 29.280392;99.976363, 29.290755;99.969911, 29.319083;99.956574, 29.321669;99.947502, 29.335939;99.903961, 29.322142;99.884986, 29.328074;99.887126, 29.340582;99.880211, 29.353065;99.880615, 29.36678;99.875584, 29.377457;99.876639, 29.390179;99.871542, 29.399598;99.870624, 29.426867;99.866396, 29.433295;99.869846, 29.437341;99.868705, 29.444116;99.874906, 29.450942;99.856433, 29.481491;99.860292, 29.491602;99.870619, 29.501188;99.885447, 29.52517;99.892849, 29.547539;99.892383, 29.566611;99.879984, 29.595777;99.880277, 29.602676;99.894674, 29.624253;99.883231, 29.634747;99.883098, 29.640428;99.888581, 29.64532;99.918359, 29.645794;99.9451, 29.653185;99.996789, 29.678475;100.006757, 29.692336;100.018802, 29.697338;100.028142, 29.697512;100.035092, 29.680647;100.042751, 29.671953;100.090862, 29.642562;100.092973, 29.632039;100.10744, 29.612679;100.110647, 29.596459;100.140893, 29.543045;100.148118, 29.512301;100.173497, 29.465141;100.254912, 29.347798;100.278018, 29.31738;100.295998, 29.303152;100.304016, 29.277851;100.329515, 29.262304;100.349126, 29.244245;100.38041, 29.228028;100.413454, 29.188701;100.423262, 29.165477;100.4443, 29.138422;100.457005, 29.132095;100.466782, 29.132144;100.489418, 29.13988;100.513972, 29.141997;100.52425, 29.137789;100.53559, 29.127577;100.56592, 29.080887;100.593927, 29.059587;100.603098, 29.04702;100.619821, 29.038084;100.618233, 29.032533;100.5842, 29.035508;100.559095, 29.020107;100.549673, 29.007096;100.548831, 28.996604;100.523863, 28.991977;100.526677, 28.981439;100.517682, 28.967865;100.523683, 28.959415;100.521947, 28.956585;100.526791, 28.954568;100.524976, 28.945845;100.534123, 28.938655;100.536083, 28.929562;100.541447, 28.928932;100.548851, 28.921318;100.544478, 28.913372;100.543628, 28.896171;100.546959, 28.885544;100.553927, 28.880667;100.560243, 28.868827;100.569547, 28.8362;100.581709, 28.832515;100.596807, 28.822277;100.597904, 28.81553;100.59033, 28.817721;100.585418, 28.807249;100.591044, 28.787814;100.600368, 28.781755;100.59622, 28.777957;100.599781, 28.752244;100.579529, 28.751292;100.568495, 28.756329;100.560358, 28.746785;100.544638, 28.744865;100.527568, 28.730086;100.515312, 28.713278;100.502962, 28.722078;100.484712, 28.713964;100.466187, 28.712777;100.471481, 28.704859;100.486914, 28.702024";
		    var ply = new BMap.Polygon(daoChengArea, {strokeWeight: 2, strokeColor: "rgb(80,191,237)",fillColor:"rgba(80,191,237,.1)"}); //建立多边形覆盖物
			map.addOverlay(ply);  //添加覆盖物



function createMarker(item){
	var point = new BMap.Point(item.LONGITUDE,item.LATITUDE);
	var marker = new BMap.Marker(point);
	/*悬浮显示点位信息*/
	marker.addEventListener("mouseover",function(){
		
	});
	/*点击展示点特效*/
	marker.addEventListener("click",function(){
		
	});
	/*添加点位*/
	map.addOverlay(marker);
}
