<template>
  <div>
    <h2>Nuxt module playground!</h2>
    <div style="display: grid; row-gap: 25px;">
      <DirectusImg src="6e0232e9-3a1c-4559-873e-f5a67cac8308" width="150" quality="20" />
      <DirectusImg src="6e0232e9-3a1c-4559-873e-f5a67cac8308" width="400" />
      <DirectusImg src="6e0232e9-3a1c-4559-873e-f5a67cac8308" height="200" width="400" fit="contain" />
      <DirectusImg src="6e0232e9-3a1c-4559-873e-f5a67cac8308" height="200" width="400" fit="cover" />
      <DirectusImg src="6e0232e9-3a1c-4559-873e-f5a67cac8308" width="400" :transforms="[['rotate', 90]]" />
      <DirectusImg src="6e0232e9-3a1c-4559-873e-f5a67cac8308" width="400" :transforms="[['rotate', 180], ['blur', 10]]" />
    </div>
  </div>
</template>