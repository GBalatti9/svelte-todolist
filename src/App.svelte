<script>
    import { Form, StaticTable } from "./lib";

</script>

<main class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] md:grid md:grid-cols-3 gap-2">
  <section class="w-11/12 mx-auto col-span-1">
    <Form />
  </section>
  <section class="w-full col-span-2 mt-5"> 
    <StaticTable />
  </section>
</main>