export const API_URL = 'https://dummyjson.com'

export const PAGES = {
  HOME: '/',
  ABOUT: '/about',
  RECIPE: (id: number) => `/recipes/${id}`,
  FAVORITES: '/favorites', 
  LOGIN: '/login',
}

export const MEAL_TYPES = [
  'breakfast',
  'lunch',
  'dinner',
  'snack',
  'dessert',
  'side dish',
  'beverage'
]