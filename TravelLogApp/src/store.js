import { createStore } from 'vuex';

// Tworzenie Vuex Store
const store = createStore({
  state: {
    photos: [], // Tablica przechowująca zdjęcia z nazwą i opisem
  },
  mutations: {
    ADD_PHOTO(state, photo) {
      state.photos.push(photo);
    },
    SET_PHOTOS(state, photos) {
      state.photos = photos;
    },
    UPDATE_PHOTO(state, { index, photo }) {
      state.photos[index] = photo; // Zaktualizuj zdjęcie
    },
    REMOVE_PHOTO(state, index) {
      state.photos.splice(index, 1); // Usuń zdjęcie
    },
  },
  actions: {
    addPhoto({ commit, state }, photo) {
      commit('ADD_PHOTO', photo);

      // Zapisz zdjęcia w localStorage
      const storedPhotos = JSON.stringify(state.photos);
      localStorage.setItem('photos', storedPhotos);
    },
    loadPhotos({ commit }) {
      const storedPhotos = localStorage.getItem('photos');
      if (storedPhotos) {
        commit('SET_PHOTOS', JSON.parse(storedPhotos));
      }
    },
    updatePhoto({ commit, state }, { index, photo }) {
      commit('UPDATE_PHOTO', { index, photo });

      // Zapisz zdjęcia po aktualizacji w localStorage
      const storedPhotos = JSON.stringify(state.photos);
      localStorage.setItem('photos', storedPhotos);
    },
    removePhoto({ commit, state }, index) {
      commit('REMOVE_PHOTO', index);

      // Zapisz zdjęcia po usunięciu w localStorage
      const storedPhotos = JSON.stringify(state.photos);
      localStorage.setItem('photos', storedPhotos);
    },
  },
  getters: {
    photos: (state) => state.photos,
  },
});

export default store;
