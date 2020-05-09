<template>
  <div class="checkbox">
    <ul class="checkbox-list">
      <li
        class="checkbox-item"
        v-for="(item, index) in targetData"
        :key="index"
      >
        <input
          @change="check(item, $event)"
          type="checkbox"
          name
          v-model="checked[index]"
        />
        <span>{{ item[props.label] }}</span>
      </li>
    </ul>
    <div class="search" v-if="sourceData.length">
     
      <input
        @blur="onInputBlur"
        @focus="focusing = true"
        class="search-input"
        :placeholder="placeholder"
        type="text"
        v-model="filterKeyword"
      />
      <ul class="search-list" v-if="focusing">
        <li
          v-for="item in filterableData"
          :key="item[props.key]"
          class="search-item"
          @click="addToTarget(item)"
        >
          <span>{{ item[props.label] }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "checkbox-transfer",
  data() {
    return {
      checked: [],
      focusing: false,
      filterKeyword: "",
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    props: {
      type: Object,
      default() {
        return {
          key: "key",
          label: "label",
        };
      },
    },
    value: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    targetData() {
      // return this.data.filter(
      //   (item) => this.value.indexOf(item[this.props.key]) > -1
      // );

      return this.value.map((key) => {
        return this.data.find((item) => item[this.props.key] === key);
      });
    },
    sourceData() {
      return this.data.filter(
        (item) => this.value.indexOf(item[this.props.key]) === -1
      );
    },
    checkedValue() {
      return this.targetData
        .filter((item, index) => this.checked[index])
        .map((item) => item[this.props.key]);
    },
    filterableData() {
      return this.sourceData.filter((item) => {
        return item[this.props.label].startsWith(this.filterKeyword);
      });
    },
    placeholder() {
      return !this.focusing ? "更多" : "搜索";
    },
  },
  watch: {
    checked() {
      this.$emit("change", this.checkedValue);
    },
    ["targetData.length"]: {
      handler(newLen) {
        this.checked.length = newLen;
      },
      immediate: true,
    },
  },
  methods: {
    clearChecked() {
      for (let i = 0; i < this.checked.length; i++) {
        this.$set(this.checked, i, false);
      }
    },
    onInputBlur(e) {
      setTimeout(() => {
        this.focusing = false;
      }, 200);
    },
    addToTarget(item) {
      this.value.push(item[this.props.key]);

      this.$nextTick(() => {
        this.$set(this.checked, this.checked.length - 1, true);
      });
      this.filterKeyword = "";
    },
    check(item, e) {
      this.$emit("check", e.target.checked, item[this.props.key]);
      // this.$emit("input", this.value);
    },
  },
};
</script>
<style lang="less" scoped>
.checkbox {
  max-width: 200px;
  &-item {
    &:hover {
      border-color: @main-color;
    }
  }
}
.search {
  position: relative;
  margin-left: 30px;
  &-placeholder {
    cursor: pointer;
    border-bottom: 1px solid #aaa;
  }
  &-input {
    border-width: 0 0 1px 0;
    outline: none;
  }
  &-list {
    position: absolute;
    height: 300px;
    padding: 0 20px;
    width: 100%;
    overflow: auto;
    line-height: 30px;
  }
  &-item {
    &:hover {
      cursor: pointer;
      background: #eee;
    }
  }
}
</style>
