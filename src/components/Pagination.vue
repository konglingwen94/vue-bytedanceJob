<template>
  <div v-if="visiblePagers.length" class="pagination">
    <ul class="pagination-list">
      <li
        title="上一页"
        @click="$emit('update:currentPage', Math.max(1, currentPage - 1))"
        class="pagination-item"
        :class="{ disabled: currentPage === 1 }"
      >
        <span><</span>
      </li>
      <li
        class="pagination-item"
        :class="{ current: currentPage === item }"
        v-for="(item, index) in visiblePagers"
        @click="change(item)"
        :key="index"
      >
        <span>{{ item }}</span>
      </li>
      <li
        title="下一页"
        @click="
          $emit('update:currentPage', Math.min(totalPage, currentPage + 1))
        "
        class="pagination-item"
        :class="{ disabled: currentPage === totalPage }"
      >
        <span>></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    total: Number,
    perPage: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pagerCount: {
      type: Number,
      default: 9
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(parseInt(this.total) / this.perPage);
    },
    visiblePagers() {
      let pages = [];
      const currentPage = Math.max(
        1,
        Math.min(this.currentPage, this.totalPage)
      );

      if (this.totalPage <= this.pagerCount) {
        for (let i = 1; i <= this.totalPage; i++) {
          pages.push(i);
        }
        return pages;
      }

      if (currentPage >= this.totalPage - 3) {
        pages.push(1, "...");
        const minPage = Math.min(currentPage - 2, this.totalPage - 4);
        for (let i = minPage, len = this.totalPage; i <= len; i++) {
          pages.push(i);
        }
      } else if (currentPage <= 4) {
        const maxPage = Math.min(Math.max(currentPage + 2, 5), this.totalPage);
        for (let i = 1; i <= maxPage; i++) {
          pages.push(i);
        }
        pages.push("...", this.totalPage);
      } else {
        pages.push(1, "...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push("...", this.totalPage);
      }
      return pages;
    }
  },
  methods: {
    change(num) {
      if (typeof num !== "number") {
        return;
      }
      this.$emit("current-change", num);
      this.$emit("update:currentPage", num);
    }
  }
};
</script>
<style lang="less" scoped>
.pagination-list {
  display: flex;
}
.pagination-item {
  margin-right: 12px;
  cursor: pointer;
  padding: 8px;
  &.disabled {
    cursor: not-allowed;

    color: #ccc !important;
  }

  &:hover {
    color: @main-color;
  }
  &.current {
    color: @main-color;
  }
}
</style>
