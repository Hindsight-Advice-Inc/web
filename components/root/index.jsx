require("root/button.css")
require("root/reset.css");
require("root/root.css")
require("root/form.css")
var React = require('react');
var Router = require('react-router');

var Header = require("header")
var Request = require("request-modal")


var app = React.createClass({

	render: function() {
		return (
			<section className="root">
				<Header />
				<Request/>
				<section className="main">
					<Router.RouteHandler />
				</section>
			</section>
		)
	}
});

module.exports = app;