
var React = require("react/addons");
var Router = require("react-router")
var Axios = require("axios")
Axios.interceptors.request.use(function(config) {
	config.url = "http://api.hindsight.svc.tutum.io:3000/" + config.url;
	config.params = config.params || {}
	config.params["session"] = "123"
	return config;
});

var Route = Router.Route;
var Redirect = Router.Redirect;

var Root = require("root");
var Search = require("search")
var Profile = require("profile")
var Connections = require("connections")

var routes = (
	<Route name="app" path="/" handler={Root}>
		<Route name="search" handler={Search} />
		<Route name="connections" handler={Connections} />
		<Route name="profile" path="profile/:id" handler={Profile} />
		<Redirect from="/" to="search" />
	</Route>
)


React.initializeTouchEvents(true)
Router.run(routes, Router.HistoryLocation, function(Handler) {
	React.render(<Handler/>, document.body)   
})
