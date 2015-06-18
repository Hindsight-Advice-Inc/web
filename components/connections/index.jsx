require("connections/connections.css")
var React = require('react');
var Reflux = require("reflux")

var Request = require("request")
var ConnectionList = require("connections/list")

var index = React.createClass({
	mixins :[Reflux.connect(Request.store, "request")],
	componentWillMount: function() {
		Request.actions.get("pending")		
	},
	render: function() {
		return (
			<section className="connections content">
				<ConnectionList connections={this.state.request.pending}/>
			</section>
		);
	}

});

module.exports = index;