<template>
  <div>
    父级{{value}}
    <div>
        <button @click="$emit('input',value+1)">+</button>
    </div>
    <slot name="header" a="1" :mingzi="name"></slot>
    <slot name="footer" ></slot>

  </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            name:"孔万城"
        }
    },
    props:["value"],
    methods: {
       
    },
    // model:{
    //         prop:"" ,
    //    event:""
    // },

}
</script>

<style lang="sass" scoped>

</style>

