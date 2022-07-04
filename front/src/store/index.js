// stores/counter.js
import { defineStore } from "pinia";
import axios from "axios";
import { jwtGenerator } from "../services/jwt";
const API_URL = "http://localhost:3001/tutorials";

export const useTutorials = defineStore("tutorials", {
  state: () => ({
    tutorials: [],
    currentTutorialId: null,
    tutorial: {
      id: "",
      title: "",
      description: "",
      published: false,
      videoUrl: "",
    },
    filter: null,
  }),
  getters: {
    getAllTutorials(state) {
      state.currentTutorialId = null;
      state.tutorial = null;
      if (!this.filter) {
        return state.tutorials;
      } else {
        return state.filteredTutorials;
      }
    },
    getFilter(state) {
      return state.filter;
    },
    getTutorialById(state) {
      return (tutorialId) => {
        return state.tutorials.filer(({ id }) => tutorialId == id);
      };
    },
    getSelectedTutorial(state) {
      if (state.tutorial === null) {
        return {
          id: "",
          title: "",
          description: "",
          published: false,
          videoUrl: "",
        };
      }
      return state.tutorial;
    },
  },
  actions: {
    async fetchTutorials() {
      try {
        const data = await axios.get(`${API_URL}`);
        this.tutorials = data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchTutorial(tutorialId) {
      try {
        const data = await axios.get(`${API_URL}/${tutorialId}`);
        this.tutorial = data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async selectTutorial(tutorialId) {
      this.currentTutorialId = tutorialId;
      if (!tutorialId) {
        this.tutorial = null;
      } else {
        this.fetchTutorial(tutorialId);
      }
    },
    setFilter(filter) {
      this.filter = filter;
      if (this.filter) {
        this.filteredTutorials = this.tutorials.filter(({ title }) => {
          return title.includes(this.filter.title);
        });
      } else {
        this.fetchTutorials();
      }
    },
    async createTutorial(tutorial) {
      // Auth test
      // let creationDate = new Date(1990, 10, 10);
      let creationDate = new Date();
      let jwt;
      try {
        const header = {
          alg: "HS256",
          typ: "JWT",
        };
        const payload = {
          timestamp: creationDate.valueOf(),
        };
        const secret = "should be a build variable";
        jwt = jwtGenerator({ header, payload, secret });
      } catch (e) {
        console.log(e);
      }
      try {
        const newTutorial = await axios.post(`${API_URL}/`, tutorial, {
          headers: {
            "X-request-timestamp": jwt,
          },
        });
        this.tutorial = newTutorial.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateTutorial(tutorial) {
      try {
        const updateTutorial = await axios.put(
          `${API_URL}/${tutorial.id}`,
          tutorial
        );
        this.tutorial = updateTutorial.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async deleteTutorial(tutorialId) {
      try {
        await axios.delete(`${API_URL}/${tutorialId}`);
        await this.fetchTutorials();
        this.currentTutorialId = null;
        this.tutorial = null;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async deleteAllTutorials() {
      try {
        await axios.delete(`${API_URL}/mass_delete`);
        this.tutorials = [];
        this.currentTutorialId = null;
        this.tutorial = null;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
