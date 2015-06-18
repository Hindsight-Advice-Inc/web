var Reflux = require("reflux")
var Axios = require("axios")

module.exports.actions = Reflux.createActions([
	"search",
	"get",
	"modify",
	"addEvent",
	"deleteEvent"
])

var data = { 
	cache : {}
};

module.exports.store = Reflux.createStore({
	listenables : [module.exports.actions],
	onSearch : function(payload) {
		var self = this;
		Axios.get("advisor/search", {
			params : payload,
		}).then(function(response) {
			data.search = self.cache(response.data)
			self.trigger(data)
		})
	},
	onGet : function(id) {
		var self = this;
		Axios.get("advisor/" + id).then(function(response) {
			console.log(response.data)
			data.cache[response.data.id] = self.cache([response.data])[0]
			self.trigger(data)
		}).catch(function() {
			console.log(arguments)
		})
	},
	onModify : function(id, field, value) {
		data.cache[id][field] = value
		Axios.post("me/modify/" + field + "?session=123", {
			data : value
		}).then(function(response) {
		})
		this.trigger(data)
	},
	onAddEvent : function(advisor, payload) {
		var self = this
		Axios.post("me/event/" + payload.type + "?session=123", payload).then(function(response) {
			advisor[payload.type].push(response.data)
			self.cache(advisor)
			self.trigger(data)
		})
	},
	onDeleteEvent : function(advisor, payload) {
		var self = this;
		Axios.post("me/event/" + payload.id + "/delete?session=123").then(function(response) {
		})
		_.remove(advisor[payload.type], function(obj) {
			return obj.id == payload.id
		})
		this.cache(advisor)
		self.trigger(data);
	},
	cache : function(arr) {
		[].concat(arr).forEach(function(advisor) {
			advisor.education = {}
			if(advisor.school.length > 0) {
				advisor.education = advisor.school.sort(function(a,b) {
					return a.year<b.year?1:a.year>b.year?-1:0;
				})[0]
			}
			data.cache[advisor.id + ""] = advisor
 		})
		return arr
	},
	getInitialState: function() {
		return data
	},
})