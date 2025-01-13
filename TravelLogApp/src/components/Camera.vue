<template>
    <div>
  
      <main>
        <button @click="takePhoto">
            <i class="fas fa-camera"></i>
            <br> Take a photo
        </button>
  
        <div v-if="photo" class="photo-details">
          <input v-model="photoName" placeholder="Enter photo name" />
          <textarea v-model="photoDescription" placeholder="Enter photo description"></textarea>
          <button @click="savePhoto">Save Photo</button>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
  import { mapActions } from 'vuex';
  
  export default {
    name: 'Camera',
    data() {
      return {
        photo: null, // URL zdjęcia
        photoName: '', // Nazwa zdjęcia
        photoDescription: '', // Opis zdjęcia
      };
    },
    methods: {
      ...mapActions(['addPhoto']),
      async takePhoto() {
        try {
          const result = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
          });
  
          this.photo = result.webPath;
        } catch (error) {
          console.error('Error taking photo:', error);
        }
      },
      savePhoto() {
        const newPhoto = {
          url: this.photo,
          name: this.photoName,
          description: this.photoDescription,
        };
  
        this.addPhoto(newPhoto);
        this.photo = null; // Resetowanie zdjęcia po zapisaniu
        this.photoName = ''; // Resetowanie nazwy
        this.photoDescription = ''; // Resetowanie opisu
      },
    },
  };
  </script>
  
  <style scoped>
  
  button {
    padding: 20px;
    border: none;
    border-radius: 20px;
    width: 200px;
    height: 200px;
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }

  i {
    font-size: 100px;
  }
  
  input,
  textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    padding: 10px;
  }
  </style>
  