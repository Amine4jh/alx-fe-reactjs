import { useState } from "react"
import { fetchUserData } from "../services/githubService"

const Search = () => {
  const [ username, setUsername ] = useState('')
  const [ location, setLocatiion ] = useState('')
  const [ minRepos, setMinRepos ] = useState('')
  const [ results, setResults ] = useState([])
  // const [ user, setUser ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ page, setPage ] = useState(1)
  const [ totalCount, setTotalCount ] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    // setUser(null)
    setResults([])
    setPage(1)

    try {
      const data = await fetchUserData(username, location, minRepos, 1)
      if (data.total_count === 0) {
        setError(true)
      } else {
        setResults(data.items)
        setTotalCount(data.total_count)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = async () => {
    const nextPage = page + 1
    setPage(nextPage)
    setLoading(true)
    try {
      const data = await fetchUserData(username, location, minRepos, nextPage)
      setResults(prev => [...prev, ...data.items])
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
      <input
        type="text" 
        placeholder="Location..."
        value={location}
        onChange={(e) => setLocatiion(e.target.value)}
      />
      <input
        type="number" 
        placeholder="Min Repos..."
        value={minRepos}
        onChange={(e) => setMinRepos(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>

    {loading && <p>Loading...</p>}
    {error && <p>Looks like we cant find the user.</p>}
    {results.length > 0 && (
      <ul>
        <p>Results: {results.length}</p>
        {results.map(user => (
          <li style={{ border: "1px solid #333", listStyle: "none", margin: "10px", padding: "10px"}}>
            <h3>{user.login}</h3>
            {location && <p><b>Location:</b> {location}</p>}
            <a href={user.html_url} target="_blank">View Profile</a>
          </li>
        ))}
      </ul>
    )}

    {results.length < totalCount && (
      <button 
        style={{ margin: "30px" }}
        onClick={handleLoadMore}
      >
        Load More
      </button>
    )}

  </div>
 ) 
}

export default Search