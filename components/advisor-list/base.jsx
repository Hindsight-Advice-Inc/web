require("./advisor-list.css")
var React = require('react')
var Link = require("react-router").Link

var base = React.createClass({
	componentWillMount: function() {
		
	},
	render: function() {
		if(!this.props.advisors)
			return false
		return (
			<ul className="advisor-list">
			{
				this.props.advisors.map(function(advisor) {
					return (
						<li className="card">
							<div className="top">
								<img src={advisor.image || "https://images.blogthings.com/thecolorfulpatterntest/pattern-4.png"} />
								<div className="details">
									<h1>{advisor.name}</h1>
									<h2>{advisor.school[0].school}</h2>
									<h3>{advisor.school[0].major}</h3>
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
								<a></a>
							</div>
						</li>
					)
				})
			}
			</ul>
		);
	}
});

module.exports = base;