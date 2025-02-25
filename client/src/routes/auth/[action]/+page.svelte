<script>
    let { data, form } = $props();
</script>

{#if form && !form.success}
    <p class="text-red-800">{form.message}</p>
{/if}

{#if data.registered}
    <p class="text-lg text-gray-700 dark:text-gray-300 font-light leading-loose">You have successfully registered. Please login to continue.</p>
{/if}

<div class="flex-col align-center justify-items-center p-8 h-screen">
    <h2 class="text-2xl font-bold mt-4 mb-4 text-center text-blue-500">
        {data.action === "login" ? "Login" : "Register"} form
    </h2>

    <form class="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4" method="POST" action="?/{data.action}">
        <label class="block text-gray-700 font-semibold mb-1" for="username">Username
            <input
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
            />
        </label>
        <label class="block text-gray-700 font-semibold mb-1" for="password">Password
            <input class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                   id="password" name="password" type="password" placeholder="********"/>
        </label>
        <button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-100" type="submit">
            {data.action === "login" ? "Login" : "Register"}
        </button>
    </form>
</div>