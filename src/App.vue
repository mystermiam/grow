<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html {
  min-height: 100%;
}

body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}

#app{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
