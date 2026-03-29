function Books() {

	const books = [
		{ name: "Literature", author: "Wade Warren", id: "#0011", subject: "English", class: "02", date: "22 Oct, 2022" },
		{ name: "Mathematics", author: "David Morgan", id: "#0021", subject: "Math", class: "01", date: "12 Sep, 2023" },
		{ name: "English", author: "Kristin Watson", id: "#0031", subject: "Physics", class: "03", date: "23 Nov, 2020" },
	]

	return (
		<div className="page">

			{/* HEADER */}
			<div className="page-header">
				<div>
					<h2>Books</h2>
					<div className="breadcrumb">Dashboard / Books</div>
				</div>

				<div className="page-actions">
					<input placeholder="Search books..." />
					<button className="primary">Add Book</button>
				</div>
			</div>

			{/* TABLE */}
			<div className="table-card">
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<th>Book Name</th>
							<th>Writer</th>
							<th>ID</th>
							<th>Subject</th>
							<th>Class</th>
							<th>Publish Date</th>
							<th>Action</th>
						</tr>
					</thead>

					<tbody>
						{books.map((book, i) => (
							<tr key={i}>
								<td><input type="checkbox" /></td>
								<td>{book.name}</td>
								<td>{book.author}</td>
								<td>{book.id}</td>
								<td>{book.subject}</td>
								<td>{book.class}</td>
								<td>{book.date}</td>
								<td>
									<button className="btn">Edit</button>
									<button className="btn delete">Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

		</div>
	)
}

export default Books