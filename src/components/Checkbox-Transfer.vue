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
          :checked="checked[index]"
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
      // checked: [],
      focusing: false,
      filterKeyword: "",
      targets: [],
    };
  },
  props: {
    targetCount: {
      type: Number,
      default: 5,
    },
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
    // targets(){
    //   return this.data.slice(this.targetCount).map(item=>item[this.props.key])
    // },
    checked() {
      return this.targets.map((key) => this.value.includes(key));

      this.targets.forEach((key) => {
        // checked;
      });
    },
    targetData() {
      // return this.data.filter(
      //   (item) => this.value.indexOf(item[this.props.key]) > -1
      // );

      return this.targets
        .map((key) => {
          return this.data.find((item) => item[this.props.key] === key);
        })
        .filter((item) => item && item[this.props.key]);

      // return this.data.slice(this.targetCount);
    },
    sourceData() {
      return this.data.filter(
        (item) => this.targets.indexOf(item[this.props.key]) === -1
      );
    },
    // checkedValue() {
    //   return this.targetData
    //     .filter((item, index) => this.checked[index])
    //     .map((item) => item[this.props.key]);
    // },
    filterableData() {
      return this.sourceData.filter((item) => {
        return item[this.props.label].startsWith(this.filterKeyword);
      });
    },
    placeholder() {
      return !this.focusing ? "更多" : "搜索";
    },
  },
  created() {
    // const unwatch = this.$watch(
    //   "data",
    //   () => {
    //     if (unwatch) {
    //       // unwatch();
    //     }
    //   },
    //   { immediate: true }
    // );
    // this.targets = this.data.slice(0, 6).map((item) => item[this.props.key]);
    // this.checked.length = this.targets.length;
    // this.value.forEach((key) => {
    //   if (!this.targets.includes(key)) {
    //     this.targets.push(key);
    //     this.checked.push(true);
    //   }else{
    //     // this.$set(this.)
    //   }
    // });
  },
  watch: {
    checked() {
      this.$emit("change", this.checkedValue);
    },
    data() {
      this.targets = this.data.slice(0, 6).map((item) => item[this.props.key]);
      this.checked.length = this.targets.length;
      this.value.forEach((key) => {
        if (!this.targets.includes(key)) {
          this.targets.push(key);
          this.checked.push(true);
        } else {
          // this.$set(this.)
        }
      });
    },
    // ["targetData.length"]: {
    //   handler(newLen) {
    //     this.checked.length = newLen;
    //   },
    //   immediate: true,
    // },
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
      if (item[this.props.key]) {
        this.targets.push(item[this.props.key]);
        this.value.push(item[this.props.key]);
      }

      // this.$nextTick(() => {
      //   this.$set(this.checked, this.checked.length - 1, true);
      // });
      this.filterKeyword = "";
    },
    check(item, e) {
      if (!e.target.checked) {
        const delIndex = this.value.indexOf(item[this.props.key]);
        if (delIndex > -1) {
          this.value.splice(delIndex, 1);
        }
      } else {
        if (!this.value.includes(item[this.props.key])) {
          this.value.push(item[this.props.key]);
        }
      }

      // if (this.value.includes(item[this.props.key]))
      this.$emit("check", e.target.checked, item[this.props.key]);
      this.$emit("input", this.value);
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
