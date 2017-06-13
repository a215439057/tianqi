window.onload = function(){
	var $flo =$('#flo');
	var $bloa =$('#bloa');
	var $cloa =$('#cloa');
	var $dloa =$('#dloa');
	var $city =$('#city');
	var $sc =$('#sc');
	var $ss =$('#shousuo');
	bloa.onclick =function(){
		$dloa.css("display","block");
		$cloa.css("display","block");
		$sc.css("display","none");
	}
	$ss.click(function(){
		var $city =$('#city option:selected');
		var city = $city.text();
		switch (city){
			case "":
					alert("请输入城市");
					break;
			case "北京市市辖区":
					city = "北京市";
					tian(city);
					break;		
			case "上海市市辖区":
					city = "上海市";
					tian(city);
					break;
			default:
                    tian(city);
                    break;		
		}
	});
	$dloa.find('div').each(function(k,v){
		$(v).click(function(){
			var dl = $(this).text()
			tian(dl);
		})   
	});
	/*AJAX*/
	function tian(dizhi){
		var ur= "https://jirenguapi.applinzi.com/weather.php?city="+dizhi;
			$.ajax({
		 		type : "GET",
	        	url : ur,
	        	dataType : "jsonp",
	        	async:"true",
	        	success : function (data){ 
	        		if (data.error =="-3") {
	        		alert("抱歉，并无该城市信息");
	        		}
	        		else{
	        			var tianqia = $("<p></p>");
	        			var tianqib = $("<p></p>");
	        			var tianqic=new Array();
	        			var tianqid = $("<p></p>"); 
	        			var tianqi = $("<p></p>"); 
	        			var tqa =$("<p></p>"); 
	        			var tqb =$("<p></p>"); 
	        			tim='<p>'+data.date+'</p>';	
						$.each(data.results, function(i,titles){
							di=titles.currentCity;
							tianqia.append(di);
							tianqia.append(tim);
							$('#di').html(tianqia);	
							var qq=titles.weather_data;
							$("<img/>").attr("src",qq[0].dayPictureUrl).appendTo(tianqib);
							if (qq[0].weather.indexOf('晴')!=-1) {
								$('#sc').css("background","url(images/b1.png)");
								$('#sc').css("color","#000");
							}
							else{
								$('#sc').css("background","url(images/b2.png)");
								$('#sc').css("color","#fff");
							}
							$('#sc').css("background-size","100% 100%");
							day='<p>'+ qq[0].date+":"+qq[0].weather +'</p>'+'<p>'+qq[0].wind+"。"+"气温:"+qq[0].temperature+ '</p>';
							tianqib.append(day);
							tianqib.append("PM指数:"+titles.pm25);	
							$('#mai').html(tianqib);
							/*未来天气*/
						for	(var i=1;i<4; i++){
								tianqic[i-0] =$("<p></p>");
								var qc = qq[i];
								$("<img/>").attr("src", qc.dayPictureUrl).appendTo(tianqic[i]);		
								tomorrow ='<p>'+ qc.date+'</p>'+'<p>'+qc.weather +'</p>'+'<p>'+qc.wind+'</p>'+'<p>'+qc.temperature+ '</p>';
								tianqic[i].append(tomorrow);											
								tqa.append('<li>'+tianqic[i].html()+'</li>');					 
							 	}	
							 	$('#scb').find('ul').html(tqa);
							 	/*天气事宜*/
								for (var i = 0; i < titles.index.length; i++) {
							 	var tt = titles.index[i];
							 	htm = '<p>' + tt.tipt + ':' + tt.des + '</p>';
							 	tqb.append('<span>'+ htm +'</span>');							 	
							 	}
							 	$('#jt').html(tqb)						 						
						});
						$dloa.css("display","none");
						$cloa.css("display","none");	
						$sc.css("display","block");
	        		}
		 		
				},
 			})
		 }		
}
