<template>
  <div class="container">

    <h1>Super Shortneer</h1>
    <form action="" class="my-4 form-inline">
      <label for="url" class="sr-only">Url:</label>
      <input v-model="url.long" type="text" placeholder="Your Long Url" class="form-control col mr-2"/>
    </form>
    <button class="btn btn-primary" @click="postUrl">Shrink</button>

    <table class="table table-striped table-responsive">
      <thead>
        <tr>
        <th>Long Url</th>
        <th>Short Url</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="url in urls" :key="url.id">  
        <td>
          <a href="#">{{ url.longurl }}</a>
        </td>
        <td>
          <a :href="'http://localhost:5000/url/' + url.shorturl">{{ url.shorturl }}</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'UrlShortneer',
  data() {
    return {
      urls: null,
      url: {
        long: ''
      }
    }
  },
  methods: {
    async getUrls() {
      const req = await fetch('http://localhost:5000')

      const data = await req.json()

      this.urls = data

      console.log(this.url)
    },
    async postUrl(e) {
      e.preventDefault();
      console.log(this.url)
      const dataJson = JSON.stringify(this.url)
      console.log(dataJson)
      const req = await fetch('http://localhost:5000/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataJson
      })

      this.url.long = '';
      this.getUrls();
    }
  },
  mounted() {
    this.getUrls()
  }
}
</script>
<style scoped>
#task-list {
  list-style: none;
  padding-left: 0;
}

#task-list li {
  text-align: left;
  height: 50px;
  line-height: 50px;
  position: relative;
  border-bottom: 3px solid #34073d;
  background-color: #fff;
  color: #34073d;
  margin-bottom: 10px;
  padding-left: 15px;
  transition: 0.5s;
  font-weight: bold;
}

#task-list button {
  position: absolute;
  top: 0;
  height: 40px;
  transition: 0.5s;
  cursor: pointer;
  width: 30px;
  padding: 5px;
}

button:focus {
  outline: none;
}

.remove-btn {
  transition: 0.5s;
  width: 100%;
  height: 100%;
  right: 0px;
  padding: 5px;
  background-color: #fff;
  border: none;
}
.remove-btn:hover {
  color: #ffff;
  background-color: #eb0927;
  outline: none;
  border: none;
}
.content-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 400px;
  overflow: hidden;
}
.content-table td {
  padding: 10px 0px;
}
.content-table tbody tr {
  border-bottom: 1px solid #280068dd;
}

.content-table tbody tr:last-of-type {
  border-bottom: 2px solid #003098;
}
.content-table tbody tr.active-row {
  font-weight: bold;
  color: #ecf2ff;
}
</style>
