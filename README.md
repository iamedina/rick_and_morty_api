# Rick and Morty API — Explorador de personajes

Aplicación web hecha con **React + Vite** que consume la [Rick and Morty API](https://rickandmortyapi.com/documentation) para explorar personajes, filtrarlos por nombre y estado, y navegar entre páginas.

<img src="./src/assets/rick.svg" alt="Rick" width="140" />

## Características

- **Listado en tarjetas** con imagen, nombre, estado, especie, origen y última ubicación conocida.
- **Filtros por nombre y estado** que se aplican solo al pulsar **Buscar** o presionar **Enter** (no en cada tecla).
- **Paginación** con primera página, página actual, última página y botones anterior/siguiente.
- **Indicador de estado con color**: verde (Alive), rojo (Dead) y gris (unknown).
- **Búsquedas sin resultados** manejadas sin errores: lista vacía y paginación estable.
- **Diseño responsive** con CSS propio y utilidades de Tailwind.

## Stack

| Tecnología | Versión |
|---|---|
| React | 19 |
| Vite | 7 |
| Tailwind CSS | 4 (`@tailwindcss/vite`) |
| lucide-react | 0.526 |
| ESLint | 9 |

## Requisitos

- Node.js **20.19+** o **22.12+** (probado con Node 24)
- npm 10+

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo con recarga en caliente
npm run dev        # http://localhost:5173

# 3. Compilar para producción
npm run build      # genera dist/

# 4. Previsualizar la compilación
npm run preview

# 5. Revisar el código con ESLint
npm run lint
```

## Estructura del proyecto

```
.
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── assets/
    │   ├── react.svg
    │   └── rick.svg
    └── components/
        ├── Header.jsx    # navegación
        ├── Main.jsx      # portada con el SVG de Rick
        ├── Section.jsx   # filtros, tarjetas y paginación
        └── Footer.jsx    # pie de página
```

## Cómo funciona el filtro

`Section.jsx` separa lo que el usuario escribe de lo que realmente se busca:

- `nombre` y `estado` guardan el valor de los inputs.
- `filtros` guarda los valores **aplicados**; solo se actualiza al pulsar **Buscar** o **Enter**.
- Un único `useEffect` depende de `[paginaActual, filtros]`, así que escribir en los inputs **no** lanza peticiones.

```jsx
const buscar = () => {
    setPaginaActual(1);
    setFiltros({ nombre, estado });
};
```

Al filtrar se vuelve siempre a la página 1 y, al paginar, se conservan los filtros aplicados.

## API

```
GET https://rickandmortyapi.com/api/character/?page={pagina}&name={nombre}&status={estado}
```

- `status` acepta `alive`, `dead` o `unknown`.
- Si no hay resultados la API responde `404`, caso que la app maneja mostrando la lista vacía.

## Licencia

Proyecto con fines educativos. *Rick and Morty* es una marca de Adult Swim; los datos pertenecen a [rickandmortyapi.com](https://rickandmortyapi.com).
