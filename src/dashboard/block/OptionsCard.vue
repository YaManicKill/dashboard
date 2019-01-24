<template>
  <div class="options">

    <div v-for="option in options"
        :key="option.name" :id="option.name">
      <label>{{ option.label }}</label>
      <input 
        v-bind:type="getType(option)" 
        v-model="savedOptions[getId(option.name)]" 
        true-value="true"
        false-value="false" />
    </div>

    <input type="submit" class="submit" value="Submit" v-on:click="submit">
    <input type="submit" class="cancel" value="Cancel" v-on:click="cancel">
  </div>
</template>

<script>
export default {
  name: 'OptionsCard',
  data () {
    const savedOptions = {
      ...this.userData
    };

    return {
      savedOptions
    }
  },
  methods: {
    capitalise(name) {
      return name.split(" ").map((word) => word.slice(0, 1).toUpperCase() + word.slice(1)).join(" ");
    },
    getType(option) {
      return option.type;
    },
    submit() {
      this.onSubmit(this.savedOptions)
    },
    cancel() {
      this.onSubmit(null)
    },
    getId(name) {
      const capitalised = this.capitalise(name).replace(" ", "");
      return capitalised.slice(0, 1).toLowerCase() + capitalised.slice(1);
    },
    updateFormData: function(name, value) {
      this.$set(this.savedOptions, this.getId(name), value);
    }
  },
  props: {
    name: String,
    options: Array,
    onSubmit: Function,
    userData: Object
  }
}
</script>

<style scoped>
div {
  text-align: left;
}

input, select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 45%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=checkbox] {
  width: auto;
  float: right;
  margin: auto;
  padding: 0;
}

input.submit {
  margin-right: 10%;
}

input.cancel {
  background-color: rgb(182, 182, 182);
}

input[type=submit]:hover {
  background-color: #45a049;
}
</style>
