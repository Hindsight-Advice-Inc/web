require("./filters.css")
var React = require('react')
var _ = require("lodash")
var Advisor = require("advisor")

var options = {
	degree : [
		"undergraduate",
		"graduate",
	],
	school : [
		"MIT",
		"University of Pennsylvania",
	]
}

var filters = React.createClass({
	change : function() {
		var payload = {}
		for (var key in this.refs) {
			var node = this.refs[key].getDOMNode()
			var value = node.value
			if(!value)
				continue
			payload[key] = node.value
		}
		Advisor.actions.search(payload)
	},
	render: function() {
		var self = this
		return (
			<section className="filters">
				<div className="wrap">
				<h1>Filters</h1>
					<form>
					{
						_.map(options, function(values, key) {
							return (
								<span key={key}>
								<h2>{key}</h2>
								<select onChange={self.change} ref={key}>
								{
									[""].concat(values).map(function(value) {
										return <option key={value} value={value}>{value || "Any"}</option>
									})
								}
								</select>
								</span>
							)
						})

					}
					</form>
				</div>
			</section>
		);
	}

});

module.exports = filters;