<script>

    import { Form, StaticTable, DinamicTable } from ".";
    import FindTask from "./FindTask.svelte";

    let switchTable = true;
    const toggleSwitch = ({ detail }) => {
        if (detail === 'true') {
            return switchTable = !switchTable
        }
    }

</script>
<section class="w-11/12 mx-auto col-span-1">
    <Form on:switch={ toggleSwitch } />
    <FindTask />
</section>
<section class="w-full col-span-2 p-2 mt-4">
    { #if !switchTable}
        <StaticTable />
    { :else }
        <DinamicTable />
    {/if }
</section>
