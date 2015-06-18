require("./editor.css")
var React = require('react');
var Advisor = require("advisor")

var index = React.createClass({
	getInitialState: function() {
		return {
			type : "school" 
		};
	},
	switch : function(e) {
		this.setState({
			type : e.target.value, 
		});
	},
	add : function() {
		var payload = {}
		for(var key in this.refs) {
			var value = this.refs[key].getDOMNode().value
			var number = parseFloat(value)
			if(!isNaN(number))
				value = number
			payload[key] = value
		}
		Advisor.actions.addEvent(this.props.advisor, payload)
		this.props.close()
	},
	render: function() {
		var cx = React.addons.classSet({
			"timeline-editor" : true,
			"active" : this.props.active,
		})
		return (
			<section className={cx}>
				<i onClick={this.props.close}>×</i>
				<h1>Add Event</h1>
				<form>
					<h2>Type</h2>
					<select onChange={this.switch} ref="type">
						<option value="school">School</option>
						<option value="employer">Employer</option>
						<option value="test">Test</option>
					</select>
					{this[this.state.type]()}
					<h2>Year</h2>
					<input ref="year" placeholder="Year" />
					<h2>Description</h2>
					<textarea ref="description" placeholder="Description..."></textarea>
				</form>
				<div className="button" onClick={this.add}>Add</div>
			</section>
		);
	},
	school : function() {
		return (
			<div>
				<h2>School</h2>
				<select ref="school">
					<option value="MIT">MIT</option>
					<option value="University of Pennsylvania">University of Pennsylvania</option>
				</select>
				<h2>Degree</h2>
				<select ref="degree">
					<option value="undergraduate">Undergraduate</option>
					<option value="graduate">Graduate</option>
				</select>
				<h2>Major</h2>
				<input ref="major" placeholder="Major" />
				<h2>GPA</h2>
				<input ref="gpa" placeholder="GPA" />
			</div>
		)
	},
	employer : function() {
		return (
			<div>
				<h2>Employer</h2>
				<input ref="employer" placeholder="Employer" />
				<h2>Position</h2>
				<input ref="position" placeholder="Position" />
			</div>
		)

	},
	test : function() {
		return (
			<div>
				<h2>Test</h2>
				<select ref="test">
					<option value="GMAT">GMAT</option>
					<option value="SAT">SAT</option>
				</select>
				<h2>Score</h2>
				<input ref="score" placeholder="Score" />
			</div>
		)
	}


});

module.exports = index;