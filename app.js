const baseURL = 'https://anbo-restbookquerystring.azurewebsites.net/api/Books'

Vue.createApp({
    data() {
        return {
            data: [],
            book_object: {
                id: 5,
                title: null,
                price: null
            },
            book_object_update: {
                id: null,
                title: null,
                price: null
            },
            status: null,
            status_text: null,
            timer: ''
        };
    },
    async created() {
        this.get_books()
        this.timer = setInterval(() => {
            this.get_books();
            console.log('timer')
        }, 30000);
    },
    methods: {
        async get_books() {
            try {
                const reponse = await axios.get(baseURL);
                this.data = reponse.data
                this.status = reponse.status
                this.status_text = reponse.statusText
                console.log(reponse)
            } catch (error) {
                console.log(error)
            }
        },
        async add() {
            try {
                const reponse = await axios.post(baseURL, this.book_object)
                console.log(reponse);
                this.get_books();
            } catch (error) {
                console.log(error)
            }
        },
        async update() {
            try {
                const reponse = await axios.put(baseURL + '/' + this.book_object_update.id, this.book_object_update)
                console.log(reponse);
                this.get_books();
            } catch (error) {
                console.log(error);
            }
        },
        async delete_book(id) {
            try {
                const reponse = await axios.delete(baseURL + '/' + id)
                console.log(reponse);
                this.get_books();
            } catch (error) {
                console.log(error)
            }
        }
    },
    beforeDestroy() {
        this.cancelAutoUpdate();
    }
}).mount("#app");