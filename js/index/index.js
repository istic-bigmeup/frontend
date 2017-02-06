var ExampleApplication = React.createClass({
	notAvailable: function () {
		alert("Pas encore implémenté");
	},
	
	render: function () {
		return (
			<form className="form-group">
				<table className="table table-responsive">
					<tbody>
						<tr>
							<td>
								<input 	className="form-control" 
										type="text" 
										placeholder="Compétences recherchées" />
							</td>
							
							<td>
								<input 	className="btn btn-primary"
										type="button"
										onClick={this.notAvailable}
										value="Chercher" />
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		);
	}
  });

ReactDOM.render(<ExampleApplication />, document.getElementById('container'));