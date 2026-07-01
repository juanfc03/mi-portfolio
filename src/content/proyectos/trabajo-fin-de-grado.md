---
titulo: 'Trabajo de fin de grado'
descripcion:
  'Desarrollo de una página web de venta de coches con un asistente basado en IA integrado. El proyecto sigue una metodología de software rigurosa y aplica las últimas tecnologías del sector, incluyendo pasarela de pago con Stripe.'
herramientas:
  ['Laravel', 'Livewire', 'Tailwind CSS', 'Stripe API', 'Brevo API']
demoUrl: 'https://trabajo-fin-de-grado-jfc00031.free.laravel.cloud/'
repositorioUrl: 'https://github.com/juanfc03/trabajo-fin-de-grado-carai'
imagen: '../../assets/proyecto-tfg.png'
imagenAlt: 'Plataforma de venta de coches con asistente IA'
imagenIzquierda: true
orden: 1
---

## Origen

Este proyecto nació como Trabajo de Fin de Grado en Ingeniería Informática. La
premisa era construir una plataforma de venta de vehículos de segunda mano con
un asistente conversacional capaz de resolver dudas sobre el catálogo, comparar
modelos y guiar al usuario durante el proceso de compra. El enfoque se centró
en aplicar una metodología de software estricta: especificación de requisitos,
arquitectura modular, pruebas automatizadas y despliegue continuo.

## Arquitectura

El backend se construyó sobre **Laravel 11**, aprovechando **Livewire** para
ofrecer una experiencia reactiva sin salir del servidor. El modelo de datos se
diseñó pensando en la extensibilidad: vehículos, marcas, categorías, usuarios,
mensajes del asistente y pedidos conviven en un esquema relacional normalizado
que facilita la incorporación de nuevas funcionalidades.

## Asistente de IA

El corazón del proyecto es el asistente conversacional. Integra un modelo de
lenguaje a través de una API externa, con un *prompt* cuidadosamente
estructurado que limita las respuestas al contexto del catálogo. Se implementó
un sistema de fallback para consultas fuera de dominio y un registro
conversacional para mejorar las respuestas con el tiempo.

## Pasarela de pago

La integración con **Stripe** cubre el ciclo completo: creación del `Payment
Intent`, confirmación en el servidor y gestión de webhooks para actualizar el
estado del pedido. Se prestó especial atención a la idempotencia de las
operaciones para evitar cobros duplicados ante reintentos de red.

## Despliegue

La aplicación se desplegó en **Laravel Cloud** con un pipeline de integración
continua que ejecuta las pruebas y los *linters* antes de promover cada cambio
a producción. Las migraciones y los *seeders* forman parte del flujo de
despliegue para mantener la base de datos sincronizada.
