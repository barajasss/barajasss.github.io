
new Vue({
	el: "#converter-app",
	data: {
		input1: '',
		input2: '',
		system1: 'decimal',
		system2: 'binary',
		numberSystems: ['binary', 'octal', 'decimal', 'hexadecimal'],
		numberSystemPosition1: '2',
		numberSystemPosition2: '0'
	},
	methods: {
		updateInput: function(e){
			switch(e.input){
				case "one": this.input1 = e.data;
							this.input2 = this.input2FromInput1(this.input1);
							break;
				case "two": this.input2 = e.data;
							this.input1 = this.input1FromInput2(this.input2);
							break;
			}
		},
		updateNumberSystem: function(e){
			switch(e.inputPosition){
				case "first": 	if(e.dir == 'prev'){
									this.movePrev1();
									if(this.numberSystemPosition1 == this.numberSystemPosition2)
										this.movePrev1();
								}
								else if(e.dir == 'next'){
									this.moveNext1();
									if(this.numberSystemPosition1 == this.numberSystemPosition2)
										this.moveNext1();
								}
								this.system1 = this.numberSystems[this.numberSystemPosition1];
								this.input1 = this.input2 = '';
								break;
				case "second": 	if(e.dir == 'prev'){
									this.movePrev2();
									if(this.numberSystemPosition1 == this.numberSystemPosition2)
										this.movePrev2();
								}
								else if(e.dir == 'next'){
									this.moveNext2();
									if(this.numberSystemPosition1 == this.numberSystemPosition2)
										this.moveNext2();
								}
								this.system2 = this.numberSystems[this.numberSystemPosition2];
								this.input1 = this.input2 = '';
								break;
			}
		},
		movePrev1: function(){
			if(this.numberSystemPosition1 > 0 ){
				this.numberSystemPosition1--;
			}
			else{
				this.numberSystemPosition1 = this.numberSystems.length-1;
			}
		},
		moveNext1: function(){
			if(this.numberSystemPosition1 < this.numberSystems.length-1){
				this.numberSystemPosition1++;
			}
			else{
				this.numberSystemPosition1 = 0;
			}
		},
		movePrev2: function(){
			if(this.numberSystemPosition2 > 0 ){
				this.numberSystemPosition2--;
			}
			else{
				this.numberSystemPosition2 = this.numberSystems.length-1;
			}
		},
		moveNext2: function(){
			if(this.numberSystemPosition2 < this.numberSystems.length-1){
				this.numberSystemPosition2++;
			}
			else{
				this.numberSystemPosition2 = 0;
			}
		},
		input2FromInput1: function(val){
			//binary conversions
			if(this.system1 == 'binary' && this.system2 == 'binary'){
				return this.input1;
			}
			else if(this.system1 == 'binary' && this.system2 == 'octal'){
				var octal = binaryToOctal(val);
				return octal;
			}
			else if(this.system1 == 'binary' && this.system2 == 'decimal'){
				var dec = binaryToDecimal(val);
				return dec;
			}
			else if(this.system1=='binary' && this.system2=='hexadecimal'){
				var hex = binaryToHexadecimal(val);
				return hex;
			}
			//octal conversions
			else if(this.system1 == 'octal' && this.system2 == 'binary'){
				var bin = octalToBinary(val);
				return bin;
			}
			else if(this.system1 == 'octal' && this.system2 == 'octal'){
				return this.input1;
			}
			else if(this.system1 == 'octal' && this.system2 == 'decimal'){
				var decimal = octalToDecimal(val);
				return decimal;
			}
			else if(this.system1 == 'octal' && this.system2 == 'hexadecimal'){
				var hex = octalToHexadecimal(val);
				return hex;
			}
			//decimal conversions
			else if(this.system1 == 'decimal' && this.system2 == 'binary'){
				var bin = decimalToBinary(val);
				return bin;
			}
			else if(this.system1 == 'decimal' && this.system2 == 'octal'){
				var octal = decimalToOctal(val);
				return octal;
			}
			else if(this.system1 == 'decimal' && this.system2 == 'decimal'){
				return this.input1;
			}
			else if(this.system1 == 'decimal' && this.system2 == 'hexadecimal'){
				var hex = decimalToHexadecimal(val);
				return hex;
			}
			//hexadecimal conversions
			else if(this.system1 == 'hexadecimal' && this.system2 == 'binary'){
				var bin = hexadecimalToBinary(val);
				return bin;
			}
			else if(this.system1 == 'hexadecimal' && this.system2 == 'octal'){
				var octal = hexadecimalToOctal(val);
				return octal;
			}
			else if(this.system1 == 'hexadecimal' && this.system2 == 'decimal'){
				var dec = hexadecimalToDecimal(val);
				return dec;
			}
			else if(this.system1 == 'hexadecimal' && this.system2 == 'hexadecimal'){
				return this.input1;
			}
		},
		input1FromInput2: function(val){
			//binary conversions
			if(this.system2 == 'binary' && this.system1 == 'binary'){
				return this.input2;
			}
			else if(this.system2 == 'binary' && this.system1 == 'octal'){
				var octal = binaryToOctal(val);
				return octal;
			}
			else if(this.system2 == 'binary' && this.system1 == 'decimal'){
				var dec = binaryToDecimal(val);
				return dec;
			}
			else if(this.system2 =='binary' && this.system1 =='hexadecimal'){
				var hex = binaryToHexadecimal(val);
				return hex;
			}
			//octal conversions
			else if(this.system2 == 'octal' && this.system1 == 'binary'){
				var bin = octalToBinary(val);
				return bin;
			}
			else if(this.system2 == 'octal' && this.system1 == 'octal'){
				return this.input2;
			}
			else if(this.system2 == 'octal' && this.system1 == 'decimal'){
				var decimal = octalToDecimal(val);
				return decimal;
			}
			else if(this.system2 == 'octal' && this.system1 == 'hexadecimal'){
				var hex = octalToHexadecimal(val);
				return hex;
			}
			//decimal conversions
			else if(this.system2 == 'decimal' && this.system1 == 'binary'){
				var bin = decimalToBinary(val);
				return bin;
			}
			else if(this.system2 == 'decimal' && this.system1 == 'octal'){
				var octal = decimalToOctal(val);
				return octal;
			}
			else if(this.system2 == 'decimal' && this.system1 == 'decimal'){
				return this.input2;
			}
			else if(this.system2 == 'decimal' && this.system1 == 'hexadecimal'){
				var hex = decimalToHexadecimal(val);
				return hex;
			}
			//hexadecimal conversions
			else if(this.system2 == 'hexadecimal' && this.system1 == 'binary'){
				var bin = hexadecimalToBinary(val);
				return bin;
			}
			else if(this.system2 == 'hexadecimal' && this.system1 == 'octal'){
				var octal = hexadecimalToOctal(val);
				return octal;
			}
			else if(this.system2 == 'hexadecimal' && this.system1 == 'decimal'){
				var dec = hexadecimalToDecimal(val);
				return dec;
			}
			else if(this.system2 == 'hexadecimal' && this.system1 == 'hexadecimal'){
				return this.input2;
			}
		}//function input two to input one
	}//methods object
});//vue instance






