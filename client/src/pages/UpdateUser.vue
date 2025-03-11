<template>
  <div>
    <h2>Update User</h2>
    <div>
      <form
        @submit.prevent="updateUser"
        class="flex flex-col justify-center items-center gap-3"
      >
        <input
          type="text"
          placeholder="name"
          class="input input-bordered w-full max-w-lg"
          required
          v-model="user.name"
        />
 
        <input
          type="email"
          placeholder="email"
          class="input input-bordered w-full max-w-lg"
          required
          v-model="user.email"
        />
        <div class="w-32">
          <img :src="user.profile_image" :key="user.profile_image" />
        </div>
 
        <input
          type="file"
          class="file-input file-input-bordered w-full max-w-lg"
          @change="handleImageChange"
        />
 
        <input
          type="text"
          placeholder="address"
          class="input input-bordered w-full max-w-lg"
          required
          v-model="user.address"
        />
        <button class="btn btn-primary max-w-lg w-full" type="submit">
          Submit
        </button>
      </form>
    </div>
  </div>
 </template>
 
 <script>
 export default {
  name: "UpdateUser",
  data() {
    return {
      id: 0,
      newImage: null,
      user: {
        id: 0,
        name: "",
        email: "",
        profile_image: null,
        address: "",
      },
    };
  },
  methods: {
    imageUrlToObjectFile(imageUrl) {
      return new Promise((resolve, reject) => {
        fetch(imageUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const file = new File([blob], "image.jpg", { type: "image/jpeg" });
            resolve(file);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async fetchUser() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/${this.$route.params.id}/`
        );
        const data = await response.json();
        if (response.ok) {
          this.user = data;
          // if (this.user.profile_image) {
          //   const file = await this.imageUrlToObjectFile(this.user.profile_image);
          //   this.user.profile_image = file;
          // }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      this.newImage = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.user.profile_image = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.user.profile_image = null;
      }
    },
    async updateUser() {
      const formData = new FormData();
      formData.append("name", this.user.name);
      formData.append("email", this.user.email);
      if (this.newImage) {
        formData.append("profile_image", this.newImage);
      } else {
        const file = await this.imageUrlToObjectFile(this.user.profile_image);
        formData.append("profile_image", file);
      }
      formData.append("address", this.user.address);
 
      fetch(`http://localhost:8000/api/users/${this.user.id}/`, {
        method: "PUT",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            this.user = {
              id: 0,
              name: "",
              email: "",
              profile_image: null,
              address: "",
            };
            this.newImage = null;
            this.$router.push("/");
          } else {
            throw new Error("Failed to update user");
          }
        })
        .catch((error) => console.error("Error updating user:", error));
    },
  },
  mounted() {
    this.fetchUser();
  },
 };
 </script>
 
 <style></style>