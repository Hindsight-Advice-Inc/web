require("./profile.css")
var React = require('react');
var Reflux = require("reflux")
var Advisor = require("advisor")

var base = React.createClass({
	mixins : [Reflux.connect(Advisor.store, "advisor")],
	componentDidMount: function() {
		Advisor.actions.get(this.props.params.id)
	},
	modify : function(field, event) {
		var value = event.target.innerHTML
		Advisor.actions.modify(this.props.params.id, field, value)
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
				<div className="left card">
					<div className="wrap">
						<img src={advisor.image || "https://images.blogthings.com/thecolorfulpatterntest/pattern-4.png"}/>
						<h1>
							<span onBlur={this.modify.bind(this, "name")} contentEditable={editable} className="pencil">{advisor.name}</span>
						</h1>
						<h2>{advisor.school[0].school}</h2>
						<h3>{advisor.school[0].major}</h3>
						<div className="button">Request</div>
					</div>
				</div>
				<div className="center">
					<div className="card">
						<h1>Story</h1>
						<div className="content">
							<h2>About Me</h2>
							<p onBlur={this.modify.bind(this, "story")} contentEditable={editable} className="pencil">{advisor.story || "No description"}</p>
							<h2 className="pencil">Timeline</h2>
							<ul className="timeline">
							{

								[]
									.concat(advisor.school)
									.concat(advisor.test)
									.concat(advisor.employer)
									.sort(function(a,b) {
										return a.year<b.year?1:a.year>b.year?-1:0;
									}).map(function(item) {
									if (!item) 
										return false
									return (
										<li key={item.id}>
											<i />
											<h3>{item.year}</h3>
											<h1>{item.school || item.test || item.employer}</h1>
											{item.gpa ? <h2>GPA: {item.gpa}</h2> : false}
											{item.major ? <h2>{item.major}</h2> : false}
											{item.score ? <h2>Score: {item.score}</h2> : false}
											{item.position ? <h2>{item.position}</h2> : false}
											<p>{item.description}</p>
										</li>
									)
								})
							}
							</ul>
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
	}

});

module.exports = base;
