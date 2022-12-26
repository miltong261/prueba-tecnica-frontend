<template>
  <h1>Lista de Tipos de Vehículos</h1>
  <div class="hello">
    <button
      type="button"
      @click="open_modal('create')"
      class="btn btn-success mb-2"
    >
      Agregar tipo de Vehículo
    </button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th>Nombre</th>
          <th>Tarifa</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(type_vehicle, index) in type_vehicles"
          :key="type_vehicle.type_vehicle_id"
        >
          <td v-text="index + 1" class="text-center"></td>
          <td>{{ type_vehicle.name }}</td>
          <td>{{ type_vehicle.rate }}</td>
          <td>
            <template v-if="type_vehicle.type_vehicle_id != 1">
              <button
                type="button"
                @click="open_modal('update', type_vehicle)"
                class="btn btn-warning mb-2 mr-2"
              >
                Editar
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      :class="{ mostrar: modal }"
      class="modal fadeInDown show"
      role="dialog"
      style="display: none"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header dark-header">
            <h5 class="modal-title m-1" v-text="modal_title"></h5>
            <button
              type="button"
              @click="close_modal()"
              class="close"
              aria-label="Close"
            >
              X
            </button>
          </div>

          <div class="modal-body">
            <template v-if="error">
              <div
                class="alert alert-danger"
                v-for="error_name in errors"
                :key="error_name"
              >
                <li>{{ error_name }}</li>
              </div>
            </template>
            <form
              method="post"
              enctype="multipart/form-data"
              class="needs-validation"
              novalidate
              action="javascript:void(0)"
            >
              <div class="form-group">
                <label class="text-dark" for="name"> Nombre</label>
                <input
                  type="text"
                  v-model="name"
                  class="form-control"
                  name="name"
                  :disabled="is_enabled ? '' : disabled"
                />

                <label class="text-dark" for="tarofa"> Tarifa por minuto</label>
                <input
                  type="number"
                  v-model="rate"
                  class="form-control"
                  name="rate"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-cerrar" @click="close_modal()">
              Cancelar
            </button>
            <button
              type="button"
              v-if="option == 1"
              class="btn btn-guardar"
              @click="store()"
            >
              Guardar
            </button>
            <button
              type="button"
              v-if="option == 2"
              class="btn btn-warning"
              @click="update()"
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      //Data
      type_vehicles: [],
      type_vehicle_id: 0,
      name: "",
      rate: 0.0,

      //Modal
      option: 0,
      modal_title: "Tipo de vehiculo",
      modal: 0,
      error: false,
      errors: [],
      is_enabled: false,
    };
  },
  methods: {
    open_modal(method, data = []) {
      switch (method) {
        case "create": {
          this.modal = 1;
          this.option = 1;
          break;
        }
        case "update": {
          this.modal = 2;
          this.option = 2;
          this.is_enabled = true;
          this.type_vehicle_id = data["type_vehicle_id"];
          this.name = data["name"];
          this.rate = data["rate_real"];
          break;
        }
      }
    },
    close_modal() {
      this.modal = 0;
      this.option = 0;

      this.error = false;
      this.errors = [];

      this.name = "";
      this.rate = 0.0;
    },
    refresh_data() {
      axios
        .get("http://prueba-tecnica-backend.test/api/v1/type_vehicles")
        .then((response) => {
          this.type_vehicles = response.data.data;
        });
    },
    store() {
      axios
        .post("http://prueba-tecnica-backend.test/api/v1/type_vehicles", {
          name: this.name,
          rate: this.rate,
        })
        .then((response) => {
          alert(response.data.message);
          this.close_modal();
          this.refresh_data();
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.error = true;
            this.errors = error.response.data.errors;
          } else {
            alert("Hubo un problema al guardar el recurso");
          }
        });
    },
    update() {
      axios
        .put(
          "http://prueba-tecnica-backend.test/api/v1/type_vehicles/" +
            this.type_vehicle_id,
          {
            rate: this.rate,
          }
        )
        .then((response) => {
          alert(response.data.message);
          this.close_modal();
          this.refresh_data();
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.error = true;
            this.errors = error.response.data.errors;
          } else {
            alert("Hubo un problema al guardar el recurso");
          }
        });
    },
  },
  mounted: function () {
    this.refresh_data();
  },
};
</script>
