import React from 'react'

export default function Halmet(prob) {
    document.title = prob.title
  return (
    <div>{prob.children}</div>
  )
}
