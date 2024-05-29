import React, { useState, useEffect } from 'react'
import './App.css'

function App(props: { children: React.ReactNode }) {
  return (
    <div className="App">
      { props.children }
      <div className="console"></div>
    </div>
  )
}

export default App
