<template>
    <div class="home-container">
        <HeadNav />
    </div>
</template>

<script>
import HeadNav from '../components/headNav.vue';
export default {
    components: {
        HeadNav
    }
};
</script>

<style scoped>
.home-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.5);
}

.home-container > :not(.head-nav) {
  padding-top: 60px; /* 根据 HeadNav 的实际高度调整 */
}
</style>