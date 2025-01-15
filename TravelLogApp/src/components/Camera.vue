<template>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  </head>
  <div class="main-container">
    <button class="take-photo-button" v-if="!photo" @click="takePhoto">
      <i class="fas fa-camera"></i>
      <br> Take a photo
    </button>
    <div v-if="showToast" class="toast">
      Photo saved successfully!
    </div>

    <div v-if="photo" class="photo-details">
      <button class="save-button" @click="savePhoto">
        <i class="fas fa-save"></i> <br><br> Save Photo
      </button>
      <input class="inputs" v-model="photoName" placeholder="Enter photo name" />
      <input class="inputs" v-model="photoDescription" placeholder="Enter photo description" />
    </div>

  </div>
</template>

<script>
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { mapActions } from 'vuex';

export default {
  name: 'Camera',
  data() {
    return {
      photo: null,
      photoName: '',
      photoDescription: '',
      showToast: false,
      photoDate: '',
      photoLocation: '',
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
        this.photoDate = new Date().toLocaleString();

        const position = await Geolocation.getCurrentPosition();
        await this.fetchAddressFromCoordinates(position.coords.latitude, position.coords.longitude);

      } catch (error) {
        console.error('Błąd podczas robienia zdjęcia lub uzyskiwania lokalizacji:', error);
      }
    },

    async fetchAddressFromCoordinates(latitude, longitude) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`);
        const data = await response.json();
        if (data && data.address) {
          const city = data.address.city || data.address.town || data.address.village;
          const country = data.address.country;
          this.photoLocation = `${city}, ${country}`;
        }
      } catch (error) {
        console.error("Błąd podczas pobierania adresu:", error);
        this.photoLocation = "Nie udało się uzyskać lokalizacji";
      }
    },

    savePhoto() {
      const newPhoto = {
        url: this.photo,
        name: this.photoName,
        description: this.photoDescription,
        date: this.photoDate,
        location: this.photoLocation,
      };

      this.addPhoto(newPhoto);
      this.photo = null;
      this.photoName = '';
      this.photoDescription = '';
      this.photoDate = '';
      this.photoLocation = '';

      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  padding: 20px;
  border: 1px solid transparent;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  cursor: pointer;
  box-shadow: 10px 10px 100px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;
  color: rgb(202, 202, 202);
}

button:hover {
  background-color: black;
  color: white;
  transform: scale(1.1);
  box-shadow: 10px 10px 100px rgba(255, 255, 255, 0.356);
}

.photo-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

i {
  font-size: 100px;
}

.inputs {
  width: 25%;
  height: 50px;
  padding: 20px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid grey;
  transition: all 0.3s ease-in-out;
}

.inputs:focus {
  width: 80%;
}

@media only screen and (max-width: 600px) {
  .inputs {
    width: 50%;
  }
}

.toast {
  position: absolute;
  bottom: 70px;
  left: 20px;
  background-color: #333;
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}
</style>
