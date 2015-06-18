var React = require('react');
var Link = require("react-router").Link
var Transition = React.addons.CSSTransitionGroup;

var Request = require("request")

var list = React.createClass({

	render: function() {
		if(!this.props.connections)
			return false
		return (
			<Transition component="ul" transitionName="fade" transitionAppear={true} className="connections-list grid">
			{
				this.props.connections.map(function(connection) {
					return (
						<li key={connection.request.id} className="card">
							<div className="top">
								<img src={connection.target.image || "https://images.blogthings.com/thecolorfulpatterntest/pattern-4.png"} />
								<div className="details">
									<h1>{connection.target.name}</h1>
									<h3>Essay Review - {connection.request.essay}</h3>
									<h3>Q&A - {connection.request.qa}</h3>
									<h3>Advice Call- {connection.request.advice}</h3>
								</div>
							</div>
							<div className="toolbar">
								<Link params={{id : connection.target.id}} className="profile" to="profile" />
								<a onClick={Request.actions.cancel.bind(this, "pending", connection)} className="cancel"></a>
							</div>
						</li>
					)
				})
			}
			</Transition>
		);
	}

});

module.exports = list;