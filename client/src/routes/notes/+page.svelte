<script>
    import {PUBLIC_API_URL} from "$env/static/public";

    let notes = $state([]);
    let error = $state("");
    let text = $state("");

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
    };

    const addNote = async () => {
        error = "";
        const response = await fetch(`${PUBLIC_API_URL}/api/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            error = "Failed to add note.";
            return;
        }

        text = "";
        fetchNotes();
    };


    $effect(() => {
        fetchNotes();
    });
</script>

<div class="place-self-center py-3 flex-col place-items-center h-screen">
    <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-100"
            onclick={fetchNotes}>Fetch notes
    </button>

    <h2 class="text-2xl font-bold mt-4 mb-4 text-center text-blue-500">Notes</h2>

    {#if error}
        <p class="text-xl text-red-800">{error}</p>
    {/if}

    <ul class="list-disc pl-5 space-y-2 bg-gray-50 p-4 rounded-lg">
        {#each notes as note}
            <li class="text-gray-800 font-medium mx-4">
                <a class="text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
                   href="/notes/{note.id}">
                    {note.text}
                </a>
            </li>
        {/each}
        <li class="flex items-center">
            <input class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                   type="text" bind:value={text} />
            <button class="bg-blue-500 text-white mx-2 px-3 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-100 w-full"
                    type="button"
                    onclick={addNote}>Add note</button
            >
        </li>
    </ul>

</div>