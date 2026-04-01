import { useState, useEffect } from "react"

function EditBookModal({ isOpen, onClose, book, onSave }) {

	const [form, setForm] = useState({
		name: "",
		author: "",
		date: "",
		image: "",
		coverFile: null
	})
	const [localError, setLocalError] = useState("")
	const [submitting, setSubmitting] = useState(false)

	// auto-fill kapag may book
	useEffect(() => {
		if (book) {
			setLocalError("")
			setForm({
				id: book.id,
				name: book.name || "",
				author: book.author || "",
				date: book.date || "",
				image: book.image || "",
				coverFile: null,
			})
		}
	}, [book])

	if (!isOpen || !book) return null

	const handleChange = (e) => {
		const { name, value } = e.target
		setLocalError("")
		setForm(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleFileChange = (file) => {
		setLocalError("")
		setForm((prev) => ({
			...prev,
			coverFile: file || null,
		}))
	}

	const handleSubmit = async () => {
		if (!onSave) {
			onClose()
			return
		}
		setSubmitting(true)
		try {
			const result = await onSave(form)
			if (result?.success === false) {
				setLocalError(result?.message || "Unable to save changes")
				return
			}
			onClose()
		} catch (e) {
			setLocalError(e?.message || "Unable to save changes")
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal book-modal" onClick={(e) => e.stopPropagation()}>

				<h3>Edit Book</h3>
				{localError ? <div className="form-error">{localError}</div> : null}

				<div className="edit-form">

					<input
						name="name"
						value={form.name}
						onChange={handleChange}
						placeholder="Book Name"
					/>

					<input
						name="author"
						value={form.author}
						onChange={handleChange}
						placeholder="Author"
					/>

					<input
						name="date"
						value={form.date}
						onChange={handleChange}
						placeholder="Publish Date"
					/>

					<input
						name="image"
						value={form.image}
						onChange={handleChange}
						placeholder="Image URL"
					/>

					<input
						type="file"
						accept="image/*"
						onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
					/>

				</div>

				<div className="modal-actions">
					<button className="primary" onClick={handleSubmit} disabled={submitting}>
						{submitting ? "Saving..." : "Save Changes"}
					</button>
					<button className="cancel" onClick={onClose} disabled={submitting}>
						Cancel
					</button>
				</div>

			</div>
		</div>
	)
}

export default EditBookModal