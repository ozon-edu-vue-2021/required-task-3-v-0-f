<template>
  <div id="app">
    <div class="office">
      <Map :tables="tables" :legend="legend" />
      <SideMenu :legend="legend" />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import SideMenu from "./components/SideMenu.vue";
import tables from "@/assets/data/tables.json";
import legend from "@/assets/data/legend.json";

export default {
  name: "App",
  components: {
    Map,
    SideMenu,
  },
  data() {
    return {
      tables: [],
      legend: [],
    };
  },
  created() {
    this.tables = tables;
    const counts = this.tables.reduce((totals, table) => {
      return {...totals, [table.group_id]: (totals[table.group_id] || 0) + 1};
    }, {});
    this.legend = legend.map((entry) => {
      return {...entry, counter: counts[entry.group_id]};
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  padding: 24px;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

* {
  box-sizing: border-box;
}

h3 {
  margin-top: 0px;
}

.office {
  display: grid;
  grid-template-columns: 1fr 320px;
  border-radius: 6px;
  border: 1px solid #ccd8e4;
  height: 100%;
  background: white;
  max-width: 1500px;
  margin: 0 auto;
}
</style>
