<script>

    import { tasks, filterTasksList } from "../stores/store";
    import { StaticTableComponent } from "./";

</script>

<main>
    { #if $filterTasksList.length > 0 }    
        <StaticTableComponent />
    {:else}
    <div class="box">
        <p>Add your first task...</p>
    </div>
    {/if}
</main>

<style>

    .box{
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>