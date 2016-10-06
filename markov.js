
 // 88  88 888888 88     8888o. 888888 8888o.    888888 88  88 8888o. .o8888 888888 88 .o88o. 8888o. .o8888 
 // 88  88 88     88     88  88 88     88  88    88     88  88 88  88 88       88   88 88  88 88  88 88     
 // 888888 8888   88     8888Y' 8888   8888Y'    8888   88  88 88  88 88       88   88 88  88 88  88 'Y88o. 
 // 88  88 88     88     88     88     88  88    88     88  88 88  88 88       88   88 88  88 88  88     88 
 // 88  88 888888 888888 88     888888 88  88    88     'Y88Y' 88  88 'Y8888   88   88 'Y88Y' 88  88 8888Y' 

var __VERBOSE__ = true;
var first_word = "";
var second_word = "";
var appearances = [];
var master_list = [];
var uniques = [];
var temp = {};
var individual_counts = {}

var model = {
	first_word:"",
	second_word: "",
	appearances: [],
	master_list: [],
	uniques: [],
	temp: {},
	individual_counts: {},
	debug: true,
	print_for_debug: 		function print_for_debug(a_string){
			if(__VERBOSE__){
				console.log(a_string);
			}
		},
	count_of: function count_of(input_word){
			if(input_text.indexOf(input_word)>-1){
				return (input_text.split(input_word).length - 1);
			}
		},
	getAllIndexes: 		function getAllIndexes(arr, val) {
		    var indexes = [], i;
		    for(i = 0; i < arr.length; i++)
		        if (arr[i] === val)
		            indexes.push(i);
		    return indexes;
		},
	get_max_dictionary_value:	function get_max_dictionary_value(dictionary){
			var key_of_largest_item = "";
			var largest_value = 0;
			for(var key in dictionary){
				if(dictionary[key]>largest_value){
					largest_value = dictionary[key];
					key_of_largest_item=key;
				}
			}
			return key_of_largest_item;
		},
	train: function train_model(input_text,debug){

		__VERBOSE__ = debug;

		input_text = input_text.toLowerCase().replace(",","").replace(".","");

		function print_for_debug(a_string){
			if(__VERBOSE__){
				console.log(a_string);
			}
		}

		function count_of(input_word){
			if(input_text.indexOf(input_word)>-1){
				return (input_text.split(input_word).length - 1);
			}
		}
		function getAllIndexes(arr, val) {
		    var indexes = [], i;
		    for(i = 0; i < arr.length; i++)
		        if (arr[i] === val)
		            indexes.push(i);
		    return indexes;
		}
		function get_max_dictionary_value(dictionary){
			var key_of_largest_item = "";
			var largest_value = 0;
			for(var key in dictionary){
				if(dictionary[key]>largest_value){
					largest_value = dictionary[key];
					key_of_largest_item=key;
				}
			}
			return key_of_largest_item;
		}


		var array_of_words = input_text.split(" ");

		print_for_debug(array_of_words);

		for(var i=0; i<array_of_words.length; i++){
			// Clean up input text
			if(!this.uniques.includes(array_of_words[i])){
				this.uniques.push(array_of_words[i]);
			}
		}

		print_for_debug("uniques "+this.uniques);

		// generate probabilities

		for(var j=0; j<this.uniques.length; j++){
			individual_counts[this.uniques[j]] = count_of(this.uniques[j]);
		}


		for(var k=0; k<this.uniques.length; k++){
			temp = {};
			first_word=this.uniques[k];
			print_for_debug(first_word);
			appearances = getAllIndexes(array_of_words,first_word);
			for(var z=0;z<appearances.length;z++){
				second_word = array_of_words[appearances[z]+1];
				print_for_debug("    "+second_word);
				temp[second_word] = (count_of(first_word+" "+second_word)/count_of(first_word));
			}
			master_list.push([first_word,temp]);

		}
		this.word_model = master_list;
		// this.uniques = uniques;
		return this;
	},
	word_model: [],
	generate: 	function generate(output_length){
			var master_string = this.uniques[Math.floor(Math.random()*this.uniques.length)];
			var temp_word = master_string;
			for(var q=0;q<output_length-1;q++){
				// temp_word = get_max_dictionary_value(master_list[uniques.indexOf(temp_word)][1])
				console.log("temp_word: "+temp_word);
				temp_word = this.get_max_dictionary_value(this.word_model[this.uniques.indexOf(temp_word)][1]);
				console.log("temp_word set to:"+ this.get_max_dictionary_value(this.word_model[this.uniques.indexOf(temp_word)][1]))
				master_string = master_string + " " + temp_word;
				console.log("master_string: "+master_string);
			}
			// print_for_debug(master_string);
			return master_string;
		}
}

