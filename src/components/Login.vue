<template>
     <div class="form-signin w-100 m-auto mt-3">
        <div class=" p-2 mx-auto w-25">
            <h1 class="fw-normal">Please Login</h1>

            <Input :label="'Name'" :type="'text'"/>
            <!-- <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="Username">
                <label for="floatingInput">Email</label>
            </div> -->
            <Input :label="'Password'" :type="'password'"/>
            <Button type="submit">Login</Button>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>