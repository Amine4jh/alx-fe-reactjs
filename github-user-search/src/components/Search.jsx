import { useState } from "react"
import { fetchUserData } from "../services/githubService"

const Search = () => {
  const [ username, setUsername ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    setUser(null)

    try {
      const data = await fetchUserData(username)
      setUser(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

 return(
  <div>
    <form method="post" onSubmit={handleSubmit}>
      <input
        type="text" 
        placeholder="Enter username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>

    {loading && <p>Loading...</p>}
    {error && <p>Looks like we can't find the user.</p>}
    {user && (
      <div style={{ margin: '1rem', padding: '0.5rem', border: '1px solid #333' }}>
        <img src={user.avatar_url} alt="Avatar" width='150px' style={{ borderRadius: '50%' }} />
        <h3><a href={user.html_url} target="_blank">{user.name}</a></h3>
        <p><strong>Id:</strong> {user.id}</p>
        <p><strong>Location:</strong> {user.location}</p>
        <p><strong>Followers:</strong> {user.followers}</p>
        <p><strong>Following:</strong> {user.following}</p>
        <p><strong>Public Repositories:</strong> {user.public_repos}</p>
        {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
      </div>
    )}
  </div>
 ) 
}

export default Search