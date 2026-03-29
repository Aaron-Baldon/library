function AddUserModal({ isOpen, onClose }) {

	if (!isOpen) return null

	return (
		<div className="modal-overlay">
			<div className="modal">

				<h3>Add User</h3>
				<p>Enter user details below</p>

				<input placeholder="Register ID" />
				<input placeholder="Name ID" />
				<input placeholder="Email ID" />

				<div className="modal-actions">
					<button className="confirm">Confirm</button>
					<button className="cancel" onClick={onClose}>Cancel</button>
				</div>

			</div>
		</div>
	)
}

export default AddUserModal