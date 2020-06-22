import React from 'react'
import { Helmet } from 'react-helmet'

const Head = (props) => (
  <Helmet>
    <title>Jazz Asein - {props.title}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#FF0000" />
  </Helmet>
)

export default Head
