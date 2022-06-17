import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { auth, database } from "../../../../firebaseConfig";
import { nanoid } from "nanoid";

export default function Comments(props) {
  // getComments
  let commentsCollectionRef = collection(
    database,
    "posts",
    `${props.id}`,
    "comments"
  );
  let [comments, setComments] = React.useState(null);
  React.useEffect(() => {
    onSnapshot(commentsCollectionRef, (data) => {
      let docs = data.docs;
      setComments(docs.map((doc) => doc.data()));
    });
  }, []);

  // send Comment
  let [comment, setComment] = React.useState("");
  function sendComment() {
    document.querySelector(".my-comment").value = "";
    addDoc(commentsCollectionRef, {
      id: nanoid(),
      comment: comment,
      userName: props.name,
      userPhoto: props.pic,
    });
  }
  return (
    <div className="comments-section">
      <ul className="comments">
        {comments &&
          comments.map((comment) => (
            <li className="comment"  key={comment.id}>
              <img className="user-img" alt="user-pic" style={{width: "2rem",height: "2rem", borderRadius:"50%", marginRight:"0.5rem"}} src={comment.userPhoto} />
              <p>{comment.comment}</p>
            </li>
          ))}
      </ul>
      <div className="send-comment">
        <input
          className="my-comment"
          placeholder="add a Comment..."
          type="text"
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="comment-btn" onClick={sendComment}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}
