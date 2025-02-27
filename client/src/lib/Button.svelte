<script>
    let { children, onClick } = $props();
</script>

<button onclick={onClick} class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
    {@render children()}
</button>