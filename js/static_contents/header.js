var Header = React.createClass({
	render: function () {
		var divClass = "col-md-4 col-lg-4 col-sm-4 col-xs-4";
		
		return (
			<div className="row">
				<div className={divClass}></div>
				
				<div className={divClass}>
					<h1>BigMeUp</h1>
				</div>
				
				<div className={divClass}></div>
			</div>
		);
	}
});

ReactDOM.render(<Header />, document.getElementById("header"));