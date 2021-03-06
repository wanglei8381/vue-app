require('./style.css');

var list = [
  {
    title: 'select',
    link: '/select'
  },
  {
    title: 'dialog(对话框)',
    link: '/dialog'
  },
  {
    title: 'nav-bar(导航)',
    link: '/navbar'
  },
  {
    title: 'dialog(消息框)',
    link: '/dialog'
  },
  {
    title: 'picker(选择器)',
    link: '/picker'
  },
  {
    title: 'actionsheet',
    link: '/actionsheet'
  },
  {
    title: 'bounce',
    link: '/bounce'
  }
];

module.exports = {
  template: require('./template.html'),
  data: function () {
    return {list: list};
  },
  methods: {
    goto: function (link) {
      this.$router.push(link);
    }
  },
  mounted () {
    console.log(this)
  }
};
