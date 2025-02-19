<template>
   <div class="invalid-feedback">
    {{ message }}
  </div>
</template>

<script>

    export default{
        props : {
            message: String
        },
        
        
    }
</script>