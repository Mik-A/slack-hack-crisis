import React, { useState } from 'react'
/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
const DragDropFile = (props) => {
  const suppress = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
  }
  const onDrop = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    const files = evt.dataTransfer.files
    if (files && files[0]) props.handleFile(files[0])
  }
  const onChangeHandler = async (event) => {
    var file = event.target.files[0]
    let text = await file.text()
    props.fileUploadHandler(text)
    props.updateFileName(file)
  }
  return (
    <div
      className='logic'
      onDrop={onDrop}
      onDragEnter={suppress}
      onDragOver={suppress}
    >
      <form method='post' action='#' id='#'>
        <div className='grid-2-col'>
          {props.fileName}
          <label className='file-handler'>
            Upload Your File
            <input
              type='file'
              name='file'
              onChange={onChangeHandler}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </form>
    </div>
  )
}

export default DragDropFile
