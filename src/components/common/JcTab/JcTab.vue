<script>
import { JcRadioList, JcRadioItem } from '../JcRadioList';
import extendClass from '../../mixins/extendClass';
import Emitter from '../../mixins/emitter';

export default {
  name: 'JcTab',
  componentName: 'JcTab',

  components: { JcRadioList, JcRadioItem },

  mixins: [Emitter],

  props: {
    value: [String, Number],
    // value: Number,
    blockClass: String,
  },

  data() {
    return {
      activeTab: '', // 允许的类型 [String, Number]
      tabNavList: [],
    };
  },

  // 直接使用 activeTab ，这样更简单
  // computed: {
  //   __activeTabName() {
  //     const tabNavList = this.tabNavList;
  //     let id = this.__findTabPaneId(tabNavList, this.activeTab);
  //     return this.tabNavList[this.activeTab]?.name;
  //   },
  // },

  methods: {
    __isNameValid(name) {
      return ['string', 'number'].includes(typeof name);
    },
    __init() {
      let tabNavList = this.tabNavList;
      this.activeTab = this.value
        ? this.value
        : tabNavList.length
        ? tabNavList[0].name
        : '';
    },
    __findTabPaneId(tabNavList, name) {
      return tabNavList.findIndex(
        ({ name: currentName }) => currentName === name
      );
    },
    __handleClick() {
      let activeTabName = this.activeTab;
      if (this.__isNameValid(activeTabName)) {
        this.$emit('input', activeTabName);
        this.$emit('click', activeTabName);
      }
    },
  },

  created() {
    let tabNavList = this.tabNavList;
    const findTabPaneId = this.__findTabPaneId;
    this.$on('AddTabPane', (name, label) => {
      if (this.__isNameValid(name)) {
        if (tabNavList.length && findTabPaneId(tabNavList, name) > -1) {
          console.warn(
            '[Component Warn][JcTab] duplicated TabPane prop "name"!'
          );
        } else {
          tabNavList.push({ name, label });
        }
      }
    });
    this.$on('RemoveTabPane', (name) => {
      if (this.__isNameValid(name)) {
        tabNavList.length &&
          tabNavList.splice(findTabPaneId(tabNavList, name), 1);
      }
    });
    this.$nextTick(() => {
      this.__init();
    });
  },

  render(h) {
    let activeTab = this.activeTab;
    const { blockClass, tabNavList, __handleClick: handleClick } = this;
    const defaultBlockClass = 'jc-tab';
    const elementClasses = {
      nav: 'nav',
      navItem: 'nav-item',
      content: 'content',
    };
    const { realBlockClass, realElementClasses } = extendClass(
      defaultBlockClass,
      blockClass,
      elementClasses
    );

    const { default: defaultSlot, nav: navSlot } = this.$scopedSlots;

    // jsx 无法使用 v-model 指令，原因未知
    // const setupTabNavCompo = (
    //   navClass,
    //   navItemClass,
    //   tabNavList,
    //   activeTab
    // ) => {
    //   let tabNavItemCompoList = [];
    //   for (let i = 0; i < tabNavList.length; i++) {
    //     const { label, name } = tabNavList[i];
    //     const navItemCompo = (
    //       <JcRadioItem
    //         class={[navItemClass, activeTab === i ? 'is-active' : '']}
    //         value={name}
    //       >
    //         {navSlot ? navSlot() : label}
    //       </JcRadioItem>
    //     );
    //     tabNavItemCompoList.push(navItemCompo);
    //   }
    //   // return (
    //   //   <JcRadioList
    //   //     class={realElementClasses.nav}
    //   //     value={activeTab}
    //   //     onSelect={(value) => (activeTab = value)}
    //   //   >
    //   //     {/* <JcRadioList class={realElementClasses.nav} vModel={activeTab}> */}
    //   //     {...tabNavItemCompoList}
    //   //   </JcRadioList>
    //   // );
    //   return h(
    //     JcRadioList,
    //     {
    //       class: navClass,
    //       value: activeTab,
    //       on: {
    //         input(value) {
    //           activeTab = value;
    //         },
    //       },
    //     },
    //     tabNavItemCompoList
    //   );
    // };
    // const tabNavCompo = setupTabNavCompo(
    //   realElementClasses.nav,
    //   realElementClasses.navItem,
    //   tabNavList,
    //   activeTab
    // );

    let tabNavItemCompoList = [];
    for (let i = 0; i < tabNavList.length; i++) {
      const { label, name } = tabNavList[i];
      const navItemCompo = (
        <JcRadioItem
          class={[
            realElementClasses.navItem,
            this.activeTab === name ? 'is-active' : '',
          ]}
          value={name}
        >
          {navSlot ? navSlot({ label }) : label}
        </JcRadioItem>
      );
      tabNavItemCompoList.push(navItemCompo);
    }
    const tabNavCompo = h(
      JcRadioList,
      {
        class: realElementClasses.nav,
        value: activeTab,
        on: {
          input: (value) => {
            this.activeTab = value;
          },
        },
      },
      tabNavItemCompoList
    );
    const tabContentCompo = (
      <div class={realElementClasses.content}>
        {defaultSlot ? defaultSlot() : ''}
      </div>
    );
    return h(
      'div',
      {
        class: realBlockClass,
        on: {
          click: handleClick,
        },
      },
      [tabNavCompo, tabContentCompo]
    );
  },
};
</script>

<style lang="scss" scoped>
.jc-tab__nav,
.jc-tab__content {
  display: flex;
}
</style>
