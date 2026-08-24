---
titulo: 'Pokedex interactiva'
descripcion:
  'Pokedex interactiva construida con React que consume la PokeAPI. Explora, busca y consulta detalles de todos los Pokémon. Proyecto en curso en estado inicial.'
herramientas: ['React', 'PokeAPI', 'JavaScript', 'CSS']
repositorioUrl: 'https://github.com/juanfc03/pokedex-react/tree/desarrollo'
imagen: '../../assets/proyecto-pokedex.png'
imagenAlt: 'Pokedex interactiva que consume la PokeAPI'
imagenIzquierda: false
orden: 4
codigo:
  - 'const [pokemon, setPokemon] = useState<Pokemon | null>(null)'
  - 'useEffect(() => {'
  - '  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)'
  - '    .then(r => r.json())'
  - '    .then(setPokemon)'
  - '}, [id])'
---

## Estado del proyecto

Proyecto en curso en estado inicial. Se está construyendo una Pokedex
interactiva con **React** que consume la **PokeAPI** para explorar, buscar y
consultar los detalles de todos los Pokémon.

## Funcionalidades previstas

- Exploración del catálogo completo de Pokémon.
- Búsqueda por nombre o número de la Pokédex.
- Ficha de detalle con estadísticas, tipos, habilidades y movimientos.
