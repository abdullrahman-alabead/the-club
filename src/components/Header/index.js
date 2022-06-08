import "./index.scss";
import { auth } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { searchbarActions } from "../../store/searchbarSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();
  // searchbar logic
  let dispatch = useDispatch();
  let { searchText, searchResults, selectedUsers } = useSelector(
    (store) => store.searchBar
  );
  let users = useSelector((store) => store.users.users);

  let user = auth.currentUser;

  // Drop Menu
  let dropped = false;
  function activatMenu() {
    let logOutBtn = document.querySelector(".log-out");
    let cInfo = document.querySelector(".c-info")
    if (!dropped) {
      logOutBtn.style.animation = "fadeInDown 0.3s ease-out forwards";
      logOutBtn.style.display = "block";
      cInfo.style.animation = "fadeInDown 0.3s ease-out forwards";
      cInfo.style.display = "block";
      dropped = true;
    } else {
      logOutBtn.style.animation = "fadeOut 0.3s ease-out forwards";
      cInfo.style.animation = "fadeOut 0.3s ease-out forwards";
      setTimeout(() => {
        logOutBtn.style.display = "none";
        cInfo.style.display = "none";

        dropped = false;
      }, 300);
    }
  }
  return (
    <div className="page-header">
      <p className="logo">Club</p>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search Users to filter the posts..."
          onChange={(e) =>
            dispatch(searchbarActions.updateSearch(e.target.value))
          }
        />
        <ul
          className="search-results"
          style={{ display: `${searchText ? "flex" : "none"}` }}
        >
          {users &&
            users.map((data) => {
              let user = data.data();
              return user.name.includes(`${searchText}`) ? (
                <li className="result" key={user.id}>{user.name}</li>
              ) : (
                ""
              );
            })}
        </ul>
      </div>
      <div className="user-info">
        <img src={auth.currentUser.photoURL} className="user-pic" alt="user-pic" />
        <p className="user-name">{user.displayName}</p>
        <button className="d-menu">
          <div className="menu">
            <div className="arrow" onClick={activatMenu}></div>
            <button className="log-out btn" onClick={() => auth.signOut()}>
              Log Out
            </button>
            <button className="btn c-info" onClick={() => {navigate("/changeInfo")}}>Change user info</button>
          </div>
        </button>
      </div>
    </div>
  );
}
