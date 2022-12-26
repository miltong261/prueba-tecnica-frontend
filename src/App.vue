<template>
  <h3 class="d-flex justify-content-center">Acceso de Vehículos</h3>
  <h5 class="d-flex justify-content-center">Prueba Técnica BlueMedical</h5>
  <nav class="navbar navbar-expand-sm bg-light navbar-dark">
    <ul class="navbar-nav">
      <li class="nav-item m-1">
        <router-link class="btn btn-light btn-outline-primary" to="/employees"
          >Empleados</router-link
        >
      </li>
      <li class="nav-item m-1">
        <router-link
          class="btn btn-light btn-outline-primary"
          to="/type_vehicles"
          >Tipo de Vehiculos</router-link
        >
      </li>
      <li class="nav-item m-1">
        <router-link
          class="btn btn-light btn-outline-primary"
          to="/transactions"
          >Estacionamiento</router-link
        >
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<style>
@import url(https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css);
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.mostrar {
  display: block !important;
  opacity: 1 !important;
  position: absolute !important;
  background-color: rgb(136, 142, 168, 0.4) !important;
}
.btn-cerrar {
  background-color: #f8538d !important;
  color: white !important;
}

label {
  float: left;
}
</style>
