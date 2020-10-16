<template>
<div class="Layout">
    <Navbar />
</div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
    name: "Layout",
    components: {
        Navbar,
    },
};
</script>
