require("./header.css")
var Router = require("react-router")
var Link = Router.Link
var React = require('react')


var header = React.createClass({

	render: function() {
		return (
			<header>
				<div className="logo">Hindsight</div>
				<nav>
					<Link to="search">Search</Link>
					<Link to="connections">Connections</Link>
					<Link to="profile" params={{id : "123"}}>Profile</Link>
				</nav>
			</header>
		);
	}

});

module.exports = header;