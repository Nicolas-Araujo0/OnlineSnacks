<script>
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
export const useAlertsStore = defineStore("alerts", {
    state: () => ({ count: 0, name: "Edouardo" }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        },
    },
})

export const useCounterStore = defineStore("counter", () => {
    const count = ref(0)
    const name = ref("Eduardo")
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }
    return { count, name, doubleCount, increment };
})



export const useCartStore = defineStore("cart", () => {
    const content = ref([]);
    function addToCart($product) {
        $product.quantity = 1
        if (content.value.findIndex((currProduct) => currProduct.id == $product.id) == -1) {
            content.value.push($product);
            console.log(content)
        }
    }
    return { content, addToCart };
})

export const useUserStore = defineStore("user", () => {
    const budget = ref(Number);
    budget.value = localStorage.solde;
    function updateBudget($newSolde) {
        budget.value = $newSolde;
        localStorage.solde = $newSolde
    }
    return { budget, updateBudget };
})
</script>
