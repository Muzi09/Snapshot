
import './Snapshot.css'
import axios from 'axios'
import { useEffect, useState } from 'react';

const Snapshot = () => {
    const [value, setValue] = useState('')
    const [photosArr, setPhotosArr] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    function renderImages() {
        setInput(value)
        setLoading(true)
        axios.get('https://api.flickr.com/services/rest', {
            params: {
                method: 'flickr.photos.search',
                api_key: '7094928db7968fd909793816077cfaf1',
                text: input,
                format: 'json',
                nojsoncallback: 1,
                per_page: 20
            }
        })
            .then((res) => {
                setPhotosArr(res.data.photos.photo)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (input !== "") {
            renderImages()
        }
    }, [input])

    console.log(photosArr)

    return (
        <div>
            <h1 className='heading'>SnapShot</h1>
            <input className='search' type="text" placeholder='Search...' onChange={(e) => { setValue(e.target.value) }} />
            <button className='search-button' onClick={() => { renderImages() }}>Search</button>
            <div id='container'>

                <button className='mountain' onClick={() => {
                    setInput('Mountain')
                }}>Mountain</button>

                <button className='beaches' onClick={() => {
                    setInput('Beaches')
                }}>Beaches</button>

                <button className='birds' onClick={() => {
                    setInput('Birds')
                }}>Birds</button>

                <button className='food' onClick={() => {
                    setInput('Food')
                }}>Food</button>

            </div>
            {loading ? (
                <div className='loading'>Loading...</div>
            ) : (
            <div id='img-container'>
                {photosArr.map((photo) => {
                    return (
                        <img className='img' key={photo.id} src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
                    )
                })}
            </div>
            )}
        </div>
    )
}

export default Snapshot


// Key:
// 7094928db7968fd909793816077cfaf1

// Secret:
// 7e5bcd29c910579a