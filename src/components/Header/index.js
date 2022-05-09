import "./index.scss";
import { auth } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { searchbarActions } from "../../store/searchbarSlice";
import { updateProfile } from "firebase/auth";

export default function Header() {
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
    let menu = document.querySelector(".log-out");
    if (!dropped) {
      menu.style.animation = "fadeInDown 0.3s ease-out forwards";
      menu.style.display = "block";
      dropped = true;
    } else {
      menu.style.animation = "fadeOut 0.3s ease-out forwards";
      setTimeout(() => {
        menu.style.display = "none";

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
                <li className="result">{user.name}</li>
              ) : (
                ""
              );
            })}
        </ul>
      </div>
      <div className="user-info">
        <img src={auth.currentUser.photoURL} className="user-pic" />
        <p className="user-name">{user.displayName}</p>
        <button className="d-menu">
          <div className="menu">
            <div className="arrow" onClick={activatMenu}></div>
            <button className="log-out" onClick={() => auth.signOut()}>
              Log Out
            </button>
          </div>
        </button>
      </div>
    </div>
  );
}
