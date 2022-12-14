import React, { useState } from 'react'
import axios from 'axios'
import {useLocation, useNavigate} from 'react-router-dom'
import '../css/WritePost.css'

function WritePost() {

  const location = useLocation();
  const navigate = useNavigate();
  const [boardId, setBoardId] = useState(location.state.id)
  const [boardTitle, setBoardTitle] = useState(location.state.title)
  const [boardContent, setBoardContent] = useState(location.state.content)
      
  const deletePosts = async () => {
    await axios.delete('http://ec2-3-38-111-117.ap-northeast-2.compute.amazonaws.com:32574/api/boardsD/' + boardId,
    )
      .then(res => {  
        console.log(res);
        console.log(res.data);
        alert('글 삭제가 완료되었습니다.');
      })
    }


  const addPosts = async () => {
    //   const boardId = location.state.id
    //   const boardTitle  = location.state.title
    //   const boardContent = location.state.content
      console.log('-----addPosts-----')
      console.log('id', boardId)
      console.log('title', boardTitle)
      console.log('content', boardContent)


      let response = await axios
      .patch('http://ec2-3-38-111-117.ap-northeast-2.compute.amazonaws.com:32574/api/boardsR/'+ boardId, 
      {
          id : boardId,
          title: boardTitle,
          content : boardContent,
        //   params: {boardId},
      }).then(function (response) {
          console.log(response.data);
          console.log({boardId})
          console.log({boardTitle})
          console.log({boardContent})
          alert('글 수정이 완료되었습니다.')
          navigate("/BoardList")
      })
      .catch((error) => console.log('Error: ', error));
      if (response && response.data) {
          console.log('response:', response);
          console.log('response.data', response.data);
          alert('글 수정이 실패하였습니다.')
      }  
  };

    

  return (
    <div>
     <h1>글 수정</h1>
    <form>
        <br/>
        <label> Id : &nbsp; &nbsp;  &nbsp;&nbsp;&nbsp;</label>
        <input type="text" className='Box2' defaultValue={boardId} onChange={(e) => setBoardId(e.target.value)} />
        <br/>
        <label> Title :&nbsp; &nbsp; &nbsp; </label>
        <input type="text" className='Box2' defaultValue={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} />
        <br/>
        <label> Content : </label>
        <input type="text" className='Box2' defaultValue={boardContent} onChange={(e) => setBoardContent(e.target.value)}/>
        <br/>
       
        <br/>
     </form>
     <button className='id_deco' onClick={() => {   
                addPosts()}
            } type="button">
        글 수정</button>
     <button>
        <a className='id_deco' href="/BoardList">
        글 목록으로</a>
    </button>
     <button 
     type='button' 
     onClick={() => {deletePosts()}}>
    삭제</button>
</div>
);

}
export default WritePost;
