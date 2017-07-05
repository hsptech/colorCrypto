$(function() {
	var canvas=document.querySelector("#colorSchema");
	var ctx=canvas.getContext("2d");
	var comboGreyArray=[];
	var pixelSizeX=50;
	var pixelSizeY=50;
	var key=[155,100,50,155,180,50,55,100,50,155,100,200,155,67,50,195,170,50,55,190,90,105,170,80,155,10,50,225,190,50,155,100,67,195,109,50,90,100,50,79,100,80,70,10,50,56,100,225,105,123,120,195,190,90,15,200,50,105,108,50,55,190,55,255,10,50,155,124,50,155,100,138,155,100,234,67,76,50,48,98,209];
	for (var i = 0,j=0 ; i < (key.length)/3; i++,j=j+3) {
		comboGreyArray[i]=[key[j],key[j+1],key[j+2]];
	}
	console.log(comboGreyArray);
	var listAllowed=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];
	var getTheLetter=function(letter){
		var resultedLetter=listAllowed[letter];
		return resultedLetter;
	}
	var greyScaleToLetter=function(data) {
		for (var i = 0; i < comboGreyArray.length; i++) {
			if ((data[0]==comboGreyArray[i][0]) && data[1]==comboGreyArray[i][1] && data[2]==comboGreyArray[i][2]) {
				console.log(i);
				return getTheLetter(i);
			}
		}
	}
	function letterToGreyScale(parameter){
		var letterA=[155,100,50,255];var letterB=[155,180,50,255];var letterC=[55,100,50,255];var letterD=[155,100,200,255];var letterE=[155,67,50,255];var letterF=[195,170,50,255];var letterG=[55,190,90,255];var letterH=[105,170,80,255];var letterI=[155,10,50,255];var letterJ=[225,190,50,255];var letterK=[155,100,67,255];var letterL=[195,109,50,255];var letterM=[90,100,50,255];var letterN=[79,100,80,255];var letterO=[70,10,50,255];var letterP=[56,100,225,255];var letterQ=[105,123,120,255];var letterR=[195,190,90,255];var letterS=[15,200,50,255];var letterT=[105,108,50,255];var letterU=[55,190,55,255];var letterV=[255,10,50,255];var letterW=[155,124,50,255];var letterX=[155,100,138,255];var letterY=[155,100,234,255];var letterZ=[67,76,50,255];var space=[48,98,209,255];
		if (parameter==='a') {
			return letterA;
		};if (parameter==='b') {
			return letterB;
		};if (parameter==='c') {
			return letterC;
		};if (parameter==='d') {
			return letterD;
		};if (parameter==='e') {
			return letterE;
		};if (parameter==='f') {
			return letterF;
		};if (parameter==='g') {
			return letterG;
		};if (parameter==='h') {
			return letterH;
		};if (parameter==='i') {
			return letterI;
		};if (parameter==='j') {
			return letterJ;
		};if (parameter==='k') {
			return letterK;
		};if (parameter==='l') {
			return letterL;
		};if (parameter==='m') {
			return letterM;
		};if (parameter==='n') {
			return letterN;
		};if (parameter==='o') {
			return letterO;
		};if (parameter==='p') {
			return letterP;
		};if (parameter==='q') {
			return letterQ;
		};if (parameter==='r') {
			return letterR;
		};if (parameter==='s') {
			return letterS;
		};if (parameter==='t') {
			return letterT;
		};if (parameter==='u') {
			return letterU;
		};if (parameter==='v') {
			return letterV;
		};if (parameter==='w') {
			return letterW;
		};if (parameter==='x') {
			return letterX;
		};if (parameter==='y') {
			return letterY;
		};if (parameter==='z') {
			return letterZ;
		};if(parameter===' '){
			return space;
		}

	};
	$('#textSubmit').click(function() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		var text=$('#textInput').val();
		console.log(text);
		var splitText=text.split('');
		console.log(splitText);
		var pixelPositionX=0;
		var pixelPositionY=0;
		for (var i = 0; i <splitText.length; i++) {
			var greyCode=letterToGreyScale(splitText[i]);
			console.log(greyCode);
			ctx.fillStyle='rgb('+greyCode[0]+','+greyCode[1]+','+greyCode[2]+')';
			ctx.fillRect(pixelPositionX,pixelPositionY,pixelSizeX,pixelSizeY);
			pixelPositionX+=pixelSizeX;
			if (pixelPositionX==(canvas.width)) {
				pixelPositionX=0;
				pixelPositionY=pixelPositionY+pixelSizeY;
			}
		};

		
	});

    function redrawMeme(image) {
      // Get Canvas2DContext
      var canvas1 = document.querySelector('#hiddenImage');
      var ctx1 = canvas1.getContext("2d");
      ctx1.drawImage(image,0,0,300,300);
    }
	$('#file').change(function(){
		console.log('hi');
		var file = event.target.files[0];
		console.log(file);
		var reader = new FileReader();
      	reader.onload = function(fileObject) {
	        var data = fileObject.target.result;
	        console.log(fileObject.target.result);
	        // Create an image object
	        var image = new Image();
	        image.onload = function() {
	          
	          window.imageSrc = this;
	          redrawMeme(window.imageSrc);
	        }
	        
	        // Set image data to background image.
	        image.src = data;
      	};
      	reader.readAsDataURL(file);
	});
	var jumpDataTo=0;
	$('#decrypt').click(function() {
		var canvas1 = document.querySelector('#hiddenImage');
      	var ctx1 = canvas1.getContext("2d");
		var myImageData = ctx1.getImageData(0,0,canvas1.width, canvas1.height);
      	var data=myImageData.data;
      	console.log(data);
      	var endOutput="";
      	var borderHitTime=1;
      	console.log("length of data is"+data.length);
      	for (var i = 0,x=0,y=0,z=1 ; (i < data.length && data[i]!=0) ; i=x+y) {
      		var eachLetterArray=[];
      		eachLetterArray.push(data[i]);   
      		eachLetterArray.push(data[i+1]);
      		eachLetterArray.push(data[i+2]);
      		//eachLetterArray.push(data[i+3]);
      		console.log(eachLetterArray);
      		var eachLetter=greyScaleToLetter(eachLetterArray);
      		endOutput=endOutput+eachLetter;
      		console.log("vaue of i is"+i);
      		if ((i+pixelSizeX*4)%(canvas.width*4)==0) {
      			console.log("in if loop for jumpstart");
				y=(i+pixelSizeX*4)+(pixelSizeY*(canvas.width*4));
				//borderHitTime=borderHitTime+1;
				//z=pixelSizeY;
				x=0;
			}
			else{
				x=i+pixelSizeX*4;
				y=0;
			}

      	}
      	console.log(endOutput);


	});
});