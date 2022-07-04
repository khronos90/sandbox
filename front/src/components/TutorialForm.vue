<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import router from "../router";
import { useTutorials } from "../store";
import CardNotification from "./CardNotification.vue";

const route = useRoute();
const tutorialStore = useTutorials();
const tutorialId = computed(() => route.params.id);
let tutorialModel = ref({
  id: "",
  title: "",
  description: "",
  published: false,
  videoUrl: "",
});
let addTutorial = ref(false);

let errors = reactive({});
let authError = ref(false);

const validateVideoUrl = (videoUrl) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return !!pattern.test(videoUrl);
};

const tutorialValidation = () => {
  errors.title = "";
  errors.videoUrl = "";
  if (!tutorialModel.value.title) {
    errors.title = "El titulo es requerido!";
  }
  if (!validateVideoUrl(tutorialModel.value.videoUrl)) {
    errors.videoUrl = "La url es invalida!";
  }
};

const handleModelUpdate = (e) => {
  tutorialValidation();

  if (!errors.title && !errors.videoUrl) {
    if (tutorialModel.value.id) {
      // Put case
      tutorialStore.updateTutorial(tutorialModel.value);
    } else {
      // Create case
      tutorialStore
        .createTutorial(tutorialModel.value)
        .then((e) => {
          addTutorial.value = true;
        })
        .catch((e) => {
          authError.value = true;
        });
    }
  }
};

const handleDeleteTutorial = async () => {
  if (tutorialModel.value.id) {
    // Delete case
    await tutorialStore.deleteTutorial(tutorialId.value);
    router.push("/tutorials/");
  }
};

const handleAddNewTutorial = () => {
  addTutorial.value = false;
  tutorialModel.value = {
    id: "",
    title: "",
    description: "",
    published: false,
    videoUrl: "",
  };
  tutorialStore.selectTutorial(null);
};

onMounted(async () => {
  if (tutorialId.value) {
    await tutorialStore.fetchTutorial(tutorialId.value);
    tutorialModel.value = tutorialStore.getSelectedTutorial;
  }
});
</script>

<template>
  <CardNotification v-if="addTutorial">
    <template v-slot:description>
      El tutorial se agregó correctamente!
    </template>
    <template v-slot:action>
      <div class="d-grid">
        <button class="btn btn-success" @click="handleAddNewTutorial">
          Agregar otro tutorial
        </button>
      </div>
    </template>
  </CardNotification>
  <div class="card text-bg-light" v-else>
    <form
      class="card-body needs-validation"
      @submit.prevent="handleModelUpdate"
    >
      <div class="d-flex justify-content-between">
        <h5 class="card-title">Editar Tutorial</h5>
        <button
          v-if="tutorialId"
          type="button"
          class="btn btn-sm btn-danger"
          aria-label="Close"
          @click="handleDeleteTutorial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path
              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
            />
          </svg>
        </button>
      </div>
      <hr />
      <div class="mb-3">
        <label for="title" class="form-label">Título</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.title }"
          id="title"
          v-model="tutorialModel.title"
        />
        <div class="invalid-feedback">{{ errors.title }}</div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Descripción</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="tutorialModel.description"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Video Url</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.videoUrl }"
          id="description"
          v-model="tutorialModel.videoUrl"
        />
        <div class="invalid-feedback">{{ errors.videoUrl }}</div>
      </div>
      <fieldset class="row mb-3">
        <legend class="col-form-label pt-0">
          Como quiero mantener el tutorial?
        </legend>

        <div class="input-group">
          <div class="form-check form-check-inline">
            <input
              type="radio"
              name="published"
              class="form-check-input"
              id="published"
              v-model="tutorialModel.published"
              :value="true"
            />
            <label class="form-check-label" for="published">Público</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              type="radio"
              name="published"
              class="form-check-input"
              id="hidden"
              v-model="tutorialModel.published"
              :value="false"
            />
            <label class="form-check-label" for="hidden">Oculto</label>
          </div>
        </div>
      </fieldset>
      <div class="mb-3 text-danger" v-if="authError">
        <p>Authentication error</p>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">
          {{ tutorialId ? "Actualizar" : "Guardar" }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
