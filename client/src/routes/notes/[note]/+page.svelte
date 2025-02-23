<script>
    import {PUBLIC_API_URL} from "$env/static/public";

    let {data} = $props();
    let note = $state({});
    let error = $state("");

    const fetchNote = async () => {
        console.log(data);
        const response = await fetch(`${PUBLIC_API_URL}/api/notes/${data.note}`, {
            credentials: "include",
        });

        if (!response.ok) {
            error = "Failed to fetch note.";
            return;
        }

        note = await response.json();
    };

    $effect(() => {
        fetchNote();
    });
</script>
<div class="flex-col px-3 py-3 place-self-center h-screen ">
    <a class="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-100 w-full"
            href="/notes">&lt; Back</a>

    <h2 class="text-2xl font-bold mt-4 mb-4 text-center text-blue-500">
        Viewing note with identifier {data.note}
    </h2>

    {#if error && error.length > 0}
        <p class="text-lg text-gray-700 dark:text-gray-300 font-light leading-loose">{error}</p>
    {/if}

    <p class="text-lg text-gray-700 dark:text-gray-300 font-light leading-loose">{note.text}</p>
</div>