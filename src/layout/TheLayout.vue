<template>
  <fragment>
    <TheHeader />

    <TheCategory v-if="$route.meta.hasCategory" />
    <!-- <TheCategory v-if="$route.meta.hasCategory" v-lazy-load:delay="3000" /> -->

    <main v-if="!$route.meta.notOnlyMain">
      <router-view></router-view>
    </main>
    <template v-else>
      <router-view></router-view>
    </template>

    <TheFooter v-if="$route.meta.hasFooter" />
  </fragment>
</template>

<script>
import { TheHeader, TheFooter, TheCategory } from '@/components/globals';

import directives from '@/directives';

export default {
  name: 'TheLayout',
  components: {
    TheHeader,
    TheFooter,
    TheCategory,
  },
  directives: directives,
};
</script>