/*****************************

	NUMBER SYSTEM CONVERTER FUNCTIONS WRITTEN BY BARAJA 19/02/19

*****************************/


//binary conversions
function binaryToOctal(val){
	var bin='', octal='', rem;
	while(val > 0){
		rem = val%10;
		val = Math.floor(val/10);
		bin = rem+bin;
		if(bin.length == 3){
			switch(bin){
				case '000': octal = '0'+octal;
							break;
				case '001': octal = '1'+octal;
							break;
				case '010': octal = '2'+octal;
							break;
				case '011': octal = '3'+octal;
							break;
				case '100': octal = '4'+octal;
							break;
				case '101': octal = '5'+octal;
							break;
				case '110': octal = '6'+octal;
							break;
				case '111': octal = '7'+octal;
							break;
			}
			//re-empty bin again for next test...
			bin = '';
		}
	}//while val>0
	if(bin.length > 0 && bin.length <= 2){
		//pad appropriate number of zeroes...
		if(bin.length == 2){
			bin = '0'+bin;
		}
		else{
			bin = '00'+bin;
		}
		switch(bin){
			case '000': octal = '0'+octal;
						break;
			case '001': octal = '1'+octal;
						break;
			case '010': octal = '2'+octal;
						break;
			case '011': octal = '3'+octal;
						break;
			case '100': octal = '4'+octal;
						break;
			case '101': octal = '5'+octal;
						break;
			case '110': octal = '6'+octal;
						break;
			case '111': octal = '7'+octal;
						break;
		}
	}
	return octal;
}
function binaryToDecimal(val){
	var dec=0, rem, i=0;
	while(val>0){
		rem = val%10;
		val = Math.floor(val/10);
		dec = dec + (rem * Math.pow(2, i));
		i++;
	}
	return dec;
}
function binaryToHexadecimal(val){
	var bin='', hex='', rem;
	while(val>0){
		rem = val%10;
		val = Math.floor(val/10);
		bin = rem + bin;
		if(bin.length == 4){
			switch(bin){
				case '0000': 	hex = '0'+hex;
								break;
				case '0001': 	hex = '1'+hex;
								break;
				case '0010': 	hex = '2'+hex;
								break;
				case '0011': 	hex = '3'+hex;
								break;
				case '0100': 	hex = '4'+hex;
								break;
				case '0101': 	hex = '5'+hex;
								break;
				case '0110': 	hex = '6'+hex;
								break;
				case '0111': 	hex = '7'+hex;
								break;
				case '1000': 	hex = '8'+hex;
								break;
				case '1001': 	hex = '9'+hex;
								break; 
				case '1010': 	hex='A'+hex;
								break;  
				case '1011': 	hex='B'+hex;
								break;
				case '1100': 	hex='C'+hex;
								break;
				case '1101': 	hex='D'+hex;
								break;
				case '1110': 	hex='E'+hex;
								break;
				case '1111': 	hex='F'+hex;
								break; 
			}
			bin = '';
		}
	}//while val>0
	if(bin.length <= 3 && bin.length > 0){
		for(var i=bin.length; i<4; i++){
			bin = '0'+bin;
		}
		switch(bin){
			case '0000': 	hex = '0'+hex;
							break;
			case '0001': 	hex = '1'+hex;
							break;
			case '0010': 	hex = '2'+hex;
							break;
			case '0011': 	hex = '3'+hex;
							break;
			case '0100': 	hex = '4'+hex;
							break;
			case '0101': 	hex = '5'+hex;
							break;
			case '0110': 	hex = '6'+hex;
							break;
			case '0111': 	hex = '7'+hex;
							break;
			case '1000': 	hex = '8'+hex;
							break;
			case '1001': 	hex = '9'+hex;
							break; 
			case '1010': 	hex='A'+hex;
							break;  
			case '1011': 	hex='B'+hex;
							break;
			case '1100': 	hex='C'+hex;
							break;
			case '1101': 	hex='D'+hex;
							break;
			case '1110': 	hex='E'+hex;
							break;
			case '1111': 	hex='F'+hex;
							break; 
		}
	}
	return hex;
}
//decimal conversions
function decimalToBinary(val){
	var bin='', rem;
	while(val>0){
		rem = val%2;
		val = Math.floor(val/2);
		bin = rem +''+ bin;
	}
	return bin;
}
function decimalToOctal(val){
	var octal='', rem;
	while(val>0){
		rem = val%8;
		val = Math.floor(val/8);
		octal = rem +''+ octal;
	}
	return octal;
}
function decimalToHexadecimal(val){	
	var hex='', rem;
	while(val>0){
		rem = val%16;
		val = Math.floor(val/16);
		if(rem >= 10){
			switch(rem){
				case 10: 	rem='A';
							break;
				case 11:  	rem='B';
							break;
				case 12: 	rem='C';
							break;
				case 13: 	rem='D';
							break;
				case 14: 	rem='E';
							break;
				case 15: 	rem='F';
							break;
			}
		}
		hex = rem +''+ hex;
	}
	return hex;
}
//octal conversions
function octalToBinary(val){	
	var bin = '', rem;
	while(val > 0){
		rem = val % 10;
		val = Math.floor(val/10);
		switch(rem){
			case 0: bin = '000'+bin;
					break;
			case 1: bin = '001'+bin;
					break;
			case 2: bin = '010'+bin;
					break;
			case 3: bin = '011'+bin;
					break;
			case 4: bin = '100'+bin;
					break;
			case 5: bin = '101'+bin;
					break;
			case 6: bin = '110'+bin;
					break;
			case 7: bin = '111'+bin;
					break;	
		}
	}
	return bin;
}
function octalToDecimal(val){
	var i=0, rem, decimal=0;
	while(val > 0){
		rem = val%10;
		val = Math.floor(val/10);
		decimal += rem * Math.pow(8, i);
		i++;
	}
	return decimal;
}
function octalToHexadecimal(val){
	var bin = octalToBinary(val);
	var hex = binaryToHexadecimal(bin);
	return hex;
}
//hexadecimial conversions
function hexadecimalToBinary(val){
	var bin = '', rem;
	//convert val to string
	val = val + '';
	//then convert val to array
	val = Array.from(val);
	//val is now an array
	while(val.length > 0){
		rem = val.pop();
		switch(rem.toUpperCase()){
			case '0': bin = '0000'+bin;
					break;
			case '1': bin = '0001'+bin;
					break;
			case '2': bin = '0010'+bin;
					break;
			case '3': bin = '0011'+bin;
					break;
			case '4': bin = '0100'+bin;
					break;
			case '5': bin = '0101'+bin;
					break;
			case '6': bin = '0110'+bin;
					break;
			case '7': bin = '0111'+bin;
					break;	
			case '8': bin = '1000'+bin;
					break;
			case '9': bin = '1001'+bin;
					break;
			case 'A': 	bin = '1010'+bin;
						break;
			case 'B': 	bin = '1011'+bin;
						break;
			case 'C': 	bin = '1100'+bin;
						break;
			case 'D': 	bin = '1101'+bin;
						break;
			case 'E': 	bin = '1110'+bin;
						break;
			case 'F': 	bin = '1111'+bin;
						break;
		}
	}
	return bin;
}
function hexadecimalToOctal(val){
	var bin = hexadecimalToBinary(val);
	var octal = binaryToOctal(bin);
	return octal;
} 
function hexadecimalToDecimal(val){
	var dec=0, rem, i=0;
	val = Array.from(val);
	while(val.length>0){
		rem = val.pop();
		if(!(rem>=0 && rem<=9)){
			switch(rem.toUpperCase()){
				case 'A': 	rem = 10;
				 			break;
				case 'B': 	rem = 11;
							break;
				case 'C': 	rem = 12;
							break;
				case 'D': 	rem = 13;
							break;
				case 'E': 	rem = 14;
							break;
				case 'F': 	rem = 15;
							break;
			}
		}
		dec = dec + (rem * Math.pow(16, i));
		i++;
	}
	return dec;
} 


