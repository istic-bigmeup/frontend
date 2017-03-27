var ExampleApplication = React.createClass({
	chercher: function () {
		var skill = document.getElementsByName("competence")[0].value;
		window.open("https://www.bigmeup.fr/?q=" + skill, "_blank");
	},
	
	render: function () {
		return (
			<table className="table table-responsive">
				<tbody>
					<tr>
						<td>
							<input 	className="form-control" 
									type="text"
									name="competence"
									placeholder="Compétences recherchées" />
						</td>
						
						<td>
							<input 	className="btn btn-primary"
									type="button"
									onClick={this.chercher}
									value="Chercher" />
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
  });

ReactDOM.render(<ExampleApplication />, document.getElementById('container'));