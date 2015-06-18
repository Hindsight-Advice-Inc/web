require("request-modal/request.css")
var React = require('react')
var Reflux = require("reflux")
var Request = require("request")

var request = React.createClass({
	mixins : [
		Reflux.connect(Request.store, "request")
	],
	render: function() {
		var classes = {
			request: true,
			active : !!this.state.request.target,
		}
		classes[this.state.request.state] = true
		var cx = React.addons.classSet(classes)
		return (
			<section className={cx}>
				<div className="modal">
					<h1>Request a meeting with <strong>{this.state.request.target ? this.state.request.target.name : ""}</strong></h1>
						<ul>
							<li><input ref="essay" placeholder="0"/>Essay Review</li>
							<li><input ref="advice" placeholder="0"/>Advice Call</li>
							<li><input ref="qa" placeholder="0"/>Q&A</li>
						</ul>
					<div className="toolbar">
						<div onClick={this.request} className="button">{this.state.request.state == "success" ? "Success" : "Request"}</div>
					</div>
					<div className="close" onClick={Request.actions.clear}>×</div>
				</div>
			</section>
		);
	},
	request: function(e) {
		e.stopPropagation();
		var payload = {};
		var count = 0;
		for(var key in this.refs) {
			var element = this.refs[key].getDOMNode();
			payload[key] = parseFloat(element.value) || 0;
			count += payload[key]
		}
		if(count == 0)
			return;
		Request.actions.send(payload);
	},

});

module.exports = request;