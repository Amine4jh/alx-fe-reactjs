import { Link } from "react-router-dom"

const Navbar = () => {
	return (
		<div style={{ margin: "auto", display: "flex", justifyContent: "space-evenly", width: "300px" }}>
			<Link to={"/"}>
				<a>Home</a>
			</Link>
			<Link to={"/about"}>
				<a>About</a>
			</Link>
			<Link to={"/services"}>
				<a>Services</a>
			</Link>
			<Link to={"/contact"}>
				<a>Contact</a>
			</Link>
		</div>
	)
}

export default Navbar