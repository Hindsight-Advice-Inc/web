require("search/search.css")
var React = require("react");
var Reflux = require("reflux")

var Input = require("search/input")
var Filters = require("search/filters")
var AdvisorList = require("advisor-list")
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