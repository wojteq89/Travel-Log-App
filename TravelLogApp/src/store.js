import { createStore } from 'vuex';

const store = createStore({
  state: {
    photos: [],
  },
  mutations: {
    ADD_PHOTO(state, photo) {
      state.photos.push(photo);
    },
    SET_PHOTOS(state, photos) {
      state.photos = photos;
    },
    UPDATE_PHOTO(state, { index, photo }) {
      state.photos[index] = photo;
    },
    REMOVE_PHOTO(state, index) {
      state.photos.splice(index, 1);
    },
  },
  actions: {
    addPhoto({ commit, state }, photo) {
      commit('ADD_PHOTO', photo);

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

      const storedPhotos = JSON.stringify(state.photos);
      localStorage.setItem('photos', storedPhotos);
    },
    removePhoto({ commit, state }, index) {
      commit('REMOVE_PHOTO', index);

      const storedPhotos = JSON.stringify(state.photos);
      localStorage.setItem('photos', storedPhotos);
    },
  },
  getters: {
    photos: (state) => state.photos,
  },
});

export default store;
