import { useState } from "react"
import AddUserModal from "./AddUserModal"

function Users() {
	const [search, setSearch] = useState("")
	const [openModal, setOpenModal] = useState(false)

	const users = [
		{ id: 1, name: "John Doe", email: "john@gmail.com", role: "User" },
		{ id: 2, name: "Jane Smith", email: "jane@gmail.com", role: "Admin" },
		{ id: 3, name: "Mark Lee", email: "mark@gmail.com", role: "User" },
	]

	const filteredUsers = users.filter(user =>
		user.name.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<div className="page">

			{/* HEADER */}
			<div className="page-header">
				<div>
					<h2>Users</h2>
					<div className="breadcrumb">Dashboard / Users</div>
				</div>

				<div className="page-actions">
					<input
						type="text"
						placeholder="Search users..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<button 
						className="primary"
						onClick={() => setOpenModal(true)}
					>
						Add Member
					</button>
				</div>
			</div>

			{/* TABLE */}
			<div className="table-card">
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{filteredUsers.map((user) => (
							<tr key={user.id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									<span className={`badge ${user.role === "Admin" ? "green" : ""}`}>
										{user.role}
									</span>
								</td>
								<td>
									<button className="btn">Edit</button>
									<button className="btn delete">Delete</button>
								</td>
							</tr>
						))}

						{filteredUsers.length === 0 && (
							<tr>
								<td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
									No users found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* MODAL */}
			<AddUserModal 
				isOpen={openModal} 
				onClose={() => setOpenModal(false)} 
			/>

		</div>
	)
}

export default Users