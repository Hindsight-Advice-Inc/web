require("./input.css")
var React = require('react');

var input = React.createClass({

	render: function() {
		return (
			<section className="input">
				<input placeholder="Search..." />
			</section>
		);
	}

});

module.exports = input;