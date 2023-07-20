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

</style>
