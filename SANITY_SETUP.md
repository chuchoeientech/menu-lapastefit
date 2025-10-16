# La Paste Fit - Menú Digital

Este proyecto es un menú digital para "La Paste Fit" que utiliza Sanity CMS para gestionar los productos.

## Configuración de Sanity

Para conectar tu estudio de Sanity existente con este proyecto, sigue estos pasos:

### 1. Obtener las credenciales de tu estudio

Necesitarás las siguientes credenciales de tu estudio de Sanity:

- **Project ID**: El ID único de tu proyecto
- **Dataset**: El nombre del dataset (generalmente "production")
- **API Token**: Un token de API con permisos de lectura

### 2. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_SANITY_PROJECT_ID=tu_project_id_aqui
VITE_SANITY_DATASET=production
VITE_SANITY_API_TOKEN=tu_api_token_aqui
```

### 3. Estructura de datos en Sanity

Asegúrate de que tu estudio de Sanity tenga un tipo de documento llamado `product` con los siguientes campos:

```javascript
// Schema para productos en Sanity
{
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre del Producto',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3
    },
    {
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string'
    },
    {
      name: 'available',
      title: 'Disponible',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    }
  ]
}
```

### 4. Crear un token de API

1. Ve a tu estudio de Sanity
2. Navega a **Settings** > **API**
3. En la sección **Tokens**, crea un nuevo token
4. Dale un nombre descriptivo (ej: "Frontend Read Access")
5. Selecciona los permisos de **Read**
6. Copia el token generado

### 5. Instalar dependencias y ejecutar

```bash
npm install
npm run dev
```

## Características

- ✅ Integración completa con Sanity CMS
- ✅ Estados de carga y manejo de errores
- ✅ Datos de respaldo en caso de fallo de conexión
- ✅ Carrito de compras funcional
- ✅ Integración con WhatsApp para pedidos
- ✅ Diseño responsive con Tailwind CSS
- ✅ TypeScript para mayor seguridad de tipos

## Estructura del proyecto

```
src/
├── lib/
│   └── sanity.ts          # Configuración y cliente de Sanity
├── App.tsx                # Componente principal
├── main.tsx               # Punto de entrada
└── index.css              # Estilos globales
```

## Desarrollo

El proyecto utiliza:
- **React 18** con TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **Sanity Client** para CMS
- **Lucide React** para iconos

## Notas importantes

- Los productos se cargan automáticamente desde Sanity al iniciar la aplicación
- Si hay un error de conexión, se muestran los productos de respaldo
- El carrito de compras funciona completamente en el frontend
- Los pedidos se envían por WhatsApp con formato estructurado
