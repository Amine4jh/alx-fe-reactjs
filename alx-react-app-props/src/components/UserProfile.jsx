import { useContext } from "react";
import UserContext from "./UserContext";

function UserProfile(props) {
    const userData = useContext(UserContext)

    return (
        <div>
            <h2>{userData.name}</h2>
            <p>Age: {props.age}</p>
            <p>Bio: {props.bio}</p>
        </div>
    )
}

export default UserProfile