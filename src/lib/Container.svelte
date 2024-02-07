<script>

    import { Form, StaticTable, DinamicTable } from ".";
    import FindTask from "./FindTask.svelte";

    let switchTable = false;

</script>
<section class="w-11/12 mx-auto col-span-1">
    <Form />
    <FindTask />
</section>
<section class="w-full col-span-2 p-2 mt-4">
    { #if !switchTable}
        <StaticTable />
    { :else }
        <DinamicTable />
    {/if }
</section>
