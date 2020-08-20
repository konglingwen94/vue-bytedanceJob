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
  Checkbox,
  MessageBox,
  Progress,
  Notification
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
Vue.use(Button);
Vue.use(Loading);
Vue.use(Progress);
 

Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$notify = Notification;
