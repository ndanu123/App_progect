import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'

function NavBar() {
  return (
    <nav class="navbar navbar-expand-sm bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="src/Screenshot from 2025-05-24 13-55-14.png">Plume & Page</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">WELCOME</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">ABOUT</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Library">LIBRARY</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default NavBar