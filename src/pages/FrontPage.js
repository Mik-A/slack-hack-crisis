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
  const [collection, setCollection] = useState(['(Editable) Collection: '])
  const [toggleMain, setToggleMain] = useState(true)
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
    setToggleMain(false)
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
                    onClick={() => {
                      setCollection([...collection, x])
                    }}
                    className={`small-btn`}
                  >
                    +
                  </button>
                  <span>Add message to Collection</span>
                </p>
              )
            return ''
          })}
      </section>
    )
  }
  const Collection = () => {
    const string = new RegExp(search, 'i')
    const downloadText = () =>
      download(String(collection.join('\n')), 'collection.txt')

    return (
      <>
        <div
          contenteditable='true'
          onBlur={(e) => {
            console.log(e.currentTarget.textContent)
            setCollection([e.currentTarget.textContent])
          }}
        >
          {collection.map((x) => {
            if (x.match(string)) return <p>{x}</p>
            return ''
          })}
        </div>
        <button onMouseUp={() => downloadText()}>Download</button>
      </>
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
      <section className='fixed-right'>
        <button
          className='toggle-btn'
          onClick={() => setToggleMain(!toggleMain)}
        >
          &#8597;
        </button>
      </section>
      <section className={`main-container`}>
        <article className={`main ${toggleMain ? 'show' : 'hide'}`}>
          <ShowChannels />
        </article>
        <article className={`main `}>
          {data.loading ? 'Loading...' : ''}
          <p></p>
          {data.collected ? <Collection /> : <View />}
        </article>
      </section>
    </>
  )
}

export default FrontPage
