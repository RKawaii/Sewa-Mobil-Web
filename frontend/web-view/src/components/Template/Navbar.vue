<template>
  <div class="Navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" to="/profil">
          <img
            src="@/assets/images/dummy.jpg"
            alt="Dummy Picture"
            class="img-fluid rounded-circle mr-3"
            width="50"
            title="Mathias Yeremia Aryadi (Admin)"
          />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/beranda" class="nav-item nav-link">Beranda</router-link>
            <router-link to="/user" class="nav-item nav-link">Data User</router-link>
            <router-link to="/mobil" class="nav-item nav-link">Data Mobil</router-link>
            <router-link to="/sewa" class="nav-item nav-link">Data Sewa</router-link>
            <router-link to="/transaksi" class="nav-item nav-link">Data Transaksi</router-link>
            <router-link to="/riwayat" class="nav-item nav-link">Data Riwayat</router-link>
            <router-link to="/supir" class="nav-item nav-link">Data Supir</router-link>
            <router-link to="/staff" class="nav-item nav-link">Data Staff</router-link>
          </div>
        </div>
      </div>
    </nav>

    <slot></slot>
  </div>
</template>

