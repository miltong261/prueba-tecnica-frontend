<template>
  <h1>Lista de Vehículos</h1>
  <div class="hello">
    <button
      type="button"
      @click="open_modal('start_time')"
      class="btn btn-success mb-2"
    >
      Registrar Entrada
    </button>
    &nbsp;
    <button
      type="button"
      @click="open_modal('end_time')"
      class="btn btn-danger mb-2"
    >
      Registrar Salida
    </button>
    &nbsp;
    <button
      type="button"
      @click="open_modal('report')"
      class="btn btn-info mb-2"
    >
      Reporte de Residentes
    </button>
    &nbsp;
    <button
      type="button"
      @click="open_modal('report', ['oficial'])"
      class="btn btn-info mb-2"
    >
      Reporte de Oficiales
    </button>
    &nbsp;
    <button type="button" @click="startMonth()" class="btn btn-warning mb-2">
      Empezar Mes
    </button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Matrícula</th>
          <th>Tipo de vehiculo</th>
          <th>Registró</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vehicle, index) in vehicles" :key="vehicle.vehicle_id">
          <td v-text="index + 1"></td>
          <td>{{ vehicle.matricula }}</td>
          <td>{{ vehicle.type_vehicle }}</td>
          <td>{{ vehicle.employee_name }}</td>
          <td>
            <button
              type="button"
              @click="open_modal('update', vehicle)"
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
                <template v-if="option == 3">
                  <label
                    class="text-dark"
                    for="pdf"
                    v-text="report_text"
                  ></label>
                  <input
                    type="text"
                    v-model="pdf"
                    class="form-control"
                    name="pdf"
                  />
                </template>
                <template v-if="option == 1 || option == 2 || option == 4">
                  <label class="text-dark" for="matricula"> Matrícula</label>
                  <input
                    type="text"
                    v-model="matricula"
                    class="form-control"
                    name="matricula"
                  />
                </template>

                <template v-if="option == 1">
                  <label class="text-dark" for="tipo_vehiculo">
                    Tipo de Vehículo</label
                  >
                  <select
                    id="select_tipo"
                    class="form-control"
                    v-model="type_vehicle_id"
                    @change="change_type_vehicle($event)"
                  >
                    <option
                      v-for="type_vehicle in type_vehicles"
                      :key="type_vehicle.type_vehicle_id"
                      :value="type_vehicle.type_vehicle_id"
                      v-text="type_vehicle.name"
                    ></option>
                  </select>

                  <label class="text-dark" for="empleado"> Empleado</label>
                  <select
                    id="select_tipo"
                    class="form-control"
                    v-model="employee_id"
                    @change="change_employee($event)"
                  >
                    <option
                      v-for="employee in employees"
                      :key="employee.employee_id"
                      :value="employee.employee_id"
                      v-text="employee.name"
                    ></option>
                  </select>
                </template>
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
              class="btn btn-success"
              @click="start_time()"
            >
              Registrar
            </button>
            <button
              type="button"
              v-if="option == 2"
              class="btn btn-warning"
              @click="end_time()"
            >
              Actualizar
            </button>
            <button
              type="button"
              v-if="option == 3"
              class="btn btn-info"
              @click="report()"
            >
              Generar
            </button>
            <button
              type="button"
              v-if="option == 4"
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
      vehicles: [],
      type_vehicles: [],
      employees: [],

      type_vehicle_id: 0,
      employee_id: 0,
      vehicle_id: "",
      matricula: "",
      pdf: "",
      pdf_type: false,
      report_text: "",

      //Modal
      option: 0,
      modal_title: "Vehículo",
      modal: 0,
      error: false,
      errors: [],
    };
  },
  methods: {
    open_modal(method, data = []) {
      switch (method) {
        case "start_time": {
          this.modal = 1;
          this.option = 1;
          break;
        }
        case "end_time": {
          this.modal = 2;
          this.option = 2;
          break;
        }
        case "report": {
          this.modal = 3;
          this.option = 3;
          this.report_text =
            data == "oficial" ? "Matrícula" : "Nombre para el reporte";
          this.pdf_type = data == "oficial" ? true : false;
          break;
        }
        case "update": {
          this.modal = 4;
          this.option = 4;
          this.vehicle_id = data["vehicle_id"];
          this.matricula = data["matricula_real"];
          break;
        }
      }
    },
    close_modal() {
      this.modal = 0;
      this.option = 0;
      this.matricula = "";
      this.pdf = "";
      this.error = false;
      this.errors = [];
    },
    refresh_data() {
      axios
        .get("http://prueba-tecnica-backend.test/api/v1/vehicles")
        .then((response) => {
          this.vehicles = response.data.data;
        });
    },
    select_type_vehicle() {
      axios
        .get("http://prueba-tecnica-backend.test/api/v1/type_vehicles")
        .then((response) => {
          this.type_vehicles = response.data.data;
        });
    },
    select_employee() {
      axios
        .get("http://prueba-tecnica-backend.test/api/v1/employees")
        .then((response) => {
          this.employees = response.data.data;
        });
    },
    change_type_vehicle: function (event) {
      this.type_vehicle_id = event.target.value;
    },
    change_employee: function (event) {
      this.employee_id = event.target.value;
    },
    start_time() {
      console.log(this.employee_id);
      axios
        .post(
          "http://prueba-tecnica-backend.test/api/v1/transactions/start_time",
          {
            matricula: this.matricula,
            type_vehicle_id: this.type_vehicle_id,
            employee_id: this.employee_id,
          }
        )
        .then((response) => {
          alert(response.data.message);
          this.close_modal();
          this.refresh_data();
          this.select_type_vehicle();
          this.select_employee();
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
    end_time() {
      axios
        .put(
          "http://prueba-tecnica-backend.test/api/v1/transactions/end_time",
          {
            matricula: this.matricula,
          }
        )
        .then((response) => {
          alert(response.data.message);
          if (response.data.type == 1) {
            window.open(
              "http://prueba-tecnica-backend.test/api/v1/transactions/oficial_vehicle_import/" +
                this.matricula
            );
          } else if (response.data.type == 3) {
            window.open(
              "http://prueba-tecnica-backend.test/api/v1/transactions/amount_import/" +
                this.matricula
            );
          }

          this.refresh_data();
          this.select_type_vehicle();
          this.select_employee();
          this.close_modal();
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
    startMonth() {
      axios
        .put(
          "http://prueba-tecnica-backend.test/api/v1/transactions/start_month",
          {}
        )
        .then((response) => {
          alert(response.data.message);
        });
    },
    report() {
      if (this.pdf_type) {
        window.open(
          "http://prueba-tecnica-backend.test/api/v1/transactions/oficial_vehicle_import/" +
            this.pdf
        );
      } else {
        window.open(
          "http://prueba-tecnica-backend.test/api/v1/transactions/report/" +
            this.pdf
        );
      }
      this.close_modal();
    },
    update() {
      axios
        .put(
          "http://prueba-tecnica-backend.test/api/v1/vehicles/" +
            this.vehicle_id,
          {
            matricula: this.matricula,
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
    this.select_type_vehicle();
    this.select_employee();
  },
};
</script>
