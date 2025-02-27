<script>
    import {useUserState} from "$lib/states/userState.svelte.js";
    import {PUBLIC_API_URL} from "$env/static/public";
    import Button from "$lib/Button.svelte";

    let {children, data} = $props();
    let isMobileMenuOpen = $state(false);
    let error = $state("");

    const userState = useUserState();
    if (data.user) {
        userState.user = data.user;
    }

    let isUserMenuOpen = $state(false);

    const toggleDropdown = () => {
        isUserMenuOpen = !isUserMenuOpen;
    }

    const logout = async () => {
        // Perform logout logic (redirect, API call, etc.)
        const res = await fetch(`${PUBLIC_API_URL}/api/logout`, {
            method: 'POST',
            credentials: 'include' // Important for cookies!
        });
        if (!res.ok) {
            error = "Cannot logout. Try later."
        } else {
            window.location.href = "/";
        }
    }
</script>

<style global>
    @import '../app.css';
</style>


<nav class="fixed top-0 z-50 left-0 w-full bg-blue-500 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <a href="/" class="text-2xl font-bold">Notes</a>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex space-x-6">
            <li class="py-2"><a href="/" class="hover:underline">Home</a></li>
            <li class="py-2"><a href="/about" class="hover:underline">About</a></li>
            {#if data?.user}
                <div class="relative inline-block">
                    <!-- Button to open dropdown -->
                    <button
                            onclick={toggleDropdown}
                            class="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none">
                        {data.user.username} ⏷
                    </button>

                    <!-- Dropdown Menu -->
                    {#if isUserMenuOpen}
                        <ul class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            {#if data.user?.roles?.includes("ADMIN")}
                                <li>
                                    <a href="/admin" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Admin Panel
                                    </a>
                                </li>
                            {/if}
                            <li>
                                <Button onClick={logout}>Logout</Button>
                            </li>
                        </ul>
                    {/if}
                </div>
            {:else}
                <li class="py-2"><a href="/auth/register" class="hover:underline">Register</a></li>
                <li class="py-2"><a href="/auth/login" class="hover:underline">Login</a></li>
            {/if}
        </ul>

        <!-- Mobile Hamburger Button (visible on small screens) -->
        <div class="md:hidden">
            <button onclick={() => isMobileMenuOpen = !isMobileMenuOpen} aria-label="Toggle menu">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
        </div>
    </div>

    <!-- Mobile Dropdown Menu (visible on small screens when isMenuOpen is true) -->
    <div class={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-blue-500 text-white p-4 space-y-2`}>
        <a href="/" class="block py-2">Home</a>
        <a href="/about" class="block py-2">About</a>
        {#if data?.user}
            <div class="relative">
                <button
                        class="block w-full text-left py-2 px-3 rounded hover:bg-blue-600"
                        onclick={toggleDropdown}>
                    {data.user.username} ⏷
                </button>
                <ul class={`absolute left-0 w-full bg-white rounded shadow-md mt-1 ${isUserMenuOpen ? 'block' : 'hidden'}`}>
                    {#if data.user?.roles?.includes("ADMIN")}
                        <li><a href="/admin" class="block py-2 px-3 hover:bg-blue-700  text-gray-700 hover:bg-gray-100">Admin
                            Panel</a></li>
                    {/if}
                    <li>
                        <Button onClick={logout}>Logout</Button>
                    </li>
                </ul>
            </div>
        {:else}
            <li><a href="/auth/register" class="block py-2">Register</a></li>
            <li><a href="/auth/login" class="block py-2">Login</a></li>
        {/if}
    </div>
</nav>
<main>
    <div class="flex flex-1 flex-col mt-16 py-8 px-8 bg-sky-100">
        {#if error}
            <p class="text-red-800 text-lg">{error}</p>
        {/if}

        {@render children()}
    </div>
</main>