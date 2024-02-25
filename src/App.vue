<script setup lang="ts">
import Dropdown from './components/Dropdown.vue';
const mockSearchResults = [
  { label: 'Apple' },
  { label: 'Banana' },
  { label: 'Cherry' },
  { label: 'Date' },
  { label: 'Elderberry' },
  { label: 'Fig' },
  { label: 'Grape' },
  { label: 'Honeydew' },
  { label: 'Ivy' },
  { label: 'Jackfruit' },
  { label: 'Kiwi' },
  { label: 'Lemon' },
  { label: 'Mango' },
  { label: 'Nectarine' },
  { label: 'Orange' },
  { label: 'Papaya' },
  { label: 'Quince' },
  { label: 'Raspberry' },
  { label: 'Strawberry' },
  { label: 'Tangerine' },
  { label: 'Ugli' },
  { label: 'Vanilla' },
  { label: 'Watermelon' },
  { label: 'Xigua' },
  { label: 'Yuzu' },
  { label: 'Zucchini' },
  {
    "id": 1,
    "name": "John",
    "age": 30,
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zipcode": "10001",
      "country": "USA"
    },
    "contacts": [
      {
        "type": "email",
        "value": "john@example.com"
      },
      {
        "type": "phone",
        "value": "+1234567890"
      }
    ],
    "orders": [
      {
        "id": "ABC123",
        "products": [
          {
            "name": "Product 1",
            "price": 10.99
          },
          {
            "name": "Product 2",
            "price": 20.49
          }
        ]
      },
      {
        "id": "XYZ789",
        "products": [
          {
            "name": "Product 3",
            "price": 15.75
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "Jane",
    "age": 25,
    "address": {
      "street": "456 Elm St",
      "city": "Los Angeles",
      "zipcode": "90001",
      "country": "USA"
    },
    "contacts": [
      {
        "type": "email",
        "value": "john@example.com" // This should be
      },
      {
        "type": "phone",
        "value": "+9999"
      }
    ],
    "orders": [
      {
        "id": "DEF456",
        "products": [
          {
            "name": "Product 4",
            "price": 5.99
          }
        ]
      }
    ]
  },
];
</script>

<template>
  <div class="bg-gray-100 flex items-center justify-center w-screen min-h-screen min-w-full">
    <div class="flex flex-col">
      <Dropdown label="Search" :options="mockSearchResults" filterKey="name" :isAsync="true" />
      <!-- <Dropdown /> -->
    </div>
  </div>
</template>

<style scoped></style>
