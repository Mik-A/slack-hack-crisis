import React, { useRef, useEffect, useState, Fragment } from 'react'
import download from 'in-browser-download'

import '../styles/branding.css'
import '../styles/common.css'

const FrontPage = () => {
  // const [query, setQuery] = useState('C01087KPKQU')
  const [data, setData] = useState({
    loading: false,
    msg: '',
    fileName: 'no file uploaded',
    textsOnlyArr: [],
    listChannels: []
  })

  useEffect(() => {
    setData({ loading: true, listChannels: [] })
    fetch('/.netlify/functions/getChannels', {
      method: 'get'
    })
      .then((response) => response.json())
      .then((json) => {
        setData({ loading: false, listChannels: json.list.channels || [] })
      })
  }, [])

  const ShowChannels = () => {
    return (
      <>
        <input type='button' value='Collection' />
        {data.listChannels &&
          data.listChannels.map((x, i) => (
            <input
              type='button'
              onClick={handleApiCall('getMessages')}
              value={x.name}
              id={x.id}
              key={i}
            />
          ))}
      </>
    )
  }

  const handleApiCall = (api) => (e) => {
    e.preventDefault()
    console.log('e.target', e.target)
    setData({ loading: true })
    const channel = e.target.id
    fetch('/.netlify/functions/' + api, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fetchMessage: 'Fetch request from front',
        channel
      })
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('json', json)
        setData({
          loading: false,
          msg: json.msg,
          textsOnlyArr: json.textsOnlyArr,
          listChannels: [...data.listChannels]
        })
        // download(json.encoded, 'encoded.txt')
      })
  }
  return (
    <article className='main'>
      <ShowChannels />
      {data.loading ? 'Loading...' : ''}
      <p></p>
      <section className='preview'>
        {data.textsOnlyArr &&
          data.textsOnlyArr.map((x, i) => <p key={x + '-i'}>{x}</p>)}
      </section>
    </article>
  )
}

export default FrontPage
