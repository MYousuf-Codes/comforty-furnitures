import { type SchemaTypeDefinition } from 'sanity'
import { products } from './products'
import { categories } from './categories'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, categories],
}
