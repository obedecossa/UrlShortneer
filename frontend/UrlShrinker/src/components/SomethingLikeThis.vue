<template>
    <main>
        <p>Ola</p>
        <p>{{ nome }}</p>
    <button @click="getTasks">connct</button>
    <button @click="createTask">conn</button>
    </main>
</template>

<script>
export default{
    name: "SomethingLikeThis",
    data(){
        return{
            url: null,
            nome: "Obede"
        }
    },
    methods:{
        async getTasks(){
            const req = await fetch("http://localhost:5000")

            const d = await req.json()
            this.nome = " "
            console.log(d)
        },
        show(){
            console.log()
        },
        async createTask( ){
            const data ={
                fullUrl: "https://github.com/WebDevSimplified/url-shortener/blob/master/views/index.ejs"
            }
            console.log(data)
            const dataJson = JSON.stringify(data)
            console.log(dataJson)
            const req = await fetch("http://localhost:5000/shortUrls", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: dataJson
            })
            const res = await req.json()

            console.log(res)

        }
    }
}
</script>