<template>
  <div class="person">
    <div class="person__photo">
      <img :src="person.picture" alt="photo" />
    </div>
    <div class="person__info">
      <div class="person__info-name">
        <b>{{ person.name }}, {{ person.age }}</b>
      </div>
      <div class="person__info-name">{{ person.groupName }}</div>
      <div class="person__info-email">✉ {{ person.email }}</div>
      <div class="person__info-email">
        <b>Дата регистрации:</b> {{ formatedDate }}
      </div>
      <div class="person__info-about"><b>О себе:</b> {{ person.about }}</div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  props: {
    person: {
      type: Object,
      default: null,
    },
  },
  computed: {
    formatedDate() {
      return format(new Date(this.person.registered), "dd-MM-yyyy");
    },
  },
};
</script>

<style scoped>
.person {
  display: flex;
  flex-direction: column;
}

.person__photo img {
  height: auto;
  width: 100%;
  border-radius: 50%;
}

.person__info {
  display: grid;
  grid-gap: 8px;
  margin-top: 20px;
  font-size: 20px;
}

.person__info-name {
  margin-bottom: 10px;
}

.person__info-email {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
</style>
