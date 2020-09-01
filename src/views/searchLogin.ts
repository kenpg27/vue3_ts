import { ref, onMounted, reactive } from 'vue'
export function useSearchLogic() {

    let textArr = reactive<Array<any>>([]);
    const searchKey = ref<string>('');

    onMounted(() => {
        console.log('onmounted');
    })
    // 查找文本
    const searchText = (searchKey: string) => {
        return textArr.filter(() => {
            // 过滤相关文本
        })
    }
    return {
        textArr,
        searchKey,
        searchText
    }
}

