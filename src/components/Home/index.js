import "./index.scss";
import Header from "../Header";
import Sidebar from "../Sidebar";
import React from "react";
import TextPost from "./components/TextPost";
import SkeletonPost from "./components/SkeletonPost";
import { auth, database, storage } from "../../firebaseConfig";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newPostActions } from "../../store/newPostSlice";
import { postsActions } from "../../store/PostsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPaperPlane,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  refEqual,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";

export default function Home() {
  let dispatch = useDispatch();
  // check if logged in
  let [loggedin, setLoggedin] = React.useState(false);
  let navigate = useNavigate();
  React.useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setLoggedin(true);
          // if not : navigate to login page
        } else navigate("/");
      },
      []
    );
  });


  // send post
  let postsCollectionRef = collection(database, "posts");
  let post = useSelector((store) => store.newPost);
  function sendPost() {
    // check if post is empty
    if (!img && !post.text) {
      return;
    }
    setIsSending(true)
    // if it has an image :
    if (img) {
      // upload img to firebase storage
      let storageRef = ref(storage, "postImages/" + img.name);
      let uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        // send post info to firestore with the img url
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              let id = nanoid();
              document.querySelector(".new-post-text").value = "";
              setDoc(doc(database, "posts", id), { ...post, id: id, imgURL: url,userName: auth.currentUser.displayName, userPic: auth.currentUser.photoURL, sendTime: Date.now() })
                .catch((err) => console.log(err.message));
            })
            .then(() => {
              dispatch(newPostActions.updatePostText(''))
              setImage(null);
              document.querySelector(".file").value = null;
              setIsSending(false)
            });
            
        }
      );
    }
    // if it does not have an image:

    if (!img) {
      let id = nanoid();
      document.querySelector(".new-post-text").value = "";
      setDoc(doc(database, "posts", id), { ...post, id: id, userName: auth.currentUser.displayName, userPic: auth.currentUser.photoURL, sendTime: Date.now() })
        .then(() => {dispatch(newPostActions.updatePostText(''))
        setImage(null);
        setIsSending(false)
        document.querySelector(".file").value = null;}
        )
        .catch((err) => console.log(err.message));
    }
  }

  // check if the post is being sent
  let [isSending, setIsSending] = React.useState(false)

  // get Posts
  let [postsLength, setPostsLength] = React.useState(0);
  let posts = useSelector((store) => store.posts);
  let q = query(postsCollectionRef, orderBy("sendTime", "desc"));

  onSnapshot(q, (data) => {
    let docs = data.docs;

    setPostsLength(docs.length);
  });
  React.useEffect(() => {
    getDocs(q).then((data) => {
      let docs = data.docs;
      dispatch(postsActions.setPosts(docs.map((doc) => doc.data())));
    });
  }, [postsLength]);

  // sending images
  let [img, setImage] = React.useState(null);

  return (
    loggedin && (
      <>
        <Header />
        <Sidebar />
        <ul className="posts-list">
          <li className="add-post">
            <input
              className="new-post-text"
              placeholder="What are you thinking about ?!"
              onChange={(e) => {
                dispatch(
                  newPostActions.updatePostText(
                    e.target.value
                  )
                );
              }}
            />
            <div className="buttons">
              <button className="send-post" onClick={sendPost} disabled={isSending}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              <button
                className="add-image"
                onClick={() => document.querySelector(".file").click()}
                disabled={isSending}
              >
                <FontAwesomeIcon icon={faImage} />
              </button>
              <input
                type="file"
                className="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                style={{ display: "none" }}
              />
              {img && (
                <div className="img-info">
                  <p className="img-name">{img.name}</p>
                  <button
                    className="remove-img"
                    onClick={() => {
                      setImage(null);
                      document.querySelector(".file").value = null;
                    }}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
              )}
            </div>
          </li>
          {posts?
            posts.map((post) => {
              return <TextPost {...post} />;
            }) : <><SkeletonPost /><SkeletonPost /></>}
        </ul>
      </>
    )
  );
}
