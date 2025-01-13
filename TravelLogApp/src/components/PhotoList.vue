<template>
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<div>
    <div v-if="photos.length" class="photo-list">
        <ul>
            <li v-for="(photo, index) in photos" :key="index">
                <div class="photo-container">
                    <div class="overlay"></div>
                    <img class="photo" :src="photo.url" alt="Photo" />
                    <button class="edit-button" v-if="!photo.isEditing" @click="editPhoto(index)">
                        <i class="fas fa-pencil-alt"></i> <br> <br> Edit
                    </button>
                    <button class="delete-button" @click="deletePhoto(index)">
                        <i class="fas fa-trash"></i> <br> <br> Delete
                    </button>

                    <div class="description">
                        <p class="photo-name">{{ photo.name }}</p>
                        <p class="photo-description">{{ photo.description }}</p>
                    </div>
                </div>

                <div v-if="photo.isEditing" class="photo-info">
                    <input v-model="photo.name" placeholder="Enter new name" />
                    <input v-model="photo.description" placeholder="Enter new description"/>
                    <button class="save-button" @click="saveChanges(index)">
                        <i class="fas fa-save"></i> Save Changes
                    </button>
                    <button class="cancel-button" v-if="photo.isEditing" @click="cancelEdit(index)">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </li>
        </ul>
    </div>
    <div v-else>
        <p class="no-photos">No photos available</p>
    </div>
</div>
</template>

  
<script>
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    name: 'PhotoList',
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['photos']),
    },
    methods: {
        ...mapActions(['loadPhotos', 'updatePhoto', 'removePhoto']),
        editPhoto(index) {
            // Rozpoczynamy edycję, ustawiamy isEditing na true
            this.photos[index].isEditing = true;
        },
        cancelEdit(index) {
            // Anulowanie edycji, ustawiamy isEditing na false
            this.photos[index].isEditing = false;
            // Opcjonalnie, jeśli chcesz przywrócić poprzednie wartości:
            // this.photos[index].name = this.photos[index].originalName;
            // this.photos[index].description = this.photos[index].originalDescription;
        },
        saveChanges(index) {
            // Zapisz zmiany
            this.updatePhoto({
                index,
                photo: this.photos[index]
            });
            this.photos[index].isEditing = false; // Po zapisaniu ukrywamy formularz edycji
        },
        deletePhoto(index) {
            this.removePhoto(index);
        },
    },
    mounted() {
        this.loadPhotos();
    },
};
</script>

<style scoped>

.no-photos {
    font-size: 14px;
}

.photo-list {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
}

.photo-container {
    margin-left: 20px;
    margin-right: 20px;
    position: relative;
    padding-bottom: 0px;
    transition: all 0.3s ease-in-out;
    border: 1px solid transparent;
    border-radius: 20px;
}

.photo-container:hover {
    padding-bottom: 250px;
    background-color: rgb(63, 63, 63);
}

.description {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s ease-in-out;
    text-align: center;
}

.photo-name {
}

.photo-description {

}

.photo-container:hover .description {
    opacity: 1;
}


.edit-button, .delete-button {
    position: absolute;
    padding: 10px;
    width: 100px;
    height: 92px;
    color: white;
    border: none;
    cursor: pointer;
    z-index: 0;
    transition: all 0.3s ease-in-out;
    border-radius: 15px;
    opacity: 0;
}

.edit-button {
    left: 5px;
    top: 5px;
}

.edit-button:hover {
    background-color: rgb(197, 197, 0);
}

.delete-button {
    right: 5px;
    top: 5px;
}

.delete-button:hover {
    background-color: red;
}

.photo-container:hover .edit-button {
    opacity: 1;
    left: 5px;
    top: 5px;
}

.photo-container:hover .delete-button {
    opacity: 1;
    right: 5px;
    top: 5px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;
}

.photo-container:hover .overlay {
    background-color: rgba(0, 0, 0, 0.5);
}

.photo {
    max-width: 100%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 10px 10px 100px rgba(255, 255, 255, 0.1);
}

.save-button, .cancel-button {
    padding: 10px;
    width: 100%;
    border: none;
    cursor: pointer;
    border-radius: 15px;
    margin-top: 10px;
    transition: all 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.save-button:hover {
    background-color: rgb(0, 207, 0);
}

.cancel-button:hover {
    background-color: red;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 1rem;
}


.photo-info {
    padding: 10px;
}

h3 {
    margin: 0;
}

input {
    border: 2px solid rgba(245, 245, 245, 0.685);
    border-radius: 20px;
    padding: 10px;
    width: 100%;
    margin: 5px 0;
}

i {
    font-size: 20px;
}
  
</style>
