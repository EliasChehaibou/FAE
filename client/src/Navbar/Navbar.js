import React, {useState, useEffect} from 'react'

export default function () {
  return (
    <nav className='liste'>
        <ul className='items'>Acceuil</ul>
        <ul className='items'>Catégories</ul>
        <ul className='items'>S'inscrire</ul>
        <button className='btn'>Déplier</button>
    </nav>
  )
}
