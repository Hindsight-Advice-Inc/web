var Reflux = require("reflux")
var Axios = require("axios")

module.exports.actions = Reflux.createActions([
	"search",
	"get"
])

var data = { 
	cache : {}
};

module.exports.store = Reflux.createStore({
	listenables : [module.exports.actions],
	onSearch : function(payload) {
		var self = this;
		Axios.get("http://dashboard.hindsight.io/api/advisor/search", {
			params : payload,
		}).then(function(response) {
			data.search = self.cache(response.data)
			self.trigger(data)
		})
	},
	onGet : function(id) {
		var self = this;
		Axios.get("http://dashboard.hindsight.io/api/advisor/" + id).then(function(response) {
			console.log(response.data)
			data.cache[response.data.id] = self.cache([response.data])[0]
			self.trigger(data)
		})
	},
	cache : function(arr) {
		arr.forEach(function(advisor) {
			data.cache[advisor.id] = advisor
 		})
		return arr
	},
	getInitialState: function() {
		return data
	},
})