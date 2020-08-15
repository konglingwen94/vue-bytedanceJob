import Vue from "vue";
import {
  Input,
  Form,
  FormItem,
  Select,
  Option,
  DatePicker,
  Tabs,
  TabPane,
  Upload,
  Loading,
  Message,
  Button,
  Checkbox
} from "element-ui";

Vue.use(Checkbox);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Upload);
Vue.use(Loading);
Vue.use(Button);
Vue.prototype.$message = Message;
