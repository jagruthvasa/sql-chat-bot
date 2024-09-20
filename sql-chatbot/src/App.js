import React, { useState } from "react";
import "./App.css";

function App() {
	const [command, setCommand] = useState("");
	const [sqlQuery, setSqlQuery] = useState("");

	const handleInputChange = (e) => {
		setCommand(e.target.value);
	};

	const handleSubmit = async () => {
		if (command) {
			// Send the command to the backend to generate SQL query
			const response = await fetch(
				"http://localhost:5000/generate-sql",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ command }),
				}
			);

			const data = await response.json();
			setSqlQuery(data.sqlQuery);
		}
	};

	return (
		<div className="App">
			<h1>SQL Query Generator</h1>
			<input
				type="text"
				value={command}
				onChange={handleInputChange}
				placeholder="Enter your command..."
			/>
			<button onClick={handleSubmit}>Generate SQL</button>

			{sqlQuery && (
				<div>
					<h3>Generated SQL Query:</h3>
					<pre>{sqlQuery}</pre>
				</div>
			)}
		</div>
	);
}

export default App;
