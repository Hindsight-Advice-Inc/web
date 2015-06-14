require("./header.css")
var Router = require("react-router")
var Link = Router.Link
var React = require('react')


var header = React.createClass({

	render: function() {
		return (
			<header>
				<div className="logo">Hindsight</div>
			</header>
		);
	}

});

module.exports = header;