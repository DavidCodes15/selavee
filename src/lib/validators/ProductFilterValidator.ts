import { z } from 'zod'

export const AVAILABLE_METALS = [
  'white',
  'rose',
  'yellow',
] as const
export const AVAILABLE_STYLES = [
    
      'pendant',
      'diamond', 
      'gemstone',
      'tennis',
      'drilled-diamond'
    
] as const
export const AVAILABLE_STONE_TYPES = [
    'diamond-stone',
    'emerald-stone',
    'ruby-stone',
    'blue-sapphires-stone',
    'pink-sapphires-stone',
] as const

export const AVAILABLE_STONE_SHAPES = [
    'round',
    'oval',
    'pear',
    'baguette',
    'emerald',
    'marquise',
    'heart',
] as const
export const AVAILABLE_SORT = ['best-sellers', 'new-in', 'price-asc', 'price-desc'] as const
export const AVAILABLE_CATEGORIES = ["All", "Necklaces", "Bracelets", "Rings", "Earrings"] as const
export const ProductFilterValidator = z.object({
  category: z.array(z.enum(AVAILABLE_CATEGORIES)),
  style: z.array(z.enum(AVAILABLE_STYLES)),
  metal: z.array(z.enum(AVAILABLE_METALS)),
  stone_type: z.array(z.enum(AVAILABLE_STONE_TYPES)),
  stone_shape: z.array(z.enum(AVAILABLE_STONE_SHAPES)),
 
  
  sort: z.enum(AVAILABLE_SORT),
  price: z.tuple([z.number(), z.number()]),
})

export type ProductState = Omit<
  z.infer<typeof ProductFilterValidator>,
  'price'
> & {
  price: { isCustom: boolean; range: [number, number] }
}