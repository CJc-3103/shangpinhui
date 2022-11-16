<template>
  <div class="sph-search-selector">
    <!-- 品牌选择器 -->
    <div class="sph-selector-group sph-brand-selector">
      <div class="sph-selector-group__header">品牌</div>
      <div class="sph-selector-group__content">
        <JcRadioList
          v-if="brandList.length > 0"
          class="sph-selector-list brand-selector"
          title="品牌"
          :value="currentBrand"
          @select="handleBrandSelect"
        >
          <JcRadioItem
            :value="tmName"
            class="sph-selector-item"
            v-for="({ tmName, imgUrl }, i) in brandList"
            :key="i"
          >
            <a class="sph-selector-item__inner"
              ><template v-if="tmName"
                ><span class="sph-selector-item__name">{{
                  tmName
                }}</span></template
              >
              <template v-else
                ><img class="sph-selector-item__img" :src="imgUrl" /></template
            ></a>
          </JcRadioItem>
        </JcRadioList>
        <div v-else class="sph-selector-group__empty">无品牌</div>
      </div>
      <div class="sph-selector-group__extra">
        <a href="javascript:void(0);" class="btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!-- 其他属性选择器 -->
    <div
      class="sph-selector-group"
      v-for="({ attrName, attrValueList }, i) in attrSelectorList"
      :key="i"
    >
      <div class="sph-selector-group__header">{{ attrName }}</div>
      <div class="sph-selector-group__content">
        <JcRadioList
          :value="currentAttrList[i]"
          v-if="brandList.length > 0"
          class="sph-selector-list"
          @select="handleAttrSelect"
        >
          <JcRadioItem
            :value="j"
            :params="{ attrName, attrId: j, attrValue: attr }"
            class="sph-selector-item"
            v-for="(attr, j) in attrValueList"
            :key="j"
          >
            <a class="sph-selector-item__inner">{{ attr }}</a>
          </JcRadioItem>
        </JcRadioList>
      </div>
    </div>
  </div>
</template>

<script>
import { JcRadioList, JcRadioItem } from '@/components/common/JcRadioList';

export default {
  name: 'SearchSelector',
  components: { JcRadioList, JcRadioItem },
  props: {
    brandList: {
      type: Array,
      default() {
        return [];
      },
    },
    // 可选择的属性
    attrSelectorList: {
      type: Array,
      default() {
        return [];
      },
    },
    currentBrand: String,
    currentAttrList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    handleBrandSelect(currentBrand) {
      if (currentBrand) {
        this.updateCurrentBrand(currentBrand);
      }
    },
    handleAttrSelect(i, { attrName, attrId, attrValue }) {
      if (attrName) {
        this.updateCurrentAttrList(attrName, attrId, attrValue);
      }
    },
    updateCurrentBrand(currentBrand) {
      this.$emit('updateCurrentBrand', currentBrand);
    },
    updateCurrentAttrList(attrName, attrId, attrValue) {
      this.$emit('updateCurrentAttrList', attrName, attrId, attrValue);
    },
  },
};
</script>
