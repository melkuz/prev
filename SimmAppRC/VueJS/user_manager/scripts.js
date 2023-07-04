//---------------------------------------------------------------------------------------------------------------------
// scripts.js - user manager
//---------------------------------------------------------------------------------------------------------------------



// CKEditor integration
Vue.use(CKEditor);


var vm = new Vue({


	el: "#main",
	
	
	vuetify: new Vuetify({
		lang: {
			current: 'fr',
		},
	}),


	components: {
	},


	data: {

		// Table initialization
		search: '',
		page: 1,
		pageCount: 0,
		itemsPerPage: 10,
		sel_pos: 0,
		headers: [
			{ text: 'Name', value: 'user_name' },
			{ text: 'CIP', value: 'cip' },
			{ text: 'Rôle', value: 'role_name' },
			{ text: 'Rôle id', value: 'role_id' },
		],
		users: [ {id:2,cip:"blaf1904",role:1} ],

		// Selected case
		selected_user:{
							cip: null, 
							user_id:null, 
							role_id:null
			     	  },
					  
		options: [
		  { text: 'Étudiant(e)', value: 1 },
		  { text: 'Enseignant(e)', value: 1000 },
		  { text: 'Administrateur/Administratrice', value: 100000 }
		],

	},


	methods: Object.assign({}, ajax_commands, {

		handleClick(value)
		{
			console.log("value = ")
			console.log (value);
			console.log("user_id = " + value.user_id);

			// Copy selected value
			this.selected_user = value;
			
			// Show menu
			$("#user_table").hide();
			$("#selected_user_menu").show();

		},

		modify_user_role()
		{
			var obj = this

			setTimeout(function ()
			{
				obj.ajax_modify_user_role()

			}, 1)
		},

	}),


	beforeMount()
	{

		// Get all cases
		this.get_all_users(this);

		// Change table language to French
		this.$vuetify.lang.current = 'fr';

	}


});




// Back -- Forward blocking
(function (global) {

	if (typeof (global) === "undefined") {
		throw new Error("window is undefined");
	}

	var _hash = "!";
	var noBackPlease = function () {
		global.location.href += "#";

		// Making sure we have the fruit available for juice (^__^)
		global.setTimeout(function () {
			global.location.href += "!";
		}, 50);
	};

	global.onhashchange = function () {
		if (global.location.hash !== _hash) {
			global.location.hash = _hash;
		}
	};

	global.onload = function () {
		noBackPlease();

		// Disables backspace on page except on input fields and textarea..
		document.body.onkeydown = function (e) {
			var elm = e.target.nodeName.toLowerCase();
			if (e.which === 8 && (elm !== 'input' && elm !== 'textarea')) {
				e.preventDefault();
			}
			// Stopping the event bubbling up the DOM tree...
			e.stopPropagation();
		};
	}
})(window);
