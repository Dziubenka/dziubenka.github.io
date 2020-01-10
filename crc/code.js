
reversestring=function(str) {
	var i;
	var answer;
	answer="";
	for(i=0;i<str.length;i++) {
		answer=answer+str.charAt(str.length-i-1);
		
	}
	
	return answer;
	
	
	
};





converthex=function(bin) {
	var i,answer,digit;
	answer="";
	for(i=0;i<bin.length;i=i+4) {
		digit=parseInt(bin.slice(i,i+4),2);
		answer=answer+digit.toString(16);
	}



	return answer;


};


convertbin=function(str,size) {
	var answer;
	answer="";
	
	var i,digit,bin;
	bin="";
	
	for(i=0;i<str.length;i++) {
		digit=str.charCodeAt(i);
		bin=digit.toString(2);
		while(bin.length<size) {
			bin="0"+bin;		
			
		}
		
		while(bin.length>size) {
			bin=bin.slice(1,bin.length);		
			
		}

		
		answer=answer+reversestring(bin);
		
		
	}
	
	return answer;


};





findbit=function(data) {
	var i;
	for(i=0;i<data.length;i++) {
		if(data.charAt(i)==="1") {
			return i;
		}
		
	}

	return data.length;

};

xorbin=function(a,b) {
	if(a===b) {
		return "0";
	} 
	else {
		return "1";
	}



};

xorstr=function(data,poly,begin) {

	var i,bin;
	for(i=begin;i<(begin+poly.length);i++) {
		bin=xorbin(data.charAt(i),poly.charAt(i-begin));
		data=data.slice(0,i)+bin+data.slice(i+1,data.length);
	}



	return data;


};


CRCcalc=function(str,poly,num) {
	var i;
	var line=[];
	var binarydata,binarypoly;
	var ff;
	binarydata=convertbin(str,8);	
	
	binarypoly=parseInt(poly, 16).toString(2);
	
	while(binarypoly.length<num) {
		binarypoly="0"+binarypoly;
	}
	
	

	for(i=0;i<num;i++) {
		binarydata=binarydata+"0";

	}
	
	
	ff="";
	
	for(i=0;i<num;i++) {
		ff=ff+"1";

	}
	
	

	binarypoly="1"+binarypoly;
	
	binarydata=xorstr(binarydata,ff,0);

	while(findbit(binarydata)<binarydata.length-num) {
		//console.log(binarydata);
		//console.log("_".repeat(findbit(binarydata))+binarypoly);
		binarydata=xorstr(binarydata,binarypoly,findbit(binarydata));

	}
	
	binarydata=binarydata.slice(binarydata.length-num,binarydata.length);
	binarydata=xorstr(binarydata,ff,0);
	binarydata=reversestring(binarydata);
	
	return converthex(binarydata);
	
	
};


window.onload=function() {

	document.getElementById("data0").oninput=function() {
		document.getElementById("hash0").value="";
		document.getElementById("info").innerHTML="";

	};

	document.getElementById("poly0").oninput=function() {
		document.getElementById("hash0").value="";
		document.getElementById("info").innerHTML="";

	};


	document.getElementById("run0").onclick=function() {
		document.getElementById("poly0").value=document.getElementById("poly0").value.trim();
		var check = new RegExp('^[0-9A-Fa-f]{8}$');

		
		document.getElementById("hash0").value="";
		document.getElementById("info").innerHTML="";
		
		if((document.getElementById("data0").value.length<1) || (!(check.test(document.getElementById("poly0").value)))) {
			if(document.getElementById("data0").value.length<1) {
				document.getElementById("info").innerHTML+=messagenum1;
			}
			if(!(check.test(document.getElementById("poly0").value))) {
				document.getElementById("info").innerHTML+=messagenum2;
			}
			
			
		} else {
			var data=[];
			var poly=[];
			var n=32;
			data=document.getElementById("data0").value;
			poly=document.getElementById("poly0").value;
		
		
			var result=CRCcalc(data,poly,32);
		
		
		
			document.getElementById("hash0").value=result;
		
		}
		
		
		
	};
	
	
	
	
	
	
	
};

