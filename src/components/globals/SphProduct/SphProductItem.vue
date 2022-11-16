<script>
import { currency } from '@/filters';
import Emitter from '../../mixins/emitter';
import extendClass from '../../mixins/extendClass';

export default {
  name: 'SphProductItem',
  componentName: 'SphProductItem',

  mixins: [Emitter],

  props: {
    blockClass: String,
    imgUrl: String,
    alt: {
      type: String,
      default: '',
    },
    title: String,
    price: [Number, String],
    params: {
      type: Object,
      default() {
        return {};
      },
    },
    isPriceTop: Boolean,
    currencyUnit: String,
    currencyDecimals: {
      type: Number,
      default: 2,
    },
  },

  methods: {
    handleClick(e) {
      const { click } = e.target.dataset;
      const params = this.params;
      if (click === 'click' && params instanceof Object) {
        this.dispatch('SphProductGroup', 'SphProductItemClick', [params]);
        this.$emit('click', params);
      }
    },
  },

  render(h) {
    const {
      blockClass,
      imgUrl,
      alt,
      title,
      price,
      isPriceTop,
      currencyUnit,
      currencyDecimals,
      handleClick,
    } = this;

    const defaultBlockClass = 'sph-product-item';
    const elementClasses = {
      linkWrap: 'link-wrap',
      img: 'img',
      info: 'info',
      title: 'title',
      price: 'price',
      extra: 'extra',
    };
    const { realBlockClass, realElementClasses } = extendClass(
      defaultBlockClass,
      blockClass,
      elementClasses
    );
    const productInfoCompos = isPriceTop
      ? [
          <p class={realElementClasses.price}>
            {currency(price, currencyUnit, currencyDecimals)}
          </p>,
          <a class={realElementClasses.linkWrap} data-click="click">
            <p class={realElementClasses.title} data-click="click">
              {title}
            </p>
          </a>,
        ]
      : [
          <a class={realElementClasses.linkWrap} data-click="click">
            <p class={realElementClasses.title} data-click="click">
              {title}
            </p>
          </a>,
          <p class={realElementClasses.price}>
            {currency(price, currencyUnit, currencyDecimals)}
          </p>,
        ];

    const { extra: extraSlot } = this.$scopedSlots;

    return (
      <li class={realBlockClass} onClick={handleClick}>
        <a
          class={[realElementClasses.img, realElementClasses.linkWrap]}
          data-click="click"
        >
          <img src={imgUrl} alt={alt} data-click="click" />
        </a>
        <div class={realElementClasses.info}>{...productInfoCompos}</div>
        <div class={realElementClasses.extra}>
          {extraSlot ? extraSlot() : ''}
        </div>
      </li>
    );
  },
};
</script>
