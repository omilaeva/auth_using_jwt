<script>
    let {data} = $props();
</script>

<div class="flex-col px-3 py-3 place-self-center h-dvh">
    {#if data?.user}
        <h2 class="text-2xl font-bold mt-4 mb-4 text-center text-blue-500">
            <a class="text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
               href="/notes">My notes</a>
        </h2>
    {:else}
        <p  class="mx-4 px-3 py-2 text-xl text-blue-600">
            You need to <a class=" bg-blue-500 text-white px-3 py-2 rounded-lg
            hover:bg-blue-600 transition disabled:bg-blue-100"
                           href="/auth/login">login</a> to add and view notes</p>

    {/if}
</div>