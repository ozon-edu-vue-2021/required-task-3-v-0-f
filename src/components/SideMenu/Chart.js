import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ["data"],
  mounted() {
    this.renderChart(this.data, {
      animation: false,
      borderWidth: "10px",
      legend: {
        display: false,
      },
    });
  },
};
