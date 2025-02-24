<script>
    let {data} = $props();
</script>

<div class="flex px-3 py-3 place-self-center h-screen ">
    {#if data?.user}
        <h2 class="text-2xl font-bold mt-4 mb-4 text-center text-blue-500">
            <a class="text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
               href="/notes">My notes</a>
        </h2>
    {:else}
        <p>You need to login to add and view notes</p>
        <a class="text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
           href="/auth/login">Login</a>
    {/if}
</div>