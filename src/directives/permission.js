export default {
    inserted(el, binding) {
        // 解构指令的参数
        // 由于指令声明时不带参数声明，因此，最好在指令顶部先声明传进来的参数，然后使用本地变量
        const { thisPermission, permissionList } = binding.value;

        if (permissionList?.length > 0) {
            let hasPermission = permissionList.some(permission => permission === thisPermission);
            //没有权限就先隐藏此元素吧
            if (!hasPermission) {
                el.style.display = "none"
            }
        }
    }
}
