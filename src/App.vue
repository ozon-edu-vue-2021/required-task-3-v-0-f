<template>
  <div id="app">
    <div class="office">
      <Map :tables="tables" :legend="legend" @tableSelected="onTableSelected" />
      <SideMenu
        :legend="legend"
        :person="person"
        :isUserOpenned="selectedTable !== null"
        @closeProfile="onCloseProfile"
        ref="menu"
      />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import SideMenu from "./components/SideMenu.vue";
import tables from "@/assets/data/tables.json";
import legend from "@/assets/data/legend.json";
import people from "@/assets/data/people.json";

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
      people: [],
      person: null,
      selectedTable: null,
    };
  },
  created() {
    this.tables = tables;

    // calculate counters for legend
    const counts = this.tables.reduce((totals, table) => {
      return { ...totals, [table.group_id]: (totals[table.group_id] || 0) + 1 };
    }, {});
    this.legend = legend.map((entry) => {
      return { ...entry, counter: counts[entry.group_id] };
    });

    // map person to group name
    const groupNames = Object.fromEntries(
      this.legend.map((group) => [group.group_id, group.text])
    );
    const tableGroups = Object.fromEntries(
      this.tables.map((table) => [table._id, table.group_id])
    );
    this.people = people.map((person) => {
      return { ...person, groupName: groupNames[tableGroups[person.tableId]] };
    });

    // handle click outside tables
    document.addEventListener("click", (event) => {
      const tableClass = "wrapper-table";
      const targetClass = event.target.classList[0];
      const menu = this.$refs.menu.$el;
      if (targetClass !== tableClass && !menu.contains(event.target))
        this.onCloseProfile();
    });
  },
  methods: {
    onTableSelected: function (tableId) {
      this.selectedTable = tableId;
      this.person = this.people.find((person) => person.tableId === tableId);
    },
    onCloseProfile: function () {
      this.selectedTable = null;
    },
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
