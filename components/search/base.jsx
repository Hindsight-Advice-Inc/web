require("./search.css")
var React = require("react");
var Reflux = require("reflux")
var Input = require("./input.jsx")
var Filters = require("./filters.jsx")
var AdvisorList = require("advisor-list/base.jsx")
var Advisor = require("advisor")

var base = React.createClass({
	mixins : [Reflux.connect(Advisor.store, "advisor")],
	componentWillMount: function() {
		Advisor.actions.search({})
	},
	render: function() {
		return (
			<section className="search">
				<div className="content">
					<Filters />
					<AdvisorList advisors={this.state.advisor.search} />
				</div>
			</section>
		);
	}

});

module.exports = base;