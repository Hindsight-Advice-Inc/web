require("./advisor-list.css")
var React = require('react')
var Transition = React.addons.CSSTransitionGroup;
var Link = require("react-router").Link
var Request = require("request")

var base = React.createClass({
	componentWillMount: function() {
		
	},
	render: function() {
		if(!this.props.advisors)
			return false
		return (
			<Transition component="ul" transitionName="fade" transitionAppear={true} className="advisor-list">
			{
				this.props.advisors.map(function(advisor) {
					return (
						<li className="card">
							<div className="top">
								<img src={advisor.image || "https://images.blogthings.com/thecolorfulpatterntest/pattern-4.png"} />
								<div className="details">
									<h1>{advisor.name}</h1>
									<h2>{advisor.education.school}</h2>
									<h3>{advisor.education.major}</h3>
								</div>
								<ul className="stats">
								{
									advisor.test.map(function(test) {
										return (
											<li key={test.id}>
												<h1>{test.score}</h1>
												<h2>{test.test}</h2>
											</li>
										)
									})
								}
								</ul>
							</div>
							<div className="toolbar">
								<Link params={{id : advisor.id}} className="profile" to="profile" />
								<a onClick={Request.actions.target.bind(this, advisor)}></a>
							</div>
						</li>
					)
				})
			}
			</Transition>
		);
	}
});

module.exports = base;