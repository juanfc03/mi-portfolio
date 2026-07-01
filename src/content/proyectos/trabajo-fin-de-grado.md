---
titulo: 'Trabajo de fin de grado'
descripcion: 'Plataforma de venta de coches de segunda mano con asistente de IA basado en arquitectura RAG. Análisis del estado del arte, feedbak en tiempo real, diseño reactivo con Livewire, idempotencia en pagos con Stripe, notificaciones y tests de integración.'
herramientas:
  [
    'Laravel 13',
    'Livewire v4',
    'Tailwind CSS',
    'RAG',
    'Stripe API',
    'Brevo API',
  ]
demoUrl: 'https://trabajo-fin-de-grado-jfc00031.free.laravel.cloud/'
repositorioUrl: 'https://github.com/juanfc03/trabajo-fin-de-grado-carai'
imagen: '../../assets/proyecto-tfg.png'
imagenAlt: 'Plataforma de venta de coches con asistente IA'
imagenIzquierda: true
orden: 1
codigo:
  - 'class AsistenteIa'
  - '  public function consultar(string $pregunta): Respuesta'
  - '    $embeddings = GeminiEmbedding::generar($pregunta)'
  - '    $contexto = ChromaDB::buscarSimilares($embeddings)'
  - '    return GPT::completar('
  - '      prompt: PromptBuilder::construir($contexto),'
  - '    )'
  - '  }'
  - '}'
---

## Origen

Este proyecto nació como Trabajo de Fin de Grado en Ingeniería Informática tras
un análisis del estado del arte del sector de venta de coches de segunda mano en
España. La investigación reveló que la mayoría de plataformas nacionales siguen
usando filtros clásicos que delegan toda la carga de búsqueda al usuario.
Plataformas como Coches.net que han intentado integrar IA lo hacen de forma
deficiente: respuestas lentas, alucinaciones, interfaz que se congela. El
objetivo era construir una alternativa que combinase una experiencia reactiva
fluida con un asistente conversacional que realmente funcione.

## Arquitectura RAG

El backend se construyó sobre **Laravel 13** con **Livewire v4**, logrando una
experiencia 100% reactiva sin salir del servidor. El asistente de IA implementa
una arquitectura **RAG** (Retrieval-Augmented Generation): cada consulta del
usuario se vectoriza con **Gemini Embedding 001**, se buscan los fragmentos más
relevantes del catálogo en una base vectorial y se inyectan como contexto en el
prompt de **GPT-5.4 nano**. Esto mitiga las alucinaciones y garantiza que el
asistente solo recomiende vehículos reales del inventario.

## Ingeniería de prompts y análisis de intenciones

El sistema de prompting clasifica la intención del usuario antes de generar la
respuesta: comparar modelos, filtrar por presupuesto, consultar características
técnicas o iniciar una reserva. Cada intención dispara un flujo distinto de
recuperación de contexto y un prompt específico, optimizado mediante ingeniería
de prompts iterativa. Las respuestas se transmiten en streaming, dando feedbak
inmediato sin que la página se congele en ningún momento.

## Seguridad y pagos

La integración con **Stripe** implementa **idempotencia** en la creación de
`Payment Intent` y **bloqueo pesimista** en las transacciones de base de datos
durante el proceso de compra, evitando condiciones de carrera y cobros
duplicados. Se aplican múltiples capas de seguridad: validación de entrada,
protección CSRF, sanitización de datos y autorización por políticas de Laravel.

## Notificaciones y procesos en segundo plano

Las notificaciones al usuario (confirmación de reserva, cambio de estado del
pedido, recordatorios) se gestionan con **Brevo API** y se despachan mediante
**colas y jobs de Laravel**, procesándose en segundo plano sin bloquear la
experiencia del usuario.

## Calidad y despliegue

La aplicación cuenta con **tests de integración con PHPUnit** que cubren los
flujos críticos: catálogo, asistente, compra y notificaciones. Se desplegó en
**Laravel Cloud** como plataforma de hosting gestionada.
