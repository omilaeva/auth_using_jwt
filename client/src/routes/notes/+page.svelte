<script>
    import {PUBLIC_API_URL} from "$env/static/public";

    let notes = $state([]);
    let error = $state("");

    const fetchNotes = async () => {
        error = "";
        const response = await fetch(`${PUBLIC_API_URL}/api/notes`, {
            credentials: "include",
        });

        if (!response.ok) {
            error = "Failed to fetch notes.";
            return;
        }

        notes = await response.json();
        console.log(notes);
    };


    $effect(() => {
        fetchNotes();
    });
</script>

<div class="place-self-center py-3 flex-col items-center">
    <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-100"
            onclick={fetchNotes}>Fetch notes
    </button>

    <h2 class="text-2xl font-bold mt-4 mb-4 text-center text-blue-500">Notes</h2>

    {#if error}
        <p class="text-xl text-red-800">{error}</p>
    {/if}

    <ul>
        {#each notes as note}
            <li class="text-blue-700">{note}</li>
        {/each}
    </ul>

</div>