<script setup>
  import { useLazyFetch } from '#app';

  const placeholder = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 {{w}} {{h}}'><defs><symbol id='a' viewBox='0 0 90 66' opacity='0.3'><path d='M85 5v56H5V5h80m5-5H0v66h90V0z'/><circle cx='18' cy='20' r='6'/><path d='M56 14L37 39l-8-6-17 23h67z'/></symbol></defs><use xlink:href='#a' width='20%' x='40%'/></svg>";

  const props = defineProps({
    src: {
      type: String|undefined,
      required: true
    },
    width: String,
    height: String,
    fit: String,
    quality: {
      type: String,
      default: "90"
    },
    format: {
      type: String,
      default: "png"
    },
    transforms: Array
  })


  const ph = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
    placeholder.replace(/{{w}}/g,props.width?props.width:100)
      .replace(/{{h}}/g,props.height?props.height:100)
  );

  const { data, pending } = await useLazyFetch('/nuxt-image-directus/get-src', {
    key: JSON.stringify(props),
    method: 'POST',
    body: props
  });
</script>

<template>
  <img :src="pending || !data ? ph : data" :width="width" :height="height" />
</template>