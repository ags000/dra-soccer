import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/header/Header'
import './Videos.css'

const processDate = (str) => {
  const d = new Date(str);

  return d.toLocaleDateString();
}

const Videos = () => {
  const [loadingQuery, setLoadingQuery] = useState(true);
  const [errorQuery, setErrorQuery] = useState(false);
  const [videoList, setVideoList] = useState([]);

  const [actualVideo, setActualVideo] = useState(0);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_PATH}/api/feed`)
    .then((resp) => {
      console.log(resp.data)
      setVideoList(resp.data.response);
    })
    .catch((e) => {
      console.log(e)
      setErrorQuery(true);
    })
    .finally(() => setLoadingQuery(false));
  }, [])

  if(videoList && !loadingQuery && !errorQuery) {
    console.log(videoList)
    return (
      <div style={{height: '100%'}}>
        <Header />
      
        <div className='cardscontainer'>
          <div className='cardscontainer_card' >
            {videoList.map((video, index) => {

              if (index !== actualVideo) return null;
              return (
                <div key={`card_${index}`}>
                  <p className='cardscontainer_card-title'>{video.title}</p>
                  <p className='cardscontainer_card-competition'>{video.competition}</p>
                  <p className='cardscontainer_card-date'>{processDate(video.date)}</p>
                  <div className="" dangerouslySetInnerHTML={{ __html: video.videos[0].embed}}></div>
                </div>
              )
              })}

              <div className="cardscontainer_card_settings">
                <div className="cardscontainer_card_videonum">
                  <p>Showing video: </p>
                  <p className='cardscontainer_card_videonum-actual'>{actualVideo+1}</p>
                  <p>/</p>
                  <p>{videoList.length}</p>
                </div>
                
                <div className="cardscontainer_card-button-list">
                  <button className='btn-previous' onClick={() => setActualVideo(prev => {
                    if (prev >= 1) return prev - 1;
                    return prev;
                    })}>Previous video</button>
                  <button className='btn-next' onClick={() => setActualVideo(prev => {
                    if (prev < videoList.length - 1) return prev + 1;
                    return prev;
                  })}>Next video</button>
                </div>
              </div>

            

            
            {/* <div className="" dangerouslySetInnerHTML={{ __html: videoList[0].response.videos[0].embed}}></div> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* <p>Loading, wait a while...</p> */}

    </>
  )
}

export default Videos
