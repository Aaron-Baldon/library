import { useEffect, useMemo, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import toast from "react-hot-toast"

function Users() {
	const [search, setSearch] = useState("")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [savingUserId, setSavingUserId] = useState(null)
	const [deletingUserId, setDeletingUserId] = useState(null)

	const loadUsers = async () => {
		setError("")
		setLoading(true)
		try {
			const [usersResult, rolesResult] = await Promise.all([
				supabase.rpc("admin_list_users"),
				supabase.rpc("admin_list_roles"),
			])

			if (usersResult.error) throw new Error(usersResult.error.message)
			if (rolesResult.error) throw new Error(rolesResult.error.message)

			const mappedUsers = (usersResult.data || []).map((u) => ({
				id: u.user_id,
				full_name: u.full_name,
				roles: u.role_id
					? { id: u.role_id, name: u.role_name }
					: u.role_name
						? { id: null, name: u.role_name }
						: null,
			}))
			setUsers(mappedUsers)
			setRoles(rolesResult.data || [])
		} catch (e) {
			const msg = e?.message || "Unable to load users"
			setError(msg)
			toast.error(msg)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		void loadUsers()
	}, [])

	const rolesById = useMemo(() => {
		return Object.fromEntries((roles || []).map((r) => [r.id, r]))
	}, [roles])

	const filteredUsers = useMemo(() => {
		const q = search.trim().toLowerCase()
		if (!q) return users
		return (users || []).filter((u) => {
			const name = String(u?.full_name || "").toLowerCase()
			const id = String(u?.id || "").toLowerCase()
			const role = String(u?.roles?.name || "").toLowerCase()
			return name.includes(q) || id.includes(q) || role.includes(q)
		})
	}, [users, search])

	const handleRoleChange = async (userId, nextRoleId) => {
		if (!userId) return
		const roleIdNum = Number(nextRoleId)
		if (!Number.isFinite(roleIdNum)) return

		setError("")
		setSavingUserId(userId)
		try {
			const { error: updateError } = await supabase.rpc("admin_set_user_role", {
				p_user_id: userId,
				p_role_id: roleIdNum,
			})
			if (updateError) throw new Error(updateError.message)

			setUsers((prev) =>
				(prev || []).map((u) =>
					u.id === userId
						? { ...u, roles: rolesById[roleIdNum] ? rolesById[roleIdNum] : u.roles }
						: u
				)
			)
			toast.success("Role updated")
		} catch (e) {
			const msg = e?.message || "Unable to update role"
			setError(msg)
			toast.error(msg)
		} finally {
			setSavingUserId(null)
		}
	}

	const handleDeleteUser = async (userRow) => {
		if (!userRow?.id) return
		const ok = window.confirm(
			`Delete member "${userRow?.full_name || userRow.id}"? This will remove their profile.`
		)
		if (!ok) return

		setError("")
		setDeletingUserId(userRow.id)
		try {
			const { error: delError } = await supabase.rpc("admin_delete_profile", {
				p_user_id: userRow.id,
			})
			if (delError) throw new Error(delError.message)

			setUsers((prev) => (prev || []).filter((u) => u.id !== userRow.id))
			toast.success("Member deleted")
		} catch (e) {
			const msg = e?.message || "Unable to delete member"
			setError(msg)
			toast.error(msg)
		} finally {
			setDeletingUserId(null)
		}
	}

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
				</div>
			</div>

			{error ? <p className="login-error">{error}</p> : null}

			{/* TABLE */}
			<div className="table-card">
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Member ID</th>
							<th>Role</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{loading ? (
							<tr>
								<td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
									Loading users...
								</td>
							</tr>
						) : null}

						{!loading && filteredUsers.map((user) => (
							<tr key={user.id}>
								<td>
									{user.full_name || "-"}
								</td>
								<td className="truncate" title={user.id}>{user.id}</td>
								<td>
									<select
										value={user?.roles?.id || ""}
										onChange={(e) => handleRoleChange(user.id, e.target.value)}
										disabled={!roles.length || savingUserId === user.id || deletingUserId === user.id}
									>
										<option value="" disabled>
											Select
										</option>
										{roles.map((r) => (
											<option key={r.id} value={r.id}>
												{r.name}
											</option>
										))}
									</select>
								</td>
								<td>
									<button
										className="btn delete"
										onClick={() => handleDeleteUser(user)}
										disabled={deletingUserId === user.id || savingUserId === user.id}
									>
										{deletingUserId === user.id ? "Deleting..." : "Delete"}
									</button>
								</td>
							</tr>
						))}

						{!loading && filteredUsers.length === 0 && (
							<tr>
								<td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
									No users found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

		</div>
	)
}

export default Users