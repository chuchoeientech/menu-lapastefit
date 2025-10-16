import {defineField, defineType} from 'sanity'

export const products = defineType({
  name: 'products',
  title: 'Productos',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'precio',
      title: 'Precio',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'unidades',
      title: 'Unidades',
      type: 'number',
      description: 'Cantidad de bombones que trae el producto',
    }),
  ],
})


