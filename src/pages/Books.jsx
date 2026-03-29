function Books() {

	const books = [
		{
			name: "The Last Bookshop in Prague",
			author: "Helen Parusel",
			date: "September 25, 2024",
			image: "https://covers.openlibrary.org/b/id/12883072-L.jpg"
		},
		{
			name: "The Wild Hunt",
			author: "Elizabeth Chadwick",
			date: "September 22, 2024",
			image: "https://covers.openlibrary.org/b/id/12883075-L.jpg"
		},
		{
			name: "The Royal Rebel",
			author: "Elizabeth Chadwick",
			date: "September 21, 2024",
			image: "https://covers.openlibrary.org/b/id/12883078-L.jpg"
		},
		{
			name: "There Are Rivers in the Sky",
			author: "Elif Shafak",
			date: "September 13, 2024",
			image: "https://covers.openlibrary.org/b/id/12883080-L.jpg"
		}
	]

	return (
		<div className="page">

			{/* HEADER (DI GINALAW) */}
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

			{/* CARDS (ITO LANG PINALIT) */}
			<div className="books-grid">
				{books.map((book, i) => (
					<div className="book-card" key={i}>

						<img src={book.image} alt={book.name} />

						<div className="book-info">
							<h4>{book.name}</h4>
							<p>{book.author}</p>
							<span>{book.date}</span>
						</div>

					</div>
				))}
			</div>

		</div>
	)
}

export default Books