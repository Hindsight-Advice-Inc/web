var Reflux = require("reflux")
var Axios = require("axios")

module.exports.actions = Reflux.createActions([
	"send",
	"target",
	"clear",
	"get",
	"cancel",
])

var data = { 
};

module.exports.store = Reflux.createStore({
	listenables : [module.exports.actions],
	onTarget : function(advisor) {
		data.target = advisor;
		this.trigger(data);
	},
	onSend: function(payload) {
		var self = this;
		setTimeout(function() {
			data.state = "success"
			self.trigger(data)
			setTimeout(function() {
				module.exports.actions.clear()
			}, 1000)
		}, 3000)
		data.state = "loading"
		self.trigger(data)
		Axios.post("me/request/create/" + data.target.id , payload)
	},
	onClear : function() {
		var self = this
		data.target = false
		setTimeout(function() {
			data.state = ""
			self.trigger(data)
		}, 500)
		self.trigger(data)
	},
	onGet : function(type) {
		var self = this
		Axios.get("me/request/" + type).then(function(response) {
			data[type] = response.data
			self.trigger(data)
		}).catch(function() {
			console.log(arguments)
		})
	},
	onCancel : function(type, connection) {
		var self = this;
		Axios.post("me/request/" + connection.request.id + "/delete").then(function(response) {
			_.remove(data[type],  function(obj) {
				return obj.request.id == connection.request.id;
			})
			self.trigger(data)
		})
	},
	getInitialState: function() {
		return data
	},
})