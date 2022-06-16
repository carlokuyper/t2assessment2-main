import React, {useState} from 'react'
import axios from 'axios';
import EditPost from './EditPost';

const PostItem = (props) => {

  const [modal, setModal] = useState();

  const editPost = () => {
    setModal(<EditPost upRender={props.rerender} rerender={setModal} original={props.message} id={props.uniqueId} />)
  }

  const deletPost = () => {
    if(window.confirm("Are you sure you want to delete the post") == true){
      
      let postId = {id: props.uniqueId}

    axios.post('http://localhost:80/assessment2Api/deletePost.php', postId)
    .then((response) => {
      let data = response.data;
      // console.log(data);
      props.rerender(true);
      console.log("The usere deleted")
    });
      
    } else {
      console.log("The usere did not delete the post")
    }
  }

  return (
    <div>
      {modal}
      <div id={props.uniqueId} className='post_item'>

          <h3 className='userPost'>{props.userpost}</h3>
          <h5 className='date'>{props.date}</h5>

          <p className="mess">{props.message}</p>
          <div className='postUi'>
            <div className='edit' onClick={editPost}>Edit Post</div>
            <div className='delete' onClick={deletPost}>Delete Post</div>
          </div>
      </div>
    </div>
  )
}

export default PostItem
