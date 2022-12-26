<template>
  <h1>Lista de Empleados</h1>
  <div class="hello">
    <button
      type="button"
      @click="open_modal('create')"
      class="btn btn-success mb-2"
    >
      Agregar Empleado
    </button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="employee.employee_id">
          <td v-text="index + 1" class="text-center"></td>
          <td>{{ employee.first_name }}</td>
          <td>{{ employee.last_name }}</td>
          <td>
            <button
              type="button"
              @click="open_modal('update', employee)"
              class="btn btn-warning mb-2 mr-2"
            >
              Editar
            </button>
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
                <label class="text-dark" for="first_name"> Nombres</label>
                <input
                  type="text"
                  v-model="first_name"
                  class="form-control"
                  name="first_name"
                />

                <label class="text-dark" for="last_name"> Apellidos</label>
                <input
                  type="text"
                  v-model="last_name"
                  class="form-control"
                  name="last_name"
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
      employees: [],
      employee_id: 0,
      first_name: "",
      last_name: "",

      //Modal
      option: 0,
      modal_title: "Empleado",
      modal: 0,
      error: false,
      errors: [],
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
          this.employee_id = data["employee_id"];
          this.first_name = data["first_name"];
          this.last_name = data["last_name"];
          break;
        }
      }
    },
    close_modal() {
      this.modal = 0;
      this.option = 0;

      this.error = false;
      this.errors = [];

      this.first_name = "";
      this.last_name = "";
    },
    refresh_data() {
      axios
        .get("http://prueba-tecnica-backend.test/api/v1/employees")
        .then((response) => {
          this.employees = response.data.data;
        });
    },
    store() {
      axios
        .post("http://prueba-tecnica-backend.test/api/v1/employees", {
          first_name: this.first_name,
          last_name: this.last_name,
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
          "http://prueba-tecnica-backend.test/api/v1/employees/" +
            this.employee_id,
          {
            first_name: this.first_name,
            last_name: this.last_name,
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
            alert("Hubo un problema al actualizar el recurso");
          }
        });
    },
  },
  mounted: function () {
    this.refresh_data();
  },
};
</script>
