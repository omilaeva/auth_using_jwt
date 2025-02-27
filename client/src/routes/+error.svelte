<script lang="ts">
  import { page } from '$app/state';
</script>

<h1 class="text-2xl text-red-800">Oops! {page.error.message}</h1>
<a href="/" class="text-blue-500 text-xl underline">Go home</a>