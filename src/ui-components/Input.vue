<template>
    <div class="form-floating mb-3">
                <input :type="type" class="form-control" :placeholder="label" @input="updateInput" :value="modelValue">
                <label :for="label">{{ label }}</label>
    </div>
</template>

<script>
export default{
    name: 'Input',
    props: {
        label: String,
        type: String,
        modelValue: [String,Number],
    },
    methods: {
        updateInput(e) {
            this.$emit('update:modelValue',e.target.value)
        },
    },
}
</script>