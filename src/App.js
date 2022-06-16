import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import PostItem from './components/PostItem'
import { useNavigate } from 'react-router-dom'

const App = () => {

  sessionStorage.setItem('activeUser', 'Carlo')

  const userId = window.sessionStorage.getItem("activeUser");

  const navigate = useNavigate();

  const [post, setPost] = useState();

  const [postMessage, setPostMessage] = useState({
    message: '',
    user: sessionStorage.getItem('activeUser')
  });


  const [renderPost, setRenderPost] = useState();

  //This useEffect will get the post by the user
  useEffect(() => {
    axios.post('http://localhost:80/assessment2Api/readUserPosts.php', userId)
      .then((response) => {
        let data = response.data;
        let renderPost = data.map((item) => <PostItem key={item.id} rerender={setRenderPost} uniqueId={item.id} userpost={item.userpost} date={item.timestamp} message={item.message}  />);
        // console.log(renderPost)
        setPost(renderPost);
        setRenderPost(false);
      })
      .catch(err=>{
        console.log(err);
      });
      
  },[renderPost]);

  const postVal = (e) => {
    let messageVal = e.target.value;
    setPostMessage({...postMessage, message: messageVal})
  }


  const addNewPost = (e) => {
    e.preventDefault();
    document.getElementById('textMes').value = '';

    axios.post('http://localhost:80/assessment2Api/addPost.php', postMessage)
    .then((response) => {
      let data = response.data;
      console.log(data);
      setRenderPost(true);
    });
  }

  const setLogOut = () => {
    sessionStorage.clear();
    navigate('/')
  }

  return (
    <div className="App">
      <div className="left">
        <h1>Your Post Timeline</h1>
        <p>Populate the area below with posts from the form to the right...</p>
        {post}
      </div>
      {/* <div className="right">
        <form>
          <h3>Add A New Post</h3>
          <textarea placeholder="your post here" onChange={postVal}/>
          <button type="submit" onClick={addNewPost}>Add Your New Post</button>
        </form>
      </div> */}


      <div className='right'>
      <form>
        <p>Add A New Post</p>
          <textarea id='textMes' placeholder='your post here' onChange={postVal} />
          <button type='submit' onClick={addNewPost}>Add Your New Post</button>
      </form>
    </div>

    {/* <div className='form'>
      <form>
        <p>Add New Post</p>
          <textarea id='textMes' placeholder='New Post Message' onChange={postVal} />
          <button type='submit' onClick={addNewPost}>Add Post To Timeline</button>
      </form>
    </div> */}
 

    </div>
  );
}

export default App;
