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
  <div className="p-4 max-w-3xl mx-auto">
    <form method="post" onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text" 
        placeholder="Enter username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text" 
        placeholder="Location..."
        value={location}
        onChange={(e) => setLocatiion(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="number" 
        placeholder="Min Repos..."
        value={minRepos}
        onChange={(e) => setMinRepos(e.target.value)}
        className="border p-2 w-full"
      />
      <button 
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer"
      >
        Search
      </button>
    </form>

    {loading && <p className="mt-4 text-gray-600">Loading...</p>}
    {error && <p className="mt-4 text-red-600"><b>Looks like we cant find the user.</b></p>}
    {results.length > 0 && (
      <div className="mt-6 space-y-6">
        {results.map(user => (
          <div key={user.login} className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
            <img src={user.avatar_url} alt="avatar" className="w-20 h-20 rounded-full border" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{user.name || user.login}</h2>
              <p className="text-gray-600">{user.bio || "No bio available"}</p>
              <div className="text-sm text-gray-500 mt-1 space-y-1">
                <p><strong>Username:</strong> {user.login}</p>
                {user.location && <p><strong>Location:</strong> {user.location}</p>}
                
              </div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                View GitHub Profile →
              </a>
            </div>
          </div>
        ))}
      </div>
    )}

    {!error && (
      results.length < totalCount && (
        <button 
          style={{ margin: "30px" }}
          onClick={handleLoadMore}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Load More
        </button>
      )
    )}

  </div>
 ) 
}

export default Search