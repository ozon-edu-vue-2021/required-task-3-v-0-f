<template>
  <div class="map">
    <h3>Карта офиса</h3>

    <div class="map-root">
      <MapSVG ref="svg" />
      <Table v-show="false" ref="table" />
    </div>
  </div>
</template>

<script>
import MapSVG from "@/assets/images/map.svg";
import Table from "@/assets/images/workPlace.svg";
import * as d3 from "d3";

export default {
  components: {
    MapSVG,
    Table,
  },
  props: {
    tables: {
      type: Array,
      default() {
        return [];
      },
    },
    legend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      svg: null,
      tableSVG: null,
    };
  },
  mounted() {
    this.svg = d3.select(this.$refs.svg).select("g");
    this.tableSVG = d3.select(this.$refs.table).select("g");
    this.drawTables();
  },
  computed: {
    groupColors: function () {
      return Object.fromEntries(
        this.legend.map((group) => [group.group_id, group.color])
      );
    },
  },
  methods: {
    drawTables() {
      const svgTablesGroupPlace = this.svg
        .append("g")
        .classed("groupPlaces", true)
        .node();
      this.tables.map((table) => {
        const tableClone = this.tableSVG.node().cloneNode(true);
        const tableAttributes = {
          transform: [
            `translate(${table.x}, ${table.y})`,
            `scale(0.5)`,
            `rotate(${table.rotate || 0})`,
          ].join(","),
          id: table._id,
          group_id: table.group_id,
          fill: this.groupColors[table.group_id] ?? "transparent",
        };
        Object.entries(tableAttributes).forEach(([attr, value]) => {
          tableClone.setAttribute(attr, value);
        });
        tableClone.onclick = this.selectTable;
        svgTablesGroupPlace.appendChild(tableClone);
      });
    },
    selectTable: function (event) {
      const tableId = Number(event.target.parentNode.getAttribute("id"));
      this.$emit("tableSelected", tableId);
    },
  },
};
</script>

<style scoped>
.map {
  height: 100%;
  width: 100%;
  padding: 24px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.map-root {
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

h3 {
  margin-top: 0px;
}

::v-deep svg {
  height: 100%;
  width: 100%;
}

::v-deep .table {
  cursor: pointer;
}
</style>
