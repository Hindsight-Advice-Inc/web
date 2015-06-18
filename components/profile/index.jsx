require("./profile.css")
var React = require('react');
var Reflux = require("reflux")
var Advisor = require("advisor")
var Request = require("request")
var Timeline = require("profile/timeline")
var TimelineEditor = require("timeline-editor")

var base = React.createClass({
	mixins : [Reflux.connect(Advisor.store, "advisor")],
	getInitialState: function() {
		return {
			editor : false
		};
	},
	componentDidMount: function() {
		Advisor.actions.get(this.props.params.id)
	},
	render: function() {
		var advisor = this.state.advisor.cache[this.props.params.id]
		if (!advisor)
			return false

		var editable = advisor.id == "123" 
		var cx = React.addons.classSet({
			editable : editable,
			profile : true,
			content: true
		})

		return (
			<section className={cx}>
				<TimelineEditor advisor={advisor} close={this.toggleEditor} active={this.state.editor}/>
				<div className="left card">
					<div className="wrap">
						<img src={advisor.image || "https://images.blogthings.com/thecolorfulpatterntest/pattern-4.png"}/>
						<h1>
							<span onBlur={this.modify.bind(this, "name")} contentEditable={editable} className="pencil">{advisor.name}</span>
						</h1>
						<h2>{advisor.education.school}</h2>
						<h3>{advisor.education.major}</h3>
						<div onClick={Request.actions.target.bind(this, advisor)} className="button">Request</div>
					</div>
				</div>
				<div className="center">
					<div className="card">
						<h1>Story</h1>
						<div className="pad">
							<h2>About Me</h2>
							<p onBlur={this.modify.bind(this, "story")} contentEditable={editable} className="pencil">{advisor.story || "No description"}</p>
							<h2 onClick={this.toggleEditor} className="pencil">Timeline</h2>
							<Timeline  advisor={advisor} />
							<h2>Skills</h2>
							<ul className="skills">
								<li>
									<div className="count">72</div>
									<h1>My favorite skill</h1>
								</li>
								<li>
									<div className="count">30</div>
									<h1>My Other Skill</h1>
								</li>
								<li>
									<div className="count">2</div>
									<h1>Not too great at this one</h1>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		);
	},
	toggleEditor : function() {
		this.setState({
			editor : !this.state.editor 
		});
	},
	modify : function(field, event) {
		var value = event.target.innerHTML
		Advisor.actions.modify(this.props.params.id, field, value)
	},

});

module.exports = base;
