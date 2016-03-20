import React, { Component } from 'react'
import './NotFound.scss'

export default class NotFound extends Component {
  render () {
    return (
      <div className='NotFound'>
        <h1>Page Not Found</h1>
        <p>If you received this in error, <br/> Please <a href='mailto:kyper.dev@gmail.com'>Email Us </a></p>
      </div>
    )
  }
}
