import React, { useRef, useEffect, useState, Fragment } from 'react'
import download from 'in-browser-download'
import Linkify from 'react-linkify'

import '../styles/branding.css'
import '../styles/common.css'

const FrontPage = () => {
  // const [query, setQuery] = useState('C01087KPKQU')
  const [data, setData] = useState({
    loading: false,
    msg: '',
    fileName: 'no file uploaded',
    textsOnlyArr: [],
    listChannels: [],
    collected: null,
    activeBtn: false
  })
  const [search, setSearch] = useState('')
  const [collection, setCollection] = useState(['Collection: '])

  const handleSearch = (e) => setSearch(e.target.value)

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
        <input
          className={data.activeBtn == 'Collection' ? 'bg-grey' : ''}
          type='button'
          value='Collection'
          onClick={() => {
            setData({
              collected: true,
              listChannels: [...data.listChannels],
              activeBtn: 'Collection'
            })
          }}
        />
        {data.listChannels &&
          data.listChannels.map((x, i) => (
            <input
              type='button'
              className={data.activeBtn === x.id ? 'bg-grey' : ''}
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
    const channel = e.target.id
    setData({
      loading: true,
      listChannels: [...data.listChannels]
    })
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
        setData({
          loading: false,
          msg: json.msg,
          textsOnlyArr: json.textsOnlyArr,
          listChannels: [...data.listChannels],
          collected: null,
          activeBtn: channel
        })
      })
  }

  const View = () => {
    const string = new RegExp(search, 'i')
    return (
      <section className='preview'>
        {data.textsOnlyArr &&
          data.textsOnlyArr.map((x, i) => {
            if (x.match(string))
              return (
                <p key={x + i} className='message'>
                  <Linkify>{x}</Linkify>
                  <button
                    className='small-btn'
                    onClick={() => setCollection([...collection, x])}
                  >
                    +
                  </button>
                </p>
              )
            return ''
          })}
      </section>
    )
  }
  const Collection = () => {
    return (
      <div>
        {collection.map((x) => (
          <p>{x}</p>
        ))}
        {download(String(collection.join('\n')), 'collection.txt')}
      </div>
    )
  }
  return (
    <>
      <div className='fixed-right'>
        <input
          type='text'
          placeholder='search'
          value={search}
          onChange={handleSearch}
        />
      </div>
      <article className='main'>
        <ShowChannels />
        {data.loading ? 'Loading...' : ''}
        <p></p>
        {data.collected ? <Collection /> : <View />}
      </article>
    </>
  )
}

export default FrontPage
