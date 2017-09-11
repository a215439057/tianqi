window.onload = function(){
    var citySelect = document.getElementById('city');
    //行政区划查询
    var opts = {
        subdistrict: 1,   //返回下一级行政区
        level: 'city',
        showbiz:false  //查询行政级别为 市
    };
    district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
    district.search('中国', function(status, result) {
        if(status=='complete'){
            getData(result.districtList[0]);
        }
    });
    function getData(data) {
        var subList = data.districtList;
        var level = data.level;
        //清空下一级别的下拉列表
        if (level === 'province') {
            nextLevel = 'city';
            citySelect.innerHTML = '';
        } 
        if (subList) {
            var contentSub =new Option('--请选择--');
            for (var i = 0, l = subList.length; i < l; i++) {
                var name = subList[i].name;
                var levelSub = subList[i].level;
                if(i==0){
                    document.querySelector('#' + levelSub).add(contentSub);
                }
                contentSub=new Option(name);
                contentSub.setAttribute("value", levelSub);
                contentSub.center = subList[i].center;
                contentSub.adcode = subList[i].adcode;
                document.querySelector('#' + levelSub).add(contentSub);
            }
        }
        
    }
    $('select#province').change(function(){
    	var option = this[this.options.selectedIndex];

        var adcode = option.adcode;
        //行政区查询
        //按照adcode进行查询可以保证数据返回的唯一性
        district.search(adcode, function(status, result) {
            if(status === 'complete'){
                getData(result.districtList[0]);
            }
        });
 	});
/**/
	var $cloa =$('#cloa');
	var $dloa =$('#dloa');
	var $sc =$('#sc');
	var $ss =$('#shousuo');
	bloa.onclick =function(){
		$dloa.css("display","block");
		$cloa.css("display","block");
		$sc.css("display","none");
	};
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
			var dl = $(this).text();
			tian(dl);
		});   
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
                var tianqic = new Array([]);
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
						for	(;i<4; i++){
								tianqic[i-0] =$("<p></p>");
								var qc = qq[i];
								$("<img/>").attr("src", qc.dayPictureUrl).appendTo(tianqic[i]);		
								tomorrow ='<p>'+ qc.date+'</p>'+'<p>'+qc.weather +'</p>'+'<p>'+qc.wind+'</p>'+'<p>'+qc.temperature+ '</p>';
								tianqic[i].append(tomorrow);											
								tqa.append('<li>'+tianqic[i].html()+'</li>');					 
							 	}	
							 	$('#scb').find('ul').html(tqa);
							 	/*天气事宜*/
								for ( ;i < titles.index.length; i++) {
							 	var tt = titles.index[i];
							 	htm = '<p>' + tt.tipt + ':' + tt.des + '</p>';
							 	tqb.append('<span>'+ htm +'</span>');							 	
							 	}
							 	$('#jt').html(tqb);						 						
						});
						$dloa.css("display","none");
						$cloa.css("display","none");	
						$sc.css("display","block");
	        		}	 		
				},
 			});
		 }		
};
