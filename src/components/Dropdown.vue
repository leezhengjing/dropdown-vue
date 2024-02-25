<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
        default: 'Search:',
    },
    options: {
        type: Array<any>,
        required: true,
        default: () => [],
    },
    filterKey: {
        type: String,
        required: true,
        default: 'label',
    },
    isAsync: {
        type: Boolean,
        required: false,
        default: false,
    },
    transformFunction: {
        type: Function,
        default: (value: string) => value,
    },
    searchOnFocus: {
        type: Boolean,
        default: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const searchQuery = ref('');
const options = ref(props.options.map(option => ({ ...option, selected: false })));
const selectedOptions = ref();
const isLoading = ref(false);
const isDropdownOpen = ref(true);
let activeIndex = ref(-1);



const performSearch = props.isAsync ? debounce(async () => {
    isLoading.value = true;
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Perform search and update selectedOptions
        selectedOptions.value = options.value.filter(option =>
            deepSearch(option, searchQuery.value)
        );
    } catch (error) {
        console.error('Error performing search:', error);
    } finally {
        isLoading.value = false;
    }
}, 300) : async () => {
    isLoading.value = true;
    try {
        // Perform search and update selectedOptions
        selectedOptions.value = options.value.filter(option =>
            deepSearch(option, searchQuery.value)
        );
    } catch (error) {
        console.error('Error performing search:', error);
    } finally {
        isLoading.value = false;
    }
};



// Debounce function
function debounce(this: any, func: Function, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// const handleSyncSearch = () => {
//     isLoading.value = true;
//     setTimeout(() => {
//         results.value = mockSearchResults.filter(result =>
//             result.label.toLowerCase().includes(syncSearch.value.toLowerCase())
//         );
//         isLoading.value = false;
//     }, 0);
// };

function deepSearch(object: any, query: string): boolean {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const value = object[key];
            if (typeof value === 'object') {
                if (deepSearch(value, query)) {
                    return true;
                }
            } else if (typeof value === 'string') {
                if (value.toLowerCase().includes(query.toLowerCase())) {
                    return true;
                }
            }
        }
    }
    return false;
}

const openDropDown = () => {
    isDropdownOpen.value = true;
};

const closeDropdown = () => {
    isDropdownOpen.value = false;
};

const selectOption = (result: any) => {
    result.selected = !result.selected;
    console.log(options.value);
};

// Close dropdown when clicking outside the input or dropdown
function handleClickOutside(event: any) {
    if (!event.target.closest('.relative')) {
        isDropdownOpen.value = false;
    }
}

document.addEventListener('click', handleClickOutside);

// Attach event listener to the document
const navigateResults = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        activeIndex.value = Math.min(activeIndex.value + 1, options.value.length - 1);
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        activeIndex.value = Math.max(activeIndex.value - 1, -1);
    } else if (event.key === 'Enter') {
        event.preventDefault();
        if (activeIndex.value !== -1) {
            // Implement logic to select the highlighted result
            // For example: selectResult(results[activeIndex.value]);
            selectOption(options.value[activeIndex.value]); // Assuming there's a 'selected' property
        }
    };
};
document.addEventListener('keydown', navigateResults);


</script>

<template>
    <div class="mt-4 bg-white rounded-md max-w-md p-6 shadow-sm min-w-48">
        <div class="flex flex-col items-center justify-center space-y-6">
            <fieldset class="flex flex-col items-start overflow-visible text-left w-full">
                <label class="text-sm text-gray-500">
                    {{ props.label }}
                </label>
                <div class="relative w-full">
                    <span class="absolute inset-y-0 left-0 pl-3 flex pt-0.5 items-center">
                        <svg class="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                    <input placeholder="Type to begin searching" v-model="searchQuery" @input="performSearch"
                        @click="openDropDown" @keydown.prevent.escape="closeDropdown"
                        class="w-full pl-8 h-10 border-gray-200 sm:text-sm sm:leading-5 rounded-md shadow-sm border-2">
                </div>
                <!-- Dropdown menu -->
                <div v-if="searchQuery.length > 0 && isDropdownOpen" class="relative w-full">
                    <div
                        class="z-10 bg-white divide-gray-100 rounded-lg shadow absolute w-full top-full max-h-48 overflow-y-auto">
                        <template v-if="isLoading">
                            <div class="flex justify-center py-2">
                                <div className="animate-spin h-5 w-5 mt-0.5 border-2 rounded-lg border-gray-400"></div>
                            </div>
                        </template>
                        <template v-else>
                            <ul v-if="selectedOptions.length > 0" class="py-2 text-sm text-gray-700"
                                aria-labelledby="dropdownDefaultButton">
                                <li v-for="(result, index) in selectedOptions" :key="index"
                                    :class="{ 'bg-teal-100': index === activeIndex }" @mouseenter="activeIndex = index">
                                    <label class="flex items-center px-4 py-2 cursor-pointer "
                                        @click.prevent=selectOption(result)>
                                        <input type="checkbox" v-model="result.selected"
                                            class="form-checkbox h-5 w-5 text-teal-500" @click=selectOption(result)>
                                        <span class="ml-2">{{ result[props.filterKey] }}</span>
                                    </label>
                                </li>
                            </ul>
                            <p v-else class="px-4 py-2 text-sm text-gray-700">No search results</p>
                        </template>
                    </div>
                </div>
                <div class="mt-1 text-sm text-gray-500">With description and custom results display</div>
            </fieldset>
        </div>

    </div>
</template>
  
<style scoped></style>